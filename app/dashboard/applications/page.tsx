import { getApplications } from './queries'
import ApplicationsClient from '@/app/dashboard/applications/ApplicationsClient'

export default async function ApplicationsPage() {
  const applications = await getApplications()

  return <ApplicationsClient applications={applications} />
}
