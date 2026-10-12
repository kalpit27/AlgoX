import React from 'react'
import { Card } from '../../components/ui/Card'
import {
  Code2,
  CheckCircle2,
  Cpu,
  Layers,
  Sparkles,
  ShieldCheck,
  Zap,
} from 'lucide-react'

export const AboutView: React.FC = () => {
  return (
    <div className="flex flex-col gap-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="border-b border-[#1E283D] pb-5">
        <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
          About Algox
          <span className="text-xs px-2.5 py-0.5 rounded font-mono bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
            Portfolio System
          </span>
        </h1>
        <p className="text-base text-indigo-300 font-medium mt-1">
          Algorithms in Motion. Understand the logic. Visualize the process.
        </p>
      </div>

      {/* Purpose & Background */}
      <Card className="flex flex-col gap-3 bg-[#151E30] border-[#293449] p-6">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <Sparkles size={18} className="text-indigo-400" />
          Project Overview & Motivation
        </h2>
        <p className="text-sm text-slate-300 leading-relaxed">
          <strong>Algox™</strong> is a comprehensive algorithm and data structure visualization platform developed by Kalpit to help engineers and students master DSA intuitively.
        </p>
        <p className="text-sm text-slate-300 leading-relaxed">
          Traditional DSA learning relies heavily on static diagrams and abstract trace tables, which fail to convey how pointers, invariants, and partitioned subarrays transition during dynamic program execution. Algox bridges this conceptual gap by delivering mathematically accurate, step-by-step interactive animations coupled with live metric tracking and pseudocode line inspection.
        </p>
      </Card>

      {/* Core Architectural Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Card className="bg-[#151E30] border-[#293449] p-5 flex flex-col gap-2.5">
          <div className="flex items-center gap-2 text-sky-400 font-bold text-sm">
            <Cpu size={16} />
            Pure Snapshot Playback Engine
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Algorithm step generation is strictly separated from React component rendering. Instead of polluting computational algorithms with asynchronous timer delays, algorithm functions return an immutable sequence of typed state snapshots. This guarantees deterministic forward and backward stepping without race conditions.
          </p>
        </Card>

        <Card className="bg-[#151E30] border-[#293449] p-5 flex flex-col gap-2.5">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
            <ShieldCheck size={16} />
            Authentic Algorithm Metrics
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Operation counters (comparisons, swaps, array writes) are gathered directly from genuine algorithmic executions rather than approximated formulas or artificial delays. This demonstrates the actual behavior of different algorithms on identical inputs.
          </p>
        </Card>

        <Card className="bg-[#151E30] border-[#293449] p-5 flex flex-col gap-2.5">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
            <Layers size={16} />
            Strict TypeScript Architecture
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Built using strict TypeScript with zero arbitrary <code className="text-indigo-300">any</code> types. Well-defined domain models govern element states, tree nodes, graph adjacency lists, and playback actions.
          </p>
        </Card>

        <Card className="bg-[#151E30] border-[#293449] p-5 flex flex-col gap-2.5">
          <div className="flex items-center gap-2 text-purple-400 font-bold text-sm">
            <Zap size={16} />
            Native SVG & CSS Rendering
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            All visualizers are implemented natively using SVG and responsive CSS bar/node elements without relying on heavy canvas black-box libraries, ensuring maximum accessibility, crisp vector scaling, and responsiveness.
          </p>
        </Card>
      </div>

      {/* Tech Stack */}
      <Card className="bg-[#151E30] border-[#293449] p-6 flex flex-col gap-4">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <Code2 size={18} className="text-sky-400" />
          Technology Stack
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
          <div className="bg-[#111827] p-3 rounded-lg border border-[#252F44] flex flex-col gap-1">
            <span className="text-slate-400">Framework</span>
            <span className="text-white font-semibold">React 19</span>
          </div>
          <div className="bg-[#111827] p-3 rounded-lg border border-[#252F44] flex flex-col gap-1">
            <span className="text-slate-400">Language</span>
            <span className="text-white font-semibold">TypeScript (Strict)</span>
          </div>
          <div className="bg-[#111827] p-3 rounded-lg border border-[#252F44] flex flex-col gap-1">
            <span className="text-slate-400">Build Tool</span>
            <span className="text-white font-semibold">Vite 8</span>
          </div>
          <div className="bg-[#111827] p-3 rounded-lg border border-[#252F44] flex flex-col gap-1">
            <span className="text-slate-400">Styling</span>
            <span className="text-white font-semibold">Tailwind CSS v4</span>
          </div>
          <div className="bg-[#111827] p-3 rounded-lg border border-[#252F44] flex flex-col gap-1">
            <span className="text-slate-400">Routing</span>
            <span className="text-white font-semibold">React Router 7</span>
          </div>
          <div className="bg-[#111827] p-3 rounded-lg border border-[#252F44] flex flex-col gap-1">
            <span className="text-slate-400">Testing</span>
            <span className="text-white font-semibold">Vitest & RTL</span>
          </div>
        </div>
      </Card>

      {/* Known Limitations & Scope */}
      <Card className="bg-[#151E30] border-[#293449] p-6 flex flex-col gap-3">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <CheckCircle2 size={18} className="text-emerald-400" />
          Technical Scope & Boundaries
        </h2>
        <ul className="space-y-2 text-xs text-slate-300 list-disc list-inside leading-relaxed">
          <li>
            <strong>Array visual constraints:</strong> Visual elements are capped at 40 items for optimal screen rendering and readability.
          </li>
          <li>
            <strong>Deterministic Local Execution:</strong> Designed strictly as an offline-capable client-side technical tool with zero external API dependencies or authentication requirements.
          </li>
          <li>
            <strong>Asymptotic Operation Counts:</strong> Displayed metrics reflect algorithmic comparisons and swaps rather than machine CPU clock execution cycles.
          </li>
        </ul>
      </Card>
    </div>
  )
}
