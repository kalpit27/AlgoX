import React from 'react'

export interface LegendItem {
  label: string
  colorClass: string
  bgHex?: string
  description?: string
}

export interface LegendProps {
  items: LegendItem[]
  className?: string
}

export const Legend: React.FC<LegendProps> = ({ items, className = '' }) => {
  return (
    <div
      className={`flex flex-wrap items-center gap-x-4 gap-y-2 p-2.5 rounded-lg bg-[#111827]/80 border border-[#252F44] text-xs text-slate-300 ${className}`}
    >
      <span className="text-slate-400 font-medium mr-1 text-[11px] uppercase tracking-wider">
        Legend:
      </span>
      {items.map((item, idx) => (
        <div key={idx} className="flex items-center gap-1.5" title={item.description}>
          <span
            className={`w-3 h-3 rounded-xs shrink-0 ${item.colorClass}`}
            style={item.bgHex ? { backgroundColor: item.bgHex } : undefined}
          />
          <span className="text-xs text-slate-300">{item.label}</span>
        </div>
      ))}
    </div>
  )
}
