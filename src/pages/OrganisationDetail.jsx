import { useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import AppLayout from '../components/layout/AppLayout.jsx'
import Badge from '../components/ui/Badge.jsx'
import { MOCK_ORGS, MOCK_ORG_DETAILS } from '../data/mockData.js'

// TODO(owner: whoever needs it): replace with GET /api/organisations/:id (joined view)

export default function OrganisationDetail() {
  const { id } = useParams()
  const organisation = MOCK_ORGS.find((item) => String(item.id) === id)
  const details = MOCK_ORG_DETAILS[id]

  if (!organisation || !details) {
    return <AppLayout title="Organisation not found"><p className="text-sm text-ink/60">This organisation could not be found.</p></AppLayout>
  }

  const org = {
    ...organisation,
    ...details,
    engagements: details.engagements.map((engagement) => ({
      id: engagement.id,
      occurred_at: engagement.occurredAt,
      summary: `${engagement.title}, ${engagement.summary}`,
    })),
  }

  return (
    <AppLayout title={org.name}>
      <Link
        to="/organisations"
        className="mb-4 inline-flex items-center gap-2 text-sm text-ink/60 transition-colors hover:text-[#8C8A3E]"
      >
        <ArrowLeft size={15} /> Back to organisations
      </Link>
      <div className="mb-6 flex items-center gap-3">
        <span className="text-sm text-ink/60">{org.sector}</span>
        <Badge tone={org.health}>{org.health} relationship</Badge>
      </div>

      <div className="flex flex-wrap gap-6">
        <section className="min-w-0 flex-1 basis-full rounded-lg border border-line bg-white p-5 lg:basis-0">
          <h3 className="font-serif text-lg mb-3">Contacts</h3>
          <ul className="space-y-2">
            {org.contacts.map((c) => (
              <li key={c.id} className="text-sm">
                <span className="font-medium">{c.full_name}</span>
                <span className="text-ink/60"> — {c.job_title}</span>
                {c.is_primary && <Badge tone="neutral"> primary </Badge>}
              </li>
            ))}
          </ul>
        </section>

        <section className="min-w-0 flex-1 basis-full rounded-lg border border-line bg-white p-5 lg:basis-0">
          <h3 className="font-serif text-lg mb-3">Open opportunities</h3>
          <ul className="space-y-2">
            {org.opportunities.map((o) => (
              <li key={o.id} className="text-sm flex justify-between">
                <span>{o.title}</span>
                <span className="text-ink/60">{o.estimated_value}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="min-w-0 basis-full rounded-lg border border-line bg-white p-5">
          <h3 className="font-serif text-lg mb-3">Engagement timeline</h3>
          <ul className="space-y-3">
            {org.engagements.map((e) => (
              <li key={e.id} className="border-l-2 border-accent pl-4 text-sm">
                <span className="text-ink/50">{e.occurred_at}</span> — {e.summary}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </AppLayout>
  )
}
