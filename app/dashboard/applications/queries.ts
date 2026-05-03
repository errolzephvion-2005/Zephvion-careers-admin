import { createClient } from '@/lib/supabase/server'
import { Application } from '@/shared/types'

export async function getApplications(): Promise<Application[]> {
  const supabase = await createClient()
  
  // 1. Fetch raw applications
  const { data: apps, error: appsError } = await supabase
    .from('applications')
    .select('*')
    .order('created_at', { ascending: false })

  if (appsError || !apps) {
    console.error('Error fetching applications:', appsError)
    return []
  }

  if (apps.length === 0) return []

  // 2. Collect unique IDs for manual join
  const jobIds = [...new Set(apps.map(a => a.job_id))]
  const candidateIds = [...new Set(apps.map(a => a.candidate_id))]

  // 3. Fetch Jobs and Candidates in parallel
  const [jobsRes, candidatesRes] = await Promise.all([
    supabase.from('jobs').select('*').in('id', jobIds),
    supabase.from('candidates').select('*').in('id', candidateIds)
  ])

  // 4. Create lookup maps for fast stitching
  const jobsMap = new Map((jobsRes.data || []).map(j => [j.id, j]))
  const candidatesMap = new Map((candidatesRes.data || []).map(c => [c.id, c]))

  // 5. Stitch data together
  return apps.map(app => ({
    ...app,
    jobs: jobsMap.get(app.job_id),
    candidates: candidatesMap.get(app.candidate_id)
  }))
}
