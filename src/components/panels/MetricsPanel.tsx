import React from 'react'
import { Card } from '../ui/Card'
import { Badge } from '../ui/Badge'
import { Activity, ArrowLeftRight, CheckCheck, Hash } from 'lucide-react'

export interface MetricsPanelProps {
  comparisons: number
  swaps?: number
  writes?: number
  size: number
  status: 'idle' | 'running' | 'paused' | 'completed'
  className?: string
}

export const MetricsPanel: React.FC<MetricsPanelProps> = ({
  comparisons,
  swaps,
  writes,
  size,
  status,
  className = '',
}) => {
  const statusBadge = {
    idle: <Badge variant="neutral">Idle</Badge>,
    running: (
      <Badge variant="cyan" className="animate-pulse">
        Running
      </Badge>
    ),
    paused: <Badge variant="amber">Paused</Badge>,
    completed: <Badge variant="emerald">Completed</Badge>,
  }[status]

  return (
    <Card className={`p-3.5 bg-[#111827] border-[#252F44] ${className}`}>
      <div className="flex items-center justify-between mb-3 border-b border-[#1E283D] pb-2">
        <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
          <Activity size={14} className="text-indigo-400" />
          Execution Metrics
        </span>
        {statusBadge}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        <div className="bg-[#151E30] p-2 rounded-lg border border-[#293449] flex flex-col">
          <span className="text-[10px] text-slate-400 font-medium">Comparisons</span>
          <span className="text-base font-mono font-bold text-sky-400 mt-0.5">
            {comparisons}
          </span>
        </div>

        {swaps !== undefined && (
          <div className="bg-[#151E30] p-2 rounded-lg border border-[#293449] flex flex-col">
            <span className="text-[10px] text-slate-400 font-medium flex items-center gap-1">
              <ArrowLeftRight size={11} /> Swaps
            </span>
            <span className="text-base font-mono font-bold text-rose-400 mt-0.5">
              {swaps}
            </span>
          </div>
        )}

        {writes !== undefined && (
          <div className="bg-[#151E30] p-2 rounded-lg border border-[#293449] flex flex-col">
            <span className="text-[10px] text-slate-400 font-medium flex items-center gap-1">
              <CheckCheck size={11} /> Writes/Shifts
            </span>
            <span className="text-base font-mono font-bold text-purple-400 mt-0.5">
              {writes}
            </span>
          </div>
        )}

        <div className="bg-[#151E30] p-2 rounded-lg border border-[#293449] flex flex-col">
          <span className="text-[10px] text-slate-400 font-medium flex items-center gap-1">
            <Hash size={11} /> Elements
          </span>
          <span className="text-base font-mono font-bold text-slate-200 mt-0.5">
            {size}
          </span>
        </div>
      </div>
    </Card>
  )
}
