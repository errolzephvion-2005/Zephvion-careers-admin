import { createClient } from '@/lib/supabase/server'

export async function getApplications() {
  const supabase = await createClient()
  
  // Fetch applications with joined job and candidate info
  const { data, error } = await supabase
    .from('applications')
    .select(`
      *,
      jobs ( job_title, job_reference_code ),
      candidates ( full_name, email )
    `)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching applications:', error)
    return []
  }

  return data
}
