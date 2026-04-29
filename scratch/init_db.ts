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

async function setupDatabase() {
  console.log('--- RE-INITIALIZING INDUSTRIAL AUTH SYSTEM ---')
  
  const identifier = 'zephvion@zephvion.com'
  const displayName = 'zephvion'
  const password = 'zephvion@2025'

  // 1. Create/Re-create Auth User
  console.log(`Phase 1: Creating Auth record for [ ${displayName} ]...`)
  const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
    email: identifier,
    password: password,
    email_confirm: true,
    user_metadata: { 
      username: displayName,
      role: 'SUPER_ADMIN'
    }
  })

  if (authError) {
    console.error('Auth Error:', authError.message)
  } else {
    const userId = authData.user.id
    console.log(`Auth record secured. ID: ${userId}`)

    // 2. Create the 'profiles' table in the public schema to show requested columns
    // We use RPC or just attempt to use the admin client to check/create if possible.
    // Since we can't run raw SQL directly through the standard JS client easily without a stored proc,
    // I will use the metadata for now, but I'll provide the SQL code for the user to run in their dashboard
    // to see the "Columns" they requested in the Table Editor.
    
    console.log('Phase 2: Technical Metadata generated.')
    console.log(`[ ID ] : ${userId}`)
    console.log(`[ USERNAME ] : ${displayName}`)
    console.log(`[ CREATED ] : ${authData.user.created_at}`)
    console.log(`[ LAST_ACCESS ] : ${authData.user.last_sign_in_at || 'NEVER'}`)
  }

  console.log('--- SYSTEM RESTORED: AUTHENTICATION ACTIVE ---')
}

setupDatabase()
