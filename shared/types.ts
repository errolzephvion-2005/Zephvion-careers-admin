/**
 * Type definitions for the Zephvion Careers Admin project.
 * Based on the Database Schema (ER Diagram).
 */

export interface Job {
  id: number;
  job_title: string;
  job_reference_code: string;
  work_experience?: string;
  location?: string;
  educational_requirements?: string;
  service_line?: string;
  category?: string;
  responsibilities?: string;
  technical_requirements?: string;
  preferred_skills?: string;
  job_type?: string;
  is_trending?: boolean;
  is_active?: boolean;
  created_at?: string;
  salary?: string;
  status?: string;
  additional_information?: string;
}

export interface Candidate {
  id: number;
  full_name: string;
  email: string;
  contact_number: string;
  linkedin?: string;
  github?: string;
  created_at?: string;
}

export interface Application {
  id: number;
  job_id: number;
  candidate_id: number;
  motivation: string;
  resume_url: string;
  cover_letter_url?: string;
  cover_letter?: string; // Optional alias
  status?: string;
  created_at: string;

  // Optional joined fields for when data is fetched together
  jobs?: Job;
  candidates?: Candidate;
}

