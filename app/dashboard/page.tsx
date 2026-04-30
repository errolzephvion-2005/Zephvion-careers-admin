import { getDashboardStats } from './queries'
import DashboardClient from './DashboardClient'

export default async function DashboardPage() {
  const { jobsCount, appsCount, candidatesCount, candidates } = await getDashboardStats()

  const stats = [
    { label: 'Active Jobs', value: jobsCount.toString(), color: 'text-primary' },
    { label: 'Candidates', value: candidatesCount.toString(), color: 'text-secondary' },
    { label: 'Applications', value: appsCount.toString(), color: 'text-tertiary' },
  ]

  return <DashboardClient stats={stats} candidates={candidates} />
}
