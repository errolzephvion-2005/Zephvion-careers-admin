import { createClient } from '@/lib/supabase/server'

export async function getApplicationGroup(id: string) {
  const supabase = await createClient()

  const { data: primaryApp, error: primaryError } = await supabase
    .from('applications')
    .select('candidate_id, job_id')
    .eq('id', id)
    .single()

  if (primaryError || !primaryApp) {
    console.error('Error fetching primary application:', primaryError)
    return []
  }

  const { data: appGroup, error: groupError } = await supabase
    .from('applications')
    .select(`
      *,
      jobs ( * ),
      candidates ( * )
    `)
    .eq('candidate_id', primaryApp.candidate_id)
    .eq('job_id', primaryApp.job_id)
    .order('created_at', { ascending: false })

  if (groupError) {
    console.error('Error fetching application group:', groupError)
    return []
  }

  return appGroup
}
