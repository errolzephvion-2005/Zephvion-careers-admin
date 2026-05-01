'use client'

import Link from 'next/link'
import { logoutAction } from '@/app/dashboard/logout-action'

interface NavbarProps {
  isMenuOpen: boolean
  setIsMenuOpen: (isOpen: boolean) => void
  navLinks: { label: string; active: boolean; href: string }[]
}

export default function Navbar({ isMenuOpen, setIsMenuOpen, navLinks }: NavbarProps) {
  return (
    <header className="border-b border-outline-variant bg-surface-lowest px-4 md:px-8 py-3 sticky top-0 z-50 overflow-hidden transition-all duration-300">
      {/* Large Device Layout */}
      <div className="hidden md:grid grid-cols-3 items-center w-full min-h-[60px]">
        {/* Left: Branded Title */}
        <Link href="/dashboard" className="flex flex-col items-start w-fit justify-center">
          <div
            className="font-display text-4xl lg:text-[2.75rem] tracking-tight lg:tracking-normal leading-[0.8]"
            style={{
              color: '#1E80E1',
              textShadow: '2px 2px 0px #FF5A1F, 4px 4px 0px #000000',
            }}
          >
            ZEPHVION
          </div>
          <div className="relative mt-1 ml-0.5">
            <p
              className="font-mono uppercase text-on-surface-variant silver-shimmer text-[8px] lg:text-[9px]"
              style={{
                letterSpacing: '0.4em',
                whiteSpace: 'nowrap',
              }}
            >
              Careers Admin
            </p>
          </div>
        </Link>

        {/* Middle: Navigation Links */}
        <nav className="flex items-center justify-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`text-[11px] font-mono uppercase tracking-[0.2em] transition-colors ${link.active ? 'text-primary border-b border-primary' : 'text-on-surface-variant hover:text-primary'}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right: Welcome & Logout (Horizontal, Bottom Aligned) */}
        <div className="flex items-center justify-end gap-4 self-end mb-[-4px]">
          <div className="text-[10px] text-on-surface-variant uppercase font-mono tracking-widest opacity-70">
            Welcome Admin
          </div>
          <form action={async () => {
            localStorage.clear()
            await logoutAction()
          }}>
            <button className="text-[10px] font-bold text-red-500 hover:text-red-400 uppercase tracking-widest transition-colors leading-none">
              Logout
            </button>
          </form>
        </div>
      </div>

      {/* Mobile Device Layout */}
      <div className="md:hidden flex justify-between items-center w-full">
        {/* Logo */}
        <Link href="/dashboard" className="flex flex-col items-start justify-center">
          <div
            className="font-display text-3xl sm:text-4xl tracking-tight leading-[0.8]"
            style={{
              color: '#1E80E1',
              textShadow: '1.5px 1.5px 0px #FF5A1F, 3px 3px 0px #000000',
            }}
          >
            ZEPHVION
          </div>
          <div className="relative mt-1 ml-0.5">
            <p
              className="font-mono uppercase text-on-surface-variant silver-shimmer text-[7px] sm:text-[8px]"
              style={{
                letterSpacing: '0.3em',
                whiteSpace: 'nowrap',
              }}
            >
              Careers Admin
            </p>
          </div>
        </Link>

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
        className={`md:hidden fixed top-0 right-0 h-full w-[85vw] max-w-[280px] bg-surface-lowest z-[60] shadow-2xl border-l border-outline-variant transition-transform duration-500 ease-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="p-5 md:p-6 h-full flex flex-col">
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
              <Link
                key={link.label}
                href={link.href}
                className={`text-2xl font-display uppercase tracking-widest text-left py-4 border-b border-outline-variant/30 transition-all hover:pl-2 ${link.active ? 'text-primary' : 'text-on-surface'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="mt-auto pt-6 border-t border-outline-variant">
            <div className="text-[10px] text-on-surface-variant uppercase font-mono tracking-widest mb-4 opacity-70">
              Logged in as Admin
            </div>
            <form action={async () => {
              localStorage.clear()
              await logoutAction()
            }}>
              <button className="w-full text-xl font-display text-red-500 uppercase tracking-widest text-left hover:text-red-400 transition-colors">
                Logout
              </button>
            </form>
          </div>
        </div>
      </div>
    </header>
  )
}
