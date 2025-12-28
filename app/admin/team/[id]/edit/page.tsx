import EditTeamForm from './EditTeamForm'

// Required for static export - returns empty array (admin pages won't work on static hosting)
export function generateStaticParams() {
  return []
}

export default function EditTeamMemberPage() {
  return <EditTeamForm />
}
