import { createClient } from '@/lib/supabase/server'

export async function getDashboardStats() {
  const supabase = await createClient()

  // Fetch Jobs count
  const { count: jobsCount, error: jobsError } = await supabase
    .from('jobs')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'OPEN')
  if (jobsError) console.error('Jobs Query Error:', jobsError)

  // Fetch Applications count
  const { count: appsCount, error: appsError } = await supabase
    .from('applications')
    .select('*', { count: 'exact', head: true })
  if (appsError) console.error('Apps Query Error:', appsError)

  // Fetch Candidates count
  const { count: candidatesCount, error: candCountError } = await supabase
    .from('candidates')
    .select('*', { count: 'exact', head: true })
  if (candCountError) console.error('Candidate Count Error:', candCountError)

  // Fetch Candidates list
  const { data: candidatesList, error: candListError } = await supabase
    .from('candidates')
    .select('full_name, email, contact_number, linkedin, github')
    .order('created_at', { ascending: false })
  if (candListError) console.error('Candidate List Error:', candListError)

  return {
    jobsCount: jobsCount || 0,
    appsCount: appsCount || 0,
    candidatesCount: candidatesCount || 0,
    candidates: candidatesList || []
  }
}
