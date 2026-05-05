# Database Architecture

## Overview
The portal is powered by a PostgreSQL database hosted on Supabase. This module outlines the structure and data operations for the Zephvion Careers platform.

## Key Tables
- **Jobs**: Stores all job postings (`id`, `title`, `description`, `is_active`, `category`, etc.)
- **Candidates**: Stores unique candidate profiles (`id`, `email`, `contact_number`, `name`, etc.)
- **Applications**: Links candidates to jobs and tracks application status (`id`, `job_id`, `candidate_id`, `status`, `resume_url`, etc.)

## Features List
- **Row Level Security (RLS)**: Strict security policies ensuring that public users can only read active jobs and submit applications, while admins have full access.
- **Unique Constraints**: Robust constraints (like unique email or contact number) to prevent duplicate candidate profiles.
- **Upsert Logic**: Intelligent database actions that handle candidate registration by matching existing profiles or creating new ones during application submission.
- **Service Role Operations**: Specific admin server actions bypass RLS securely to allow comprehensive data management from the dashboard.
