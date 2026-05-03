'use server'

import { createClient, createAdminClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function updateJob(jobId: number, data: any) {
  const supabase = await createAdminClient()

  // Remove id from the update payload to avoid Supabase errors
  const { id, created_at, ...updateData } = data

  const { error } = await supabase
    .from('jobs')
    .update(updateData)
    .eq('id', jobId)

  if (error) {
    console.error('Error updating job:', error)
    return { success: false, error: error.message }
  }

  revalidatePath('/dashboard/jobs')
  revalidatePath(`/dashboard/jobs/${jobId}`)
  return { success: true }
}

export async function toggleJobActive(jobId: number, isActive: boolean) {
  const supabase = await createAdminClient()

  const { error } = await supabase
    .from('jobs')
    .update({ is_active: isActive })
    .eq('id', jobId)

  if (error) {
    console.error('Error toggling job status:', error)
    return { success: false, error: error.message }
  }

  revalidatePath('/dashboard/jobs')
  revalidatePath(`/dashboard/jobs/${jobId}`)
  return { success: true }
}

export async function createJob(data: any) {
  const supabase = await createAdminClient()

  // Internal fields handled by system
  const jobData = {
    ...data,
    created_at: new Date().toISOString(),
  }

  const { error } = await supabase
    .from('jobs')
    .insert([jobData])

  if (error) {
    console.error('Error creating job:', error)
    return { success: false, error: error.message }
  }

  revalidatePath('/dashboard/jobs')
  return { success: true }
}

export async function deleteJob(jobId: number) {
  const supabase = await createAdminClient()

  const { error } = await supabase
    .from('jobs')
    .delete()
    .eq('id', jobId)

  if (error) {
    console.error('Error deleting job:', error)
    return { success: false, error: error.message }
  }

  revalidatePath('/dashboard/jobs')
  return { success: true }
}

export async function toggleJobTrending(jobId: number, isTrending: boolean) {
  const supabase = await createAdminClient()

  const { error } = await supabase
    .from('jobs')
    .update({ is_trending: isTrending })
    .eq('id', jobId)

  if (error) {
    console.error('Error toggling job trending status:', error)
    return { success: false, error: error.message }
  }

  revalidatePath('/dashboard/jobs')
  return { success: true }
}
