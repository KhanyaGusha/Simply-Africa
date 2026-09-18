import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import AppLayout from '../components/layout/AppLayout.jsx'
import Badge from '../components/ui/Badge.jsx'
import EmptyState from '../components/ui/EmptyState.jsx'
import { MOCK_ORGS } from '../data/mockData.js'

// TODO(owner: organisations person): replace with GET /api/organisations
export default function Organisations() {
  const location = useLocation()
  const navigate = useNavigate()
  const [orgs, setOrgs] = useState(() => [
    ...MOCK_ORGS,
    ...(location.state?.newOrganisation ? [location.state.newOrganisation] : []),
  ])

  function openCreatePage() {
    navigate('/organisations/new')
  }

  return (
    <AppLayout title="Organisations">
      <div className="mb-4 flex justify-end">
        <button
          onClick={openCreatePage}
          className="w-full rounded-lg bg-gradient-to-b from-[#294522] via-[#55612D] to-[#8C8A3E] px-4 py-2 text-sm font-medium text-white hover:brightness-90 sm:w-auto"
        >
          Add organisation
        </button>
      </div>

      {orgs.length === 0 ? (
        <EmptyState
          title="No organisations yet"
          description="Add your first partner or sponsor to start tracking the relationship."
          actionLabel="Add organisation"
        />
      ) : (
        <div className="overflow-hidden rounded-lg border border-line bg-white">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-sm">
            <thead className="bg-ink/5 text-left text-xs uppercase tracking-wide text-ink/50">
              <tr>
                <th className="px-5 py-3 font-medium">Name</th>
                <th className="px-5 py-3 font-medium">Sector</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium">Health</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {orgs.map((org) => (
                <tr key={org.id} className="hover:bg-paper">
                  <td className="px-5 py-3">
                    <Link
                      to={`/organisations/${org.id}`}
                      className="font-medium text-ink hover:text-accent"
                    >
                      {org.name}
                    </Link>
                  </td>
                  <td className="px-5 py-3 text-ink/70">{org.sector}</td>
                  <td className="px-5 py-3 text-ink/70 capitalize">{org.status}</td>
                  <td className="px-5 py-3">
                    <Badge tone={org.health}>{org.health}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
            </table>
          </div>
        </div>
      )}
    </AppLayout>
  )
}
