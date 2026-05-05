# Dashboard Module

## Overview
The Dashboard serves as the central hub for the Zephvion Careers Admin Portal. It provides a high-level summary of system activity and serves as the primary navigation point to manage jobs and applications.

## Routes
- `/dashboard` - The main dashboard landing page.
- `/dashboard/loading.tsx` - Provides skeleton loading states for smooth transitions.
- `/login` - The authentication entry point for accessing the dashboard.

## Features List
- **Authentication**: Secure login flow to protect admin routes.
- **High-Level Metrics**: Quick statistics on total active jobs, recent applications, etc.
- **Module Navigation**: Easy access to the Jobs and Applications management areas.
- **Session Management**: Secure logout functionality and session verification via Supabase.
