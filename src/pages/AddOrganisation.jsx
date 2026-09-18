import { useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import AppLayout from '../components/layout/AppLayout.jsx'

const INITIAL_FORM = {
  name: '',
  sector: '',
  status: 'prospect',
  health: 'amber',
}

export default function AddOrganisation() {
  const navigate = useNavigate()
  const [form, setForm] = useState(INITIAL_FORM)

  function handleChange(event) {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    navigate('/organisations', {
      state: {
        newOrganisation: {
          ...form,
          id: `new-${Date.now()}`,
        },
      },
    })
  }

  return (
    <AppLayout title="Add organisation">
      <div className="mx-auto w-full max-w-2xl">
        <Link
          to="/organisations"
          className="mb-5 inline-flex items-center gap-2 text-sm text-ink/60 transition-colors hover:text-[#8C8A3E]"
        >
          <ArrowLeft size={15} /> Back to organisations
        </Link>

        <form onSubmit={handleSubmit} className="rounded-lg border border-line bg-white p-5 sm:p-7">
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="mb-1 block text-sm font-medium text-ink/70" htmlFor="name">
                Organisation name
              </label>
              <input
                id="name"
                name="name"
                required
                value={form.name}
                onChange={handleChange}
                placeholder="e.g. Ubuntu Capital"
                className="w-full rounded-lg border border-line bg-[#F7F7E7] px-3 py-2 text-sm focus:border-accent focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-ink/70" htmlFor="sector">
                Sector
              </label>
              <input
                id="sector"
                name="sector"
                required
                value={form.sector}
                onChange={handleChange}
                placeholder="e.g. Financial Services"
                className="w-full rounded-lg border border-line bg-[#F7F7E7] px-3 py-2 text-sm focus:border-accent focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-ink/70" htmlFor="status">
                Status
              </label>
              <select
                id="status"
                name="status"
                value={form.status}
                onChange={handleChange}
                className="w-full rounded-lg border border-line bg-[#F7F7E7] px-3 py-2 text-sm focus:border-accent focus:outline-none"
              >
                <option value="prospect">Prospect</option>
                <option value="active">Active</option>
              </select>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-ink/70" htmlFor="health">
                Health
              </label>
              <select
                id="health"
                name="health"
                value={form.health}
                onChange={handleChange}
                className="w-full rounded-lg border border-line bg-[#F7F7E7] px-3 py-2 text-sm focus:border-accent focus:outline-none"
              >
                <option value="green">Green</option>
                <option value="amber">Amber</option>
                <option value="red">Red</option>
              </select>
            </div>
          </div>

          <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <Link
              to="/organisations"
              className="rounded-lg border border-line px-4 py-2 text-center text-sm font-medium text-ink/70 transition-colors hover:bg-[#F7F7E7]"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="rounded-lg bg-gradient-to-b from-[#294522] via-[#55612D] to-[#8C8A3E] px-4 py-2 text-sm font-medium text-white hover:brightness-90"
            >
              Add organisation
            </button>
          </div>
        </form>
      </div>
    </AppLayout>
  )
}
