# Jobs Management Module

## Overview
The Jobs module allows administrators to create, read, update, and delete (CRUD) job postings that appear on the public Zephvion Careers page.

## Routes
- `/dashboard/jobs` - The main list view of all jobs.
- `/dashboard/jobs/[id]` - Detailed view or edit page for a specific job posting.

## Features List
- **Job Listing**: View all current and past job postings in a sortable, filterable table.
- **Job Creation**: Add new job opportunities with details such as title, description, requirements, and technical/non-technical categorization.
- **Job Editing**: Modify existing job postings to update requirements or descriptions.
- **Job Deletion/Archiving**: Remove or hide jobs that are no longer accepting applications.
- **Status Toggling**: Quickly toggle the active/inactive status of a job posting.
- **Service Role Bypass**: Job modifications utilize the Supabase service role key to safely bypass standard Row Level Security for admin operations.
