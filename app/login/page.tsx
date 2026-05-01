'use client'

import { useActionState, useState, useEffect, useRef } from 'react'
import { loginAction } from './actions'

const initialState = {
  error: null as string | null,
}

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(loginAction, initialState)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isOverCard, setIsOverCard] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        setMousePos({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        })
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <main
      ref={containerRef}
      className="min-h-screen flex items-center justify-center p-4 md:p-8 bg-surface relative overflow-hidden"
    >
      {/* Base Grid Layer (Dark Dots) */}
      <div className="absolute inset-0 grid-bg opacity-30" />

      {/* Interactive Spotlight Layer (White Dots) */}
      <div
        className="absolute inset-0 pointer-events-none z-0 transition-opacity duration-500"
        style={{
          backgroundImage: 'radial-gradient(white 1px, transparent 1px)',
          backgroundSize: '24px 24px',
          maskImage: `radial-gradient(300px circle at ${mousePos.x}px ${mousePos.y}px, black, transparent)`,
          WebkitMaskImage: `radial-gradient(300px circle at ${mousePos.x}px ${mousePos.y}px, black, transparent)`,
          opacity: isOverCard ? 0 : 1,
        }}
      />

      <div
        onMouseEnter={() => setIsOverCard(true)}
        onMouseLeave={() => setIsOverCard(false)}
        className="w-full max-w-md glass glass-border p-6 md:p-10 glow-primary relative z-10 transition-all duration-500 overflow-hidden"
      >
        <header className="mb-10 relative text-center overflow-hidden">
          <h1
            className="font-display tracking-tighter mb-0.3 leading-none"
            style={{
              fontSize: 'clamp(3rem, 20vw, 4.4rem)',
              color: '#1E80E1',
              textShadow: '3px 3px 0px #FF5A1F, 6px 6px 0px #000000',
            }}
          >
            Zephvion
          </h1>
          <div className="relative mt-[-5px] md:mt-[-10px] w-full px-2">
            <p
              className="font-mono uppercase text-on-surface-variant silver-shimmer"
              style={{
                fontSize: 'clamp(0.75rem, 4vw, 1rem)',
                letterSpacing: '0.4em',
                whiteSpace: 'nowrap',
              }}
            >
              Careers Admin
            </p>
          </div>
        </header>

        <form action={formAction} className="space-y-6 relative">
          {state?.error && (
            <div className="p-3 bg-tertiary/10 border-l-2 border-tertiary text-tertiary text-xs font-mono uppercase animate-in fade-in slide-in-from-left-2 duration-300">
              Error: {state.error}
            </div>
          )}

          <div className="space-y-2">
            <label className="block text-primary font-mono text-xs md:text-sm tracking-tight uppercase">
              Username
            </label>
            <input
              name="username"
              type="text"
              required
              className="w-full bg-surface-lowest border-b-2 border-outline-variant focus:border-[#FF5A1F] focus:shadow-[0_4px_12px_-4px_rgba(255,90,31,0.3)] focus:outline-none p-3 text-on-surface transition-all duration-300 font-mono focus:bg-surface-low"
              placeholder="Enter username:"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-primary font-mono text-xs md:text-sm tracking-tight uppercase">
              Password
            </label>
            <input
              name="password"
              type="password"

              required
              className="w-full bg-surface-lowest border-b-2 border-outline-variant focus:border-[#FF5A1F] focus:shadow-[0_4px_12px_-4px_rgba(255,90,31,0.3)] focus:outline-none p-3 text-on-surface transition-all duration-300 font-mono focus:bg-surface-low"
              placeholder="Enter password:"
            />
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full gradient-primary text-on-primary py-4 font-display text-xl tracking-widest uppercase hover:opacity-95 active:scale-[0.98] transition-all disabled:opacity-50 shadow-lg hover:shadow-primary/20 flex items-center justify-center gap-3"
          >
            {isPending ? (
              <>
                Loggin in ..
                <svg className="animate-spin h-5 w-5 text-on-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </>
            ) : 'Login'}
          </button>
        </form>
      </div>
    </main>
  )
}

