'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export async function loginAction(prevState: any, formData: FormData) {
  const username = formData.get('username') as string
  const password = formData.get('password') as string
  
  if (!username || !password) {
    return { error: 'Username and password are required.' }
  }

  // Map plain text username to internal auth email for Supabase
  const email = username.toLowerCase() === 'zephvion' 
    ? 'zephvion@zephvion.com' 
    : username

  const supabase = await createClient()

  // Use standard Supabase Auth
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return { error: error.message }
  }

  redirect('/dashboard')
}
