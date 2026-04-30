'use client'

import { useState } from 'react'
import { logoutAction } from './logout-action'

export default function DashboardPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const stats = [
    { label: 'Active Jobs', value: '12', color: 'text-primary' },
    { label: 'Candidates', value: '458', color: 'text-secondary' },
    { label: 'Applications', value: '1,204', color: 'text-tertiary' },
  ]

  const navLinks = [
    { label: 'Dashboard', active: true },
    { label: 'Jobs', active: false },
    { label: 'Applications', active: false },
    { label: 'Candidates', active: false },
  ]

  return (
    <main className="min-h-screen bg-surface flex flex-col font-sans relative">
      {/* Branded Header */}
      <header className="border-b border-outline-variant bg-surface-lowest px-4 md:px-8 py-3 sticky top-0 z-50 overflow-hidden transition-all duration-300">
        {/* Large Device Layout */}
        <div className="hidden md:grid grid-cols-3 items-center w-full min-h-[60px]">
          {/* Left: Branded Title */}
          <div className="flex items-center">
            <div
              className="font-display text-4xl lg:text-6xl tracking-tight lg:tracking-normal"
              style={{
                color: '#1E80E1',
                textShadow: '2px 2px 0px #FF5A1F, 4px 4px 0px #000000',
              }}
            >
              ZEPHVION
            </div>
          </div>

          {/* Middle: Navigation Links */}
          <nav className="flex items-center justify-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.label}
                className={`text-[11px] font-mono uppercase tracking-[0.2em] transition-colors ${link.active ? 'text-primary border-b border-primary' : 'text-on-surface-variant hover:text-primary'}`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Right: Welcome & Logout (Horizontal, Bottom Aligned) */}
          <div className="flex items-center justify-end gap-4 self-end mb-[-4px]">
            <div className="text-[10px] text-on-surface-variant uppercase font-mono tracking-widest opacity-70">
              Welcome Admin
            </div>
            <form action={logoutAction}>
              <button className="text-[10px] font-bold text-red-500 hover:text-red-400 uppercase tracking-widest transition-colors leading-none">
                Logout
              </button>
            </form>
          </div>
        </div>

        {/* Mobile Device Layout */}
        <div className="md:hidden flex justify-between items-center w-full">
          {/* Logo */}
          <div
            className="font-display text-4xl sm:text-5xl tracking-tight"
            style={{
              color: '#1E80E1',
              textShadow: '1.5px 1.5px 0px #FF5A1F, 3px 3px 0px #000000',
            }}
          >
            ZEPHVION
          </div>

          {/* Mobile Menu Icon */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex flex-col justify-center items-center w-10 h-10 relative z-50 focus:outline-none"
          >
            <div className={`w-6 h-0.5 bg-on-surface transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-0.5' : '-translate-y-1.5'}`} />
            <div className={`w-6 h-0.5 bg-on-surface transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`} />
            <div className={`w-6 h-0.5 bg-on-surface transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-0.5' : 'translate-y-1.5'}`} />
          </button>
        </div>

        {/* Mobile Navigation Menu (Side Drawer) */}
        <div 
          className={`md:hidden fixed inset-0 bg-black/60 z-[55] backdrop-blur-sm transition-opacity duration-300 ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
          onClick={() => setIsMenuOpen(false)}
        />
        <div 
          className={`md:hidden fixed top-0 right-0 h-full w-72 bg-surface-lowest z-[60] shadow-2xl border-l border-outline-variant transition-transform duration-500 ease-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
        >
          <div className="p-6 h-full flex flex-col">
            <div className="flex justify-between items-center mb-10">
              <div className="text-[10px] font-mono text-on-surface-variant uppercase tracking-[0.3em]">
                Navigation
              </div>
              <button 
                onClick={() => setIsMenuOpen(false)}
                className="w-10 h-10 flex items-center justify-center text-on-surface hover:text-primary transition-colors"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <nav className="flex flex-col gap-1 flex-1">
              {navLinks.map((link) => (
                <button 
                  key={link.label}
                  className={`text-2xl font-display uppercase tracking-widest text-left py-4 border-b border-outline-variant/30 transition-all hover:pl-2 ${link.active ? 'text-primary' : 'text-on-surface'}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </button>
              ))}
            </nav>

            <div className="mt-auto pt-6 border-t border-outline-variant">
              <div className="text-[10px] text-on-surface-variant uppercase font-mono tracking-widest mb-4 opacity-70">
                Logged in as Admin
              </div>
              <form action={logoutAction}>
                <button className="w-full text-xl font-display text-red-500 uppercase tracking-widest text-left hover:text-red-400 transition-colors">
                  Logout
                </button>
              </form>
            </div>
          </div>
        </div>
      </header>



      {/* Simplified Stats Grid */}
      <section className="flex-1 p-4 md:p-8 grid-bg">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="glass glass-border p-6 glow-primary">
                <div className="text-[10px] font-mono text-on-surface-variant uppercase tracking-widest mb-4">
                  {stat.label}
                </div>
                <div className="flex items-baseline gap-2">
                  <span className={`text-5xl font-display ${stat.color}`}>{stat.value}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Placeholder for Content */}
          <div className="mt-8 glass glass-border p-8 border-dashed flex items-center justify-center min-h-[200px]">
            <div className="text-center">
              <div className="font-display text-xl tracking-widest text-on-surface-variant uppercase">Dashboard Overview</div>
              <p className="text-sm text-on-surface-variant mt-2">Select a section from the menu above to manage jobs and candidates.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}


