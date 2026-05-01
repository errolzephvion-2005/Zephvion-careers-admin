import { createClient } from '@/lib/supabase/server'

export async function getApplications() {
  const supabase = await createClient()
  
  // Fetch applications with joined job and candidate info
  const { data, error } = await supabase
    .from('applications')
    .select(`
      *,
      jobs ( * ),
      candidates ( * )
    `)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching applications:', error)
    return []
  }

  return data
}
