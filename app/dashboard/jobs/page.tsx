import { getJobs } from './queries'
import JobsClient from '@/app/dashboard/jobs/JobsClient'

export default async function JobsPage() {
  const jobs = await getJobs()

  return <JobsClient jobs={jobs} />
}
