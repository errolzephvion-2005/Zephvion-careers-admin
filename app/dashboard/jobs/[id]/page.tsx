import { getJobById } from '../queries'
import JobDetailClient from '@/app/dashboard/jobs/[id]/JobDetailClient'
import { notFound } from 'next/navigation'

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function JobDetailPage({ params }: PageProps) {
  const { id } = await params
  const job = await getJobById(id)

  if (!job) {
    notFound()
  }

  return <JobDetailClient job={job} />
}
