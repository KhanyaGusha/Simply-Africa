import AppLayout from '../components/layout/AppLayout.jsx'
import Badge from '../components/ui/Badge.jsx'
import { MOCK_OPPS } from '../data/mockData.js'

// TODO(owner: opportunities person): replace with GET /api/opportunities
const STAGES = ['lead', 'contacted', 'proposal', 'negotiation', 'won']
export default function Opportunities() {
  return (
    <AppLayout title="Opportunities">
      <div className="flex gap-4 overflow-x-auto pb-2 lg:flex-wrap">
        {STAGES.map((stage) => (
          <div key={stage} className="min-w-[220px] flex-1 rounded-lg bg-ink/5 p-3 lg:min-w-[180px]">
            <h4 className="mb-3 text-xs font-medium uppercase tracking-wide text-ink/50">
              {stage}
            </h4>
            <div className="space-y-2">
              {MOCK_OPPS.filter((o) => o.stage === stage).map((o) => (
                <div key={o.id} className="rounded border border-line bg-white p-3 text-sm">
                  <p className="font-medium">{o.title}</p>
                  <p className="text-ink/60">{o.org}</p>
                  <p className="mt-1 text-accent font-medium">{o.value}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </AppLayout>
  )
}
