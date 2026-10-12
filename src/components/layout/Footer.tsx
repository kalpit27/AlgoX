import React from 'react'
import { Link } from 'react-router-dom'
import { Code2 } from 'lucide-react'

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#0B1020] border-t border-[#293449] py-10 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand info */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-base font-bold text-white">Algox</span>
              <span className="text-xs px-2 py-0.5 rounded font-mono bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                v1.0.0
              </span>
            </div>
            <p className="text-sm font-medium text-slate-300">
              Algorithms in Motion.
            </p>
            <p className="text-xs text-slate-400 max-w-md leading-relaxed">
              Understand the logic. Visualize the process. An interactive developer platform designed to master Data Structures and Algorithms with step-by-step playback, real execution metrics, and mathematical accuracy.
            </p>
          </div>

          {/* Quick Visualizers */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-300">
              Visualizers
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link to="/visualizer/sorting" className="hover:text-indigo-400 transition-colors">
                  Sorting Algorithms (6 Modes)
                </Link>
              </li>
              <li>
                <Link to="/visualizer/searching" className="hover:text-indigo-400 transition-colors">
                  Searching (Linear & Binary)
                </Link>
              </li>
              <li>
                <Link to="/visualizer/data-structures" className="hover:text-indigo-400 transition-colors">
                  Data Structures Playground
                </Link>
              </li>
              <li>
                <Link to="/visualizer/graph" className="hover:text-indigo-400 transition-colors">
                  Graph Traversal (BFS & DFS)
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-300">
              Resources
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link to="/algorithms" className="hover:text-indigo-400 transition-colors">
                  Complexity Cheat Sheet
                </Link>
              </li>
              <li>
                <Link to="/algorithms" className="hover:text-indigo-400 transition-colors">
                  Big-O & DSA Glossary
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-indigo-400 transition-colors">
                  Architecture & Design
                </Link>
              </li>
              <li className="flex items-center gap-1.5 text-slate-400 pt-1">
                <Code2 size={13} className="text-emerald-400" />
                <span>React + TypeScript + Vite</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-[#1C263B] flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© {new Date().getFullYear()} Algox™ by Kalpit. All algorithms implemented natively.</p>
          <p className="flex items-center gap-1">
            Deterministic step snapshots • Zero external algorithm dependencies
          </p>
        </div>
      </div>
    </footer>
  )
}
