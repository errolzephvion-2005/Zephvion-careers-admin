'use client'

import { useState } from 'react'
import Navbar from '@/shared/components/Navbar'
import StatsCards from './components/StatsCards'
import Candidates from './components/Candidates'

interface DashboardClientProps {
  stats: { label: string; value: string; color: string }[]
  candidates: any[]
}

export default function DashboardClient({ stats, candidates }: DashboardClientProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navLinks = [
    { label: 'Dashboard', active: true, href: '/dashboard' },
    { label: 'Jobs', active: false, href: '/dashboard/jobs' },
    { label: 'Applications', active: false, href: '/dashboard/applications' },
  ]

  return (
    <main className="min-h-screen bg-surface flex flex-col font-sans relative">
      <Navbar
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        navLinks={navLinks}
      />

      <StatsCards stats={stats} />

      <Candidates candidates={candidates} />
    </main>
  )
}
