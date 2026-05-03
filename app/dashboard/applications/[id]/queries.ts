import { createClient } from '@/lib/supabase/server'
import { Application } from '@/shared/types'

export async function getApplicationGroup(id: string): Promise<Application[]> {
  const supabase = await createClient()

  // 1. Find the metadata for the primary application
  const { data: meta, error: metaError } = await supabase
    .from('applications')
    .select('candidate_id, job_id')
    .eq('id', id)
    .single()

  if (metaError || !meta) {
    console.error('Error fetching application metadata:', metaError)
    return []
  }

  // 2. Fetch all applications for this candidate + job combo
  const { data: apps, error: appsError } = await supabase
    .from('applications')
    .select('*')
    .eq('candidate_id', meta.candidate_id)
    .eq('job_id', meta.job_id)
    .order('created_at', { ascending: false })

  if (appsError || !apps || apps.length === 0) {
    return []
  }

  // 3. Fetch Job and Candidate data manually
  const [jobRes, candidateRes] = await Promise.all([
    supabase.from('jobs').select('*').eq('id', meta.job_id).single(),
    supabase.from('candidates').select('*').eq('id', meta.candidate_id).single()
  ])

  // 4. Stitch the data into every application in the group
  return apps.map(app => ({
    ...app,
    jobs: jobRes.data || undefined,
    candidates: candidateRes.data || undefined
  }))
}
