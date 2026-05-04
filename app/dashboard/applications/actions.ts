'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function deleteApplications(ids: string[]) {
  if (!ids || ids.length === 0) return { success: false, error: 'No IDs provided' }

  try {
    const supabase = await createClient()
    
    const { error } = await supabase
      .from('applications')
      .delete()
      .in('id', ids)

    if (error) {
      console.error('Error deleting applications:', error)
      return { success: false, error: error.message }
    }

    revalidatePath('/dashboard/applications')
    return { success: true }
  } catch (err) {
    console.error('Unexpected error during deletion:', err)
    return { success: false, error: 'An unexpected error occurred' }
  }
}
