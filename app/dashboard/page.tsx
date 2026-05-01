import { getDashboardStats } from './queries'
import DashboardClient from './DashboardClient'

export default async function DashboardPage() {
  const { jobsCount, inactiveJobsCount, appsCount, candidatesCount, candidates } = await getDashboardStats()

  const stats = [
    { label: 'Active Jobs', value: jobsCount.toString(), color: 'text-primary' },
    { label: 'Inactive Jobs', value: inactiveJobsCount.toString(), color: 'text-on-surface-variant' },
    { label: 'Candidates', value: candidatesCount.toString(), color: 'text-secondary' },
    { label: 'Applications', value: appsCount.toString(), color: 'text-tertiary' },
  ]

  return <DashboardClient stats={stats} candidates={candidates} />
}
