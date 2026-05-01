import { getApplicationGroup } from './queries'
import ApplicationDetailsClient from './ApplicationDetailsClient'
import { redirect } from 'next/navigation'

export default async function ApplicationDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const appGroup = await getApplicationGroup(id)
  
  if (!appGroup || appGroup.length === 0) {
    redirect('/dashboard/applications')
  }

  return <ApplicationDetailsClient appGroup={appGroup} />
}
