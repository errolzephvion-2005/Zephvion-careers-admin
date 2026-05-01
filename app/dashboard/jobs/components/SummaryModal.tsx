'use client'

interface SummaryModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm?: () => void
  changes: { field: string; from: any; to: any }[]
  mode: 'review' | 'success'
  isPending?: boolean
}

export default function SummaryModal({ isOpen, onClose, onConfirm, changes, mode, isPending }: SummaryModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={onClose} />
      
      <div className="glass glass-border p-8 max-w-2xl w-full relative z-10 glow-primary border-primary/50">
        <div className="flex items-center gap-4 mb-8">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${mode === 'review' ? 'bg-amber-500/10 text-amber-500' : 'bg-primary/10 text-primary'}`}>
            {mode === 'review' ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            )}
          </div>
          <div>
            <h3 className="text-2xl font-display uppercase tracking-widest text-on-surface">
              {mode === 'review' ? 'Review Changes' : 'Update Successful'}
            </h3>
            <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-primary opacity-70">
              {mode === 'review' ? 'Please confirm the following modifications' : 'Summary of changes saved'}
            </p>
          </div>
        </div>

        <div className="space-y-4 mb-10 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
          {changes.length === 0 ? (
            <p className="text-on-surface-variant font-mono text-sm italic">No data was modified.</p>
          ) : (
            changes.map((change, idx) => (
              <div key={idx} className="p-4 bg-surface-low border border-outline-variant/30">
                <div className="text-[10px] font-mono uppercase tracking-widest text-primary mb-2">
                  Field: {change.field.replace(/_/g, ' ')}
                </div>
                <div className="grid grid-cols-[1fr,auto,1fr] items-center gap-4 text-xs font-mono">
                  <div className="text-red-400/60 line-through truncate">{String(change.from)}</div>
                  <div className="text-on-surface-variant">→</div>
                  <div className="text-green-400 font-bold break-words">{String(change.to)}</div>
                </div>
              </div>
            ))
          )}
        </div>
        
        <div className="flex gap-4">
          {mode === 'review' ? (
            <>
              <button
                onClick={onClose}
                disabled={isPending}
                className="flex-1 py-4 border border-outline-variant text-on-surface-variant font-mono text-xs uppercase tracking-widest hover:bg-surface-low transition-colors disabled:opacity-50"
              >
                Go Back
              </button>
              <button
                onClick={onConfirm}
                disabled={isPending || changes.length === 0}
                className="flex-[2] py-4 gradient-primary text-on-primary font-display text-xl uppercase tracking-widest hover:opacity-95 transition-all disabled:opacity-50"
              >
                {isPending ? 'Saving...' : 'Confirm & Save'}
              </button>
            </>
          ) : (
            <button
              onClick={onClose}
              className="w-full py-4 gradient-primary text-on-primary font-display text-xl uppercase tracking-widest hover:opacity-95 transition-all"
            >
              Got it
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
