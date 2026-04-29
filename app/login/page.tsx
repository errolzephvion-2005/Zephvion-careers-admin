'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    // Map plain text username to internal auth email
    const email = username.toLowerCase() === 'zephvion' 
      ? 'zephvion@zephvion.com' 
      : username

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      router.push('/dashboard')
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-4 grid-bg">
      {/* Grid Intersection Markers */}
      <div className="fixed top-8 left-8 text-primary/20 font-mono text-xs">+ SEC_ALPHA_01</div>
      <div className="fixed top-8 right-8 text-primary/20 font-mono text-xs">SYS_AUTH_v1.0 +</div>
      <div className="fixed bottom-8 left-8 text-primary/20 font-mono text-xs">+ 45.32.11.0</div>
      <div className="fixed bottom-8 right-8 text-primary/20 font-mono text-xs">ZEPHVION // INFRA +</div>

      <div className="w-full max-w-md glass glass-border p-8 glow-primary relative overflow-hidden">
        {/* CRT Glow Effect Overlay */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-primary/5 to-transparent opacity-50" />
        
        <header className="mb-8 relative">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 bg-secondary animate-pulse-robotic" />
            <span className="text-secondary font-mono text-[10px] tracking-widest uppercase">Operational Status: Active</span>
          </div>
          <h1 className="text-4xl text-primary mb-2">Login // Access</h1>
          <p className="text-on-surface-variant text-sm font-sans">Initialize administrative credentials to proceed.</p>
        </header>

        <form onSubmit={handleLogin} className="space-y-6 relative">
          {error && (
            <div className="p-3 bg-tertiary/10 border-l-2 border-tertiary text-tertiary text-xs font-mono uppercase">
              [ Error: {error} ]
            </div>
          )}

          <div className="space-y-2">
            <label className="block text-primary font-mono text-xs tracking-tighter uppercase">
              [ Username ]
            </label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-surface-lowest border-b-2 border-outline-variant focus:border-secondary focus:outline-none p-3 text-on-surface transition-all duration-300 font-mono"
              placeholder="ZEPHVION"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-primary font-mono text-xs tracking-tighter uppercase">
              [ Password ]
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-surface-lowest border-b-2 border-outline-variant focus:border-secondary focus:outline-none p-3 text-on-surface transition-all duration-300 font-mono"
            />
          </div>


          <button
            type="submit"
            disabled={loading}
            className="w-full gradient-primary text-on-primary py-4 font-display text-xl tracking-widest uppercase hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-50"
          >
            {loading ? 'Authenticating...' : 'Establish Connection'}
          </button>
        </form>

        <footer className="mt-8 pt-6 border-t border-outline-variant flex justify-between items-center">
          <div className="text-[10px] font-mono text-on-surface-variant uppercase">
            Encrypted // End-to-End
          </div>
          <div className="text-[10px] font-mono text-on-surface-variant">
            VER: 2026.04.29
          </div>
        </footer>
      </div>
    </main>
  )
}
