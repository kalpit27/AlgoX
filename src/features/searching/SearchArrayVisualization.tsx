import React from 'react'
import { SearchElementState } from '../../types/searching'
import { Legend } from '../../components/ui/Legend'

export interface SearchArrayVisualizationProps {
  array: number[]
  elementStates: Record<number, SearchElementState>
  low?: number
  mid?: number
  high?: number
  target: number
  className?: string
}

export const SearchArrayVisualization: React.FC<SearchArrayVisualizationProps> = ({
  array,
  elementStates,
  low,
  mid,
  high,
  target,
  className = '',
}) => {
  const getCellClasses = (state: SearchElementState | undefined) => {
    if (state === 'found') {
      return 'bg-emerald-500/25 border-emerald-400 text-emerald-200 ring-2 ring-emerald-400/50 scale-105'
    }
    if (state === 'inspecting') {
      return 'bg-amber-500/25 border-amber-400 text-amber-200 ring-2 ring-amber-400/50 scale-105'
    }
    if (state === 'out-of-range') {
      return 'bg-[#0B1020]/60 border-[#1C263B] text-slate-400 opacity-40'
    }
    return 'bg-[#151E30] border-[#293449] text-slate-200 hover:border-slate-500'
  }

  const legendItems = [
    { label: 'Normal / In Range', colorClass: 'bg-indigo-500/30' },
    { label: 'Inspecting / Mid', colorClass: 'bg-amber-400' },
    { label: 'Target Found', colorClass: 'bg-emerald-400' },
    { label: 'Out of Range', colorClass: 'bg-slate-700 opacity-50' },
  ]

  return (
    <div className={`flex flex-col gap-4 w-full ${className}`}>
      {/* Target indicator banner */}
      <div className="flex items-center justify-between bg-[#111827] border border-[#252F44] px-4 py-2.5 rounded-lg text-xs">
        <span className="text-slate-400">
          Target Value:{' '}
          <span className="font-mono text-base font-bold text-sky-400 ml-1">
            {target}
          </span>
        </span>
        {low !== undefined && high !== undefined && (
          <div className="flex items-center gap-3 font-mono text-xs">
            <span className="text-slate-400">
              Low: <span className="text-indigo-400 font-bold">{low}</span>
            </span>
            {mid !== undefined && (
              <span className="text-slate-400">
                Mid: <span className="text-amber-400 font-bold">{mid}</span>
              </span>
            )}
            <span className="text-slate-400">
              High: <span className="text-indigo-400 font-bold">{high}</span>
            </span>
          </div>
        )}
      </div>

      {/* Grid of Array Elements */}
      <div className="w-full bg-[#0E1528] border border-[#222E46] rounded-xl p-6 flex flex-wrap items-center justify-center gap-2.5 min-h-[180px]">
        {array.length === 0 ? (
          <span className="text-xs text-slate-400">Array is empty.</span>
        ) : (
          array.map((value, idx) => {
            const state = elementStates[idx]
            const isMid = mid === idx
            const isLow = low === idx
            const isHigh = high === idx

            return (
              <div key={idx} className="flex flex-col items-center gap-1">
                {/* Boundary indicators above element */}
                <div className="h-4 flex items-center justify-center">
                  {isMid && (
                    <span className="text-[10px] font-mono font-bold text-amber-400">
                      MID
                    </span>
                  )}
                  {!isMid && isLow && (
                    <span className="text-[10px] font-mono font-bold text-sky-400">
                      LOW
                    </span>
                  )}
                  {!isMid && isHigh && !isLow && (
                    <span className="text-[10px] font-mono font-bold text-indigo-400">
                      HIGH
                    </span>
                  )}
                </div>

                {/* Number Box */}
                <div
                  className={`w-12 h-12 rounded-xl border flex items-center justify-center font-mono text-sm font-semibold transition-all duration-150 ${getCellClasses(
                    state
                  )}`}
                >
                  {value}
                </div>

                {/* Index label underneath */}
                <span className="text-[10px] font-mono text-slate-400">{idx}</span>
              </div>
            )
          })
        )}
      </div>

      <Legend items={legendItems} />
    </div>
  )
}
