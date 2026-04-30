'use client'

interface Candidate {
  full_name: string | null
  email: string | null
  contact_number: string | null
  linkedin: string | null
  github: string | null
}

interface CandidatesProps {
  candidates: Candidate[]
}

export default function Candidates({ candidates }: CandidatesProps) {
  return (
    <section className="p-4 md:p-8 grid-bg pt-0">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <h2 className="font-display text-3xl md:text-5xl uppercase tracking-tighter text-on-surface">Candidates</h2>
          <div className="h-[2px] flex-1 bg-outline-variant opacity-30" />
        </div>

        {/* Large Device: Table View */}
        <div className="hidden md:block overflow-hidden glass glass-border rounded-lg">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-outline-variant bg-surface-lowest">
                <th className="p-4 text-[10px] font-mono uppercase tracking-widest text-on-surface-variant">Full Name</th>
                <th className="p-4 text-[10px] font-mono uppercase tracking-widest text-on-surface-variant">Email</th>
                <th className="p-4 text-[10px] font-mono uppercase tracking-widest text-on-surface-variant">Contact</th>
                <th className="p-4 text-[10px] font-mono uppercase tracking-widest text-on-surface-variant">LinkedIn</th>
                <th className="p-4 text-[10px] font-mono uppercase tracking-widest text-on-surface-variant">GitHub</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/30">
              {candidates.map((candidate, idx) => (
                <tr key={idx} className="hover:bg-surface-low/50 transition-colors group">
                  <td className="p-4 text-sm font-medium text-on-surface">{candidate.full_name || 'NULL'}</td>
                  <td className="p-4 text-sm text-on-surface-variant">{candidate.email || 'NULL'}</td>
                  <td className="p-4 text-sm text-on-surface-variant">{candidate.contact_number || 'NULL'}</td>
                  <td className="p-4 text-sm text-primary underline underline-offset-4 decoration-primary/30 hover:decoration-primary truncate max-w-[150px]">
                    {candidate.linkedin ? <a href={candidate.linkedin} target="_blank" rel="noreferrer">{candidate.linkedin}</a> : 'NULL'}
                  </td>
                  <td className="p-4 text-sm text-primary underline underline-offset-4 decoration-primary/30 hover:decoration-primary truncate max-w-[150px]">
                    {candidate.github ? <a href={candidate.github} target="_blank" rel="noreferrer">{candidate.github}</a> : 'NULL'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Device: Card View */}
        <div className="md:hidden space-y-4">
          {candidates.map((candidate, idx) => (
            <div key={idx} className="glass glass-border p-5 space-y-4 relative overflow-hidden">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-display uppercase tracking-widest text-primary">{candidate.full_name}</h3>
                  <p className="text-sm text-on-surface-variant font-mono">{candidate.email}</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                  {idx + 1}
                </div>
              </div>

              <div className="grid gap-3">
                {candidate.contact_number && (
                  <div className="flex flex-col">
                    <span className="text-[9px] font-mono uppercase tracking-widest text-on-surface-variant">Contact</span>
                    <span className="text-sm text-on-surface">{candidate.contact_number}</span>
                  </div>
                )}
                {candidate.linkedin && (
                  <div className="flex flex-col">
                    <span className="text-[9px] font-mono uppercase tracking-widest text-on-surface-variant">LinkedIn</span>
                    <a href={candidate.linkedin} target="_blank" rel="noreferrer" className="text-sm text-primary truncate underline decoration-primary/30">
                      {candidate.linkedin}
                    </a>
                  </div>
                )}
                {candidate.github && (
                  <div className="flex flex-col">
                    <span className="text-[9px] font-mono uppercase tracking-widest text-on-surface-variant">GitHub</span>
                    <a href={candidate.github} target="_blank" rel="noreferrer" className="text-sm text-primary truncate underline decoration-primary/30">
                      {candidate.github}
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  )
}
