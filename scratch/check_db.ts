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

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function checkData() {
  console.log('Checking Jobs...')
  const { data: jobs, error: jobsError } = await supabase.from('jobs').select('*').limit(5)
  if (jobsError) console.error('Jobs Error:', jobsError.message)
  else console.log('Jobs:', jobs)

  console.log('\nChecking Applications...')
  const { data: apps, error: appsError } = await supabase.from('applications').select('*').limit(5)
  if (appsError) console.error('Apps Error:', appsError.message)
  else console.log('Apps:', apps)

  console.log('\nChecking Candidates...')
  const { data: candidates, error: candError } = await supabase.from('candidates').select('*').limit(5)
  if (candError) console.error('Candidates Error:', candError.message)
  else console.log('Candidates:', candidates)
}

checkData()
