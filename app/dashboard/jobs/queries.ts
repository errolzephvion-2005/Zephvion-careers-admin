import { createClient } from '@/lib/supabase/server'
import { Job } from '@/shared/types'

export async function getJobs(): Promise<Job[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('jobs')
    .select('*')
    .order('id', { ascending: false })

  if (error) {
    console.error('Error fetching jobs:', error)
    return []
  }

  return data
}

export async function getJobById(id: string): Promise<Job | null> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('jobs')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching job details:', error)
    return null
  }

  return data
}
