import React from 'react'
import { Badge } from '../ui/Badge'
import { Card } from '../ui/Card'
import { ComplexityInfo } from '../../types/sorting'
import { Code, Info, Clock, CheckCircle2, XCircle } from 'lucide-react'

export interface CodeExplanationPanelProps {
  algorithmName: string
  description: string
  pseudocode: string[]
  activeLine?: number
  currentDescription?: string
  complexity?: ComplexityInfo | {
    bestTime: string
    averageTime: string
    worstTime: string
    space: string
  }
  isSorting?: boolean
  className?: string
}

export const CodeExplanationPanel: React.FC<CodeExplanationPanelProps> = ({
  algorithmName,
  description,
  pseudocode,
  activeLine = 0,
  currentDescription,
  complexity,
  isSorting = false,
  className = '',
}) => {
  const sortingComp = isSorting ? (complexity as ComplexityInfo | undefined) : undefined

  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      {/* Current Step Description Callout */}
      {currentDescription && (
        <div className="bg-indigo-950/40 border border-indigo-500/30 rounded-xl p-3.5 flex items-start gap-3">
          <Info size={16} className="text-indigo-400 shrink-0 mt-0.5" />
          <div className="flex-1">
            <span className="text-[11px] font-semibold text-indigo-300 uppercase tracking-wider block mb-0.5">
              Active Operation
            </span>
            <p className="text-sm text-slate-200 leading-snug font-sans">
              {currentDescription}
            </p>
          </div>
        </div>
      )}

      {/* Pseudocode Box */}
      <Card className="flex flex-col gap-3">
        <div className="flex items-center justify-between border-b border-[#293449] pb-3">
          <div className="flex items-center gap-2">
            <Code size={16} className="text-sky-400" />
            <h4 className="text-sm font-semibold text-white">Algorithm Pseudocode</h4>
          </div>
          <span className="text-[11px] font-mono text-slate-400">
            {activeLine > 0 ? `Line ${activeLine}` : 'Ready'}
          </span>
        </div>

        <div className="bg-[#0B1020] rounded-lg p-3 font-mono text-xs overflow-x-auto border border-[#1E283D]">
          {pseudocode.map((line, index) => {
            const lineNumber = index + 1
            const isHighlighted = lineNumber === activeLine

            return (
              <div
                key={index}
                className={`flex items-center gap-3 px-2 py-1 rounded transition-colors ${
                  isHighlighted
                    ? 'bg-indigo-600/30 text-indigo-200 font-semibold border-l-2 border-indigo-400 pl-1.5'
                    : 'text-slate-400 hover:text-slate-300'
                }`}
              >
                <span className="w-5 text-right text-slate-400 select-none text-[11px]">
                  {lineNumber}
                </span>
                <span className="whitespace-pre">{line}</span>
              </div>
            )
          })}
        </div>
      </Card>

      {/* Complexity & Properties Card */}
      {complexity && (
        <Card className="flex flex-col gap-4">
          <h4 className="text-sm font-semibold text-white flex items-center gap-2 border-b border-[#293449] pb-3">
            <Clock size={16} className="text-amber-400" />
            Complexity & Properties
          </h4>

          {/* Time & Space Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <div className="bg-[#111827] p-2.5 rounded-lg border border-[#252F44] flex flex-col">
              <span className="text-[10px] uppercase tracking-wider text-slate-400">
                Best Case
              </span>
              <span className="text-xs font-mono font-bold text-emerald-400 mt-0.5">
                {complexity.bestTime}
              </span>
            </div>

            <div className="bg-[#111827] p-2.5 rounded-lg border border-[#252F44] flex flex-col">
              <span className="text-[10px] uppercase tracking-wider text-slate-400">
                Average Case
              </span>
              <span className="text-xs font-mono font-bold text-amber-400 mt-0.5">
                {complexity.averageTime}
              </span>
            </div>

            <div className="bg-[#111827] p-2.5 rounded-lg border border-[#252F44] flex flex-col">
              <span className="text-[10px] uppercase tracking-wider text-slate-400">
                Worst Case
              </span>
              <span className="text-xs font-mono font-bold text-rose-400 mt-0.5">
                {complexity.worstTime}
              </span>
            </div>

            <div className="bg-[#111827] p-2.5 rounded-lg border border-[#252F44] flex flex-col">
              <span className="text-[10px] uppercase tracking-wider text-slate-400">
                Aux Space
              </span>
              <span className="text-xs font-mono font-bold text-sky-400 mt-0.5">
                {complexity.space}
              </span>
            </div>
          </div>

          {/* Additional Sorting properties if available */}
          {sortingComp && (
            <div className="flex flex-wrap items-center gap-3 pt-1 border-t border-[#1F293D] text-xs">
              <div className="flex items-center gap-1.5">
                <span className="text-slate-400">Stable:</span>
                {sortingComp.stable ? (
                  <Badge variant="emerald" size="xs">
                    <CheckCircle2 size={11} /> Yes
                  </Badge>
                ) : (
                  <Badge variant="rose" size="xs">
                    <XCircle size={11} /> No
                  </Badge>
                )}
              </div>

              <div className="flex items-center gap-1.5">
                <span className="text-slate-400">In-Place:</span>
                {sortingComp.inPlace ? (
                  <Badge variant="emerald" size="xs">
                    <CheckCircle2 size={11} /> Yes
                  </Badge>
                ) : (
                  <Badge variant="rose" size="xs">
                    <XCircle size={11} /> No
                  </Badge>
                )}
              </div>
            </div>
          )}

          {/* Overview text */}
          <div className="text-xs text-slate-400 leading-relaxed border-t border-[#1F293D] pt-3">
            <span className="text-slate-300 font-medium block mb-1">
              About {algorithmName}:
            </span>
            {description}
          </div>
        </Card>
      )}
    </div>
  )
}
