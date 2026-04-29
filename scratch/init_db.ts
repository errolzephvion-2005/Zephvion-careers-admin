import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'
import path from 'path'

// Load env vars from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase credentials in .env.local')
  process.exit(1)
}

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

async function initAuth() {
  console.log('--- INITIALIZING SUPABASE AUTH RECORD ---')
  
  const email = 'zephvion@zephvion.com'
  const password = 'zephvion@2025'
  const displayName = 'zephvion'

  console.log(`Target: ${email} / [ ${displayName} ]`)
  
  // Create/Update Auth user
  const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
    email: email,
    password: password,
    email_confirm: true,
    user_metadata: { 
      username: displayName,
      role: 'SUPER_ADMIN'
    }
  })

  if (authError) {
    if (authError.message.includes('already exists')) {
      console.log('User already exists. Syncing password...')
      const { data: users } = await supabaseAdmin.auth.admin.listUsers()
      const existingUser = users.users.find(u => u.email === email)
      if (existingUser) {
        await supabaseAdmin.auth.admin.updateUserById(existingUser.id, { 
          password: password,
          user_metadata: { username: displayName, role: 'SUPER_ADMIN' }
        })
        console.log('Credentials synchronized.')
      }
    } else {
      console.error('Auth Error:', authError.message)
    }
  } else {
    console.log('User created successfully in auth.users.')
  }

  console.log('--- AUTHENTICATION RECORD READY ---')
}

initAuth()
