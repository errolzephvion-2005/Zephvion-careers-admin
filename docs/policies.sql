-- SUPABASE RLS POLICIES FOR ZEPHVION CAREERS
-- RUN THESE IN THE SUPABASE SQL EDITOR

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
