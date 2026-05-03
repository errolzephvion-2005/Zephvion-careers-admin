'use client'

import { useEffect } from 'react'

interface ErrorModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  message: string
}

export default function ErrorModal({ isOpen, onClose, title = "System Error", message }: ErrorModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/90 backdrop-blur-md" 
        onClick={onClose} 
      />
      
      {/* Modal Container */}
      <div className="glass border-red-500/50 bg-red-500/5 p-8 max-w-lg w-full relative z-10 shadow-2xl animate-in zoom-in-95 duration-200 glow-red">
        <div className="flex flex-col items-center text-center">
          {/* Large Error Icon */}
          <div className="w-20 h-20 rounded-full bg-red-500/20 flex items-center justify-center mb-6 border border-red-500/30">
            <svg className="w-10 h-10 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>

          <h3 className="text-3xl font-display uppercase tracking-tighter text-red-500 mb-4">
            {title}
          </h3>
          
          <div className="w-full h-[1px] bg-red-500/20 mb-6" />
          
          <p className="font-mono text-sm text-on-surface-variant uppercase tracking-widest leading-relaxed mb-8">
            {message}
          </p>

          <button
            onClick={onClose}
            className="w-full py-4 bg-red-500 text-white font-display text-xl uppercase tracking-widest hover:bg-red-600 transition-all active:scale-[0.98] shadow-lg shadow-red-500/20"
          >
            Acknowledge & Close
          </button>
        </div>

        {/* Decorative elements */}
        <div className="absolute -top-1 -left-1 w-8 h-8 border-t-2 border-l-2 border-red-500" />
        <div className="absolute -bottom-1 -right-1 w-8 h-8 border-b-2 border-r-2 border-red-500" />
      </div>
    </div>
  )
}
