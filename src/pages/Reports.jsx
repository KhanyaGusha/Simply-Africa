import AppLayout from "../components/layout/AppLayout.jsx"
import EmptyState from "../components/ui/EmptyState.jsx"

// TODO(owner: whoever takes this slice): build this page out - list/table + detail view.
// Copy the pattern in Organisations.jsx (table) or OrganisationDetail.jsx (detail).
export default function Reports() {
  return (
    <AppLayout title="Reports">
      <EmptyState
        title="Reports not built yet"
        description="This page is a placeholder — wire it up to your GET /api/reports endpoint."
      />
    </AppLayout>
  )
}
