from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker
from sqlalchemy.pool import StaticPool

from app.auth.security import hash_password
from app.config import settings


Base = declarative_base()

engine_kwargs = {"pool_pre_ping": True}
if settings.database_url.startswith("sqlite"):
    engine_kwargs["connect_args"] = {"check_same_thread": False}
    engine_kwargs["poolclass"] = StaticPool

engine = create_engine(settings.database_url, **engine_kwargs)

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine,
)


def init_db():
    from app.models import User
    from app.models.user import UserRole

    Base.metadata.create_all(bind=engine)

    with SessionLocal() as db:
        existing_user = db.query(User).filter(User.email == "elton@simplycomplex.africa").first()
        if existing_user is None:
            db.add(
                User(
                    full_name="Elton Smith",
                    email="elton@simplycomplex.africa",
                    password_hash=hash_password("Password123!"),
                    role=UserRole.admin,
                    is_active=True,
                )
            )
            db.commit()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()