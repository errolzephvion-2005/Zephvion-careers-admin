# Supabase RLS Policies Documentation

This document contains all Row Level Security (RLS) policies required for the Zephvion Careers Admin portal.

## Overview

This is an **Admin-only portal** - all access requires authentication. There is no public job board or anonymous access.

## Prerequisites

1. Create a Supabase project at [supabase.com](https://supabase.com)
2. Get your project credentials from Settings > API
3. Set up environment variables in `.env.local`:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_project_url
   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   ```

---

## Database RLS Policies

Run these SQL commands in the Supabase SQL Editor (SQL > New Query).

### 1. Jobs Table Policies

```sql
-- Enable RLS on jobs table
ALTER TABLE "public"."jobs" ENABLE ROW LEVEL SECURITY;

-- Drop existing policy if exists
DROP POLICY IF EXISTS "Admin full access on jobs" ON "public"."jobs";

-- Create policy: Allow authenticated admins full access
CREATE POLICY "Admin full access on jobs" 
ON "public"."jobs"
FOR ALL 
TO authenticated 
USING (true) 
WITH CHECK (true);

-- Explanation:
-- - FOR ALL: Applies to SELECT, INSERT, UPDATE, DELETE
-- - TO authenticated: Only logged-in users (admins)
-- - USING (true): Allow reading all rows
-- - WITH CHECK (true): Allow inserting/updating any row
```

**What this allows:**
| Operation | Access |
|-----------|--------|
| SELECT | View all job postings |
| INSERT | Create new jobs |
| UPDATE | Edit existing jobs |
| DELETE | Remove jobs |

---

### 2. Candidates Table Policies

```sql
-- Enable RLS on candidates table
ALTER TABLE "public"."candidates" ENABLE ROW LEVEL SECURITY;

-- Drop existing policy if exists
DROP POLICY IF EXISTS "Admin full access on candidates" ON "public"."candidates";

-- Create policy: Allow authenticated admins full access
CREATE POLICY "Admin full access on candidates" 
ON "public"."candidates"
FOR ALL 
TO authenticated 
USING (true) 
WITH CHECK (true);
```

**What this allows:**
| Operation | Access |
|-----------|--------|
| SELECT | View all candidate profiles |
| INSERT | Add new candidates (via applications) |
| UPDATE | Edit candidate information |
| DELETE | Remove candidate records |

---

### 3. Applications Table Policies

```sql
-- Enable RLS on applications table
ALTER TABLE "public"."applications" ENABLE ROW LEVEL SECURITY;

-- Drop existing policy if exists
DROP POLICY IF EXISTS "Admin full access on applications" ON "public"."applications";

-- Create policy: Allow authenticated admins full access
CREATE POLICY "Admin full access on applications" 
ON "public"."applications"
FOR ALL 
TO authenticated 
USING (true) 
WITH CHECK (true);
```

**What this allows:**
| Operation | Access |
|-----------|--------|
| SELECT | View all job applications |
| INSERT | Submit new applications |
| UPDATE | Update application status (pending → reviewed → shortlisted → hired/rejected) |
| DELETE | Remove applications |

---

## Complete SQL Script

Copy and paste this entire block into Supabase SQL Editor:

```sql
-- =====================================================
-- ZEPHVION CAREERS ADMIN - RLS POLICIES
-- Run this entire script in Supabase SQL Editor
-- =====================================================

-- 1. JOBS TABLE
ALTER TABLE "public"."jobs" ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Admin full access on jobs" ON "public"."jobs";
CREATE POLICY "Admin full access on jobs" ON "public"."jobs"
FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- 2. CANDIDATES TABLE  
ALTER TABLE "public"."candidates" ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Admin full access on candidates" ON "public"."candidates";
CREATE POLICY "Admin full access on candidates" ON "public"."candidates"
FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- 3. APPLICATIONS TABLE
ALTER TABLE "public"."applications" ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Admin full access on applications" ON "public"."applications";
CREATE POLICY "Admin full access on applications" ON "public"."applications"
FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- =====================================================
-- POLICIES APPLIED SUCCESSFULLY
-- =====================================================
```

---

## Verification

After running the policies, verify they are working:

```sql
-- Check RLS is enabled
SELECT schemaname, tablename, rowsecurity 
FROM pg_tables 
WHERE tablename IN ('jobs', 'candidates', 'applications');

-- List all policies
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check
FROM pg_policies 
WHERE tablename IN ('jobs', 'candidates', 'applications');
```

---

## Authentication Setup

### Create Admin User

Use the initialization script to create your admin account:

```bash
npx tsx scratch/init_db.ts
```

Or manually create in Supabase Dashboard:
1. Go to Authentication > Users
2. Click "Add User"
3. Set email: `your-admin@company.com`
4. Set password and confirm
5. Email confirm: Checked

---

## Security Model

```
┌─────────────────────────────────────────┐
│           ANONYMOUS USERS               │
│  (No access - RLS blocks all tables)    │
└─────────────────────────────────────────┘
                    │
                    ▼ (Must login)
┌─────────────────────────────────────────┐
│         AUTHENTICATED ADMINS            │
│  • Full CRUD on jobs                    │
│  • Full CRUD on candidates              │
│  • Full CRUD on applications            │
└─────────────────────────────────────────┘
```

---

## Troubleshooting

### "Permission denied" errors
- Check that RLS is enabled: `ALTER TABLE table_name ENABLE ROW LEVEL SECURITY;`
- Verify policies exist: Check Supabase > Database > Policies
- Confirm user is authenticated: Check Authentication > Users

### Policies not working
- Policies only apply to new connections. Refresh your app/session.
- Service Role Key bypasses RLS - use it only for server-side operations

### Need to disable RLS temporarily
```sql
ALTER TABLE "public"."jobs" DISABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."candidates" DISABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."applications" DISABLE ROW LEVEL SECURITY;
```

---

## Notes

- This is an **internal admin portal** - no public access policies needed
- All file uploads (resumes, cover letters) are stored as URLs in the database
- The middleware (`middleware.ts`) handles route protection at the application level
- RLS provides the database-level security layer
