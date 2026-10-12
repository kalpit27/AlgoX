import React from 'react'
import { ElementState } from '../../types/sorting'
import { Legend } from '../../components/ui/Legend'

export interface ArrayBarVisualizationProps {
  array: number[]
  elementStates: Record<number, ElementState>
  maxValue?: number
  height?: number
  showIndices?: boolean
  showValues?: boolean
  className?: string
}

export const ArrayBarVisualization: React.FC<ArrayBarVisualizationProps> = ({
  array,
  elementStates,
  height = 320,
  showIndices = true,
  showValues = true,
  className = '',
}) => {
  // Compute max value for proportional bar heights (minimum 1 to prevent divide-by-zero)
  const maxVal = Math.max(...array.map((v) => Math.abs(v)), 1)
  const n = array.length

  const getBarColor = (state: ElementState | undefined) => {
    switch (state) {
      case 'comparing':
        return 'bg-amber-400 shadow-md shadow-amber-500/40 border-amber-300'
      case 'swapping':
        return 'bg-rose-500 shadow-md shadow-rose-500/40 border-rose-400'
      case 'writing':
        return 'bg-purple-500 shadow-md shadow-purple-500/40 border-purple-400'
      case 'pivot':
        return 'bg-pink-500 shadow-md shadow-pink-500/40 border-pink-400'
      case 'min-max':
        return 'bg-cyan-400 shadow-md shadow-cyan-400/40 border-cyan-300'
      case 'sorted':
        return 'bg-emerald-400 shadow-md shadow-emerald-500/40 border-emerald-300'
      default:
        return 'bg-sky-500/80 hover:bg-sky-400 border-sky-400/40'
    }
  }

  const sortingLegendItems = [
    { label: 'Default', colorClass: 'bg-sky-500' },
    { label: 'Comparing', colorClass: 'bg-amber-400' },
    { label: 'Swapping', colorClass: 'bg-rose-500' },
    { label: 'Writing/Shift', colorClass: 'bg-purple-500' },
    { label: 'Pivot', colorClass: 'bg-pink-500' },
    { label: 'Min/Max', colorClass: 'bg-cyan-400' },
    { label: 'Sorted', colorClass: 'bg-emerald-400' },
  ]

  // Decide whether to show values based on element count
  const renderValues = showValues && n <= 32
  const renderIndices = showIndices && n <= 32

  return (
    <div className={`flex flex-col gap-3 w-full ${className}`}>
      {/* Bars Canvas Container */}
      <div
        className="w-full bg-[#0E1528] border border-[#222E46] rounded-xl p-4 flex items-end justify-center gap-1 sm:gap-1.5 overflow-x-auto relative"
        style={{ minHeight: `${height}px`, height: `${height}px` }}
      >
        {array.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-slate-400 text-sm h-full w-full">
            <span>Array is empty. Generate or enter an array to begin.</span>
          </div>
        ) : (
          array.map((value, idx) => {
            const state = elementStates[idx] || 'default'
            // Calculate proportional height (leave 40px at top for labels)
            const availableHeight = height - 60
            const barHeight = Math.max(12, Math.round((Math.abs(value) / maxVal) * availableHeight))

            return (
              <div
                key={idx}
                className="flex-1 max-w-[48px] min-w-[6px] flex flex-col items-center justify-end h-full group select-none"
              >
                {/* Element value badge */}
                {renderValues && (
                  <span
                    className={`text-[10px] font-mono mb-1 transition-colors ${
                      state === 'default'
                        ? 'text-slate-400'
                        : 'text-white font-bold'
                    }`}
                  >
                    {value}
                  </span>
                )}

                {/* Vertical Bar */}
                <div
                  className={`w-full rounded-t-sm transition-all duration-100 border-t ${getBarColor(
                    state
                  )}`}
                  style={{ height: `${barHeight}px` }}
                  title={`Index: ${idx}, Value: ${value}, State: ${state}`}
                />

                {/* Index label */}
                {renderIndices && (
                  <span className="text-[9px] font-mono text-slate-400 mt-1">
                    {idx}
                  </span>
                )}
              </div>
            )
          })
        )}
      </div>

      {/* Legend */}
      <Legend items={sortingLegendItems} />
    </div>
  )
}
