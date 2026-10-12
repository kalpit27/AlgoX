import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ALGORITHM_CATALOGUE } from '../../data/algorithmsCatalogue'
import { Card } from '../../components/ui/Card'
import { Badge } from '../../components/ui/Badge'
import {
  BarChart2,
  Search,
  Layers,
  Share2,
  BookOpen,
  ArrowRight,
  Sparkles,
  Zap,
  CheckCircle,
} from 'lucide-react'

export const HomeView: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('')

  const modules = [
    {
      title: 'Sorting Algorithms',
      description: 'Bubble, Selection, Insertion, Merge, Quick, and Heap sort with comparison mode.',
      path: '/visualizer/sorting',
      icon: <BarChart2 size={24} className="text-indigo-400" />,
      badge: '6 Algorithms',
      accent: 'border-indigo-500/30 hover:border-indigo-500/60',
    },
    {
      title: 'Searching Algorithms',
      description: 'Linear and Binary Search with range boundaries and search space halving.',
      path: '/visualizer/searching',
      icon: <Search size={24} className="text-sky-400" />,
      badge: '2 Modes',
      accent: 'border-sky-500/30 hover:border-sky-500/60',
    },
    {
      title: 'Data Structures Playground',
      description: 'Interactive Stack, Queue, Singly Linked List, and Binary Search Tree with real mutations.',
      path: '/visualizer/data-structures',
      icon: <Layers size={24} className="text-purple-400" />,
      badge: '4 Structures',
      accent: 'border-purple-500/30 hover:border-purple-500/60',
    },
    {
      title: 'Graph Traversal',
      description: 'Breadth-First Search & Depth-First Search with live FIFO queue and LIFO stack frontier.',
      path: '/visualizer/graph',
      icon: <Share2 size={24} className="text-emerald-400" />,
      badge: 'BFS & DFS',
      accent: 'border-emerald-500/30 hover:border-emerald-500/60',
    },
  ]

  const filteredCatalogue = ALGORITHM_CATALOGUE.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
  ).slice(0, 6)

  return (
    <div className="flex flex-col gap-12 py-4">
      {/* Hero Section */}
      <div className="relative rounded-2xl bg-gradient-to-br from-[#121A2E] via-[#0E1528] to-[#0B1020] border border-[#232F46] p-8 sm:p-12 overflow-hidden shadow-2xl">
        {/* Subtle background glow effect */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-sky-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl flex flex-col items-start gap-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/15 text-indigo-300 text-xs font-mono font-medium border border-indigo-500/30">
            <Sparkles size={13} className="text-indigo-400" />
            <span>Algox • Algorithms in Motion.</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Understand the logic.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-sky-300 to-indigo-200">
              Visualize the process.
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
            A developer-grade platform created by Kalpit. Explore step-by-step state snapshots, compare algorithmic invariants, and master time & space complexities.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              to="/visualizer/sorting"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Start Visualizing</span>
              <ArrowRight size={16} />
            </Link>

            <Link
              to="/algorithms"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm bg-[#151E30] hover:bg-[#1E293B] text-slate-200 border border-[#293449] transition-all"
            >
              <BookOpen size={16} className="text-sky-400" />
              <span>Complexity Reference</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Interactive Category Cards */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white tracking-tight">
            Interactive Visualizer Modules
          </h2>
          <span className="text-xs text-slate-400">
            Natively rendered with deterministic execution
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {modules.map((m) => (
            <Link
              key={m.title}
              to={m.path}
              className="group focus:outline-none"
            >
              <Card
                className={`h-full flex flex-col justify-between p-6 bg-[#151E30] transition-all duration-200 group-hover:scale-[1.01] ${m.accent}`}
              >
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <div className="p-2.5 rounded-xl bg-[#0B1020] border border-[#252F44] group-hover:border-indigo-500/40 transition-colors">
                      {m.icon}
                    </div>
                    <Badge variant="cyan" size="xs">
                      {m.badge}
                    </Badge>
                  </div>
                  <h3 className="text-base font-bold text-white group-hover:text-indigo-300 transition-colors">
                    {m.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {m.description}
                  </p>
                </div>

                <div className="pt-4 flex items-center gap-1.5 text-xs font-semibold text-indigo-400 group-hover:text-indigo-300 transition-colors">
                  <span>Explore Module</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Quick Launch & Searchable Catalogue Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Searchable Algorithm Catalogue (2 Cols) */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <BookOpen size={18} className="text-sky-400" />
              Algorithm Quick Finder
            </h2>
            <Link
              to="/algorithms"
              className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors font-medium flex items-center gap-1"
            >
              View Full Cheat Sheet <ArrowRight size={12} />
            </Link>
          </div>

          <Card className="bg-[#151E30] border-[#293449] p-4 flex flex-col gap-4">
            <div className="relative">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter algorithms by name or concept (e.g. Quick Sort, BFS, Invariant)..."
                className="w-full bg-[#111827] border border-[#252F44] rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {filteredCatalogue.map((item) => (
                <Link
                  key={item.id}
                  to={item.path}
                  className="bg-[#111827] p-3 rounded-lg border border-[#252F44] hover:border-indigo-500/40 transition-colors flex flex-col justify-between gap-2 group"
                >
                  <div className="flex items-start justify-between gap-1">
                    <span className="text-xs font-bold text-white group-hover:text-indigo-300">
                      {item.name}
                    </span>
                    <Badge variant="indigo" size="xs">
                      {item.timeAverage}
                    </Badge>
                  </div>
                  <p className="text-[11px] text-slate-400 line-clamp-2">
                    {item.description}
                  </p>
                </Link>
              ))}
            </div>
          </Card>
        </div>

        {/* Recently Used & Educational Principles (1 Col) */}
        <div className="flex flex-col gap-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Zap size={18} className="text-amber-400" />
            Recently Inspected
          </h2>

          <Card className="bg-[#151E30] border-[#293449] p-4 flex flex-col gap-3">
            <span className="text-xs text-slate-400">
              Quick access shortcuts preserved locally in your browser:
            </span>

            <div className="flex flex-col gap-2">
              <Link
                to="/visualizer/sorting?algo=quick"
                className="p-2.5 rounded-lg bg-[#111827] hover:bg-[#1A243B] border border-[#252F44] text-xs font-medium text-slate-200 flex items-center justify-between"
              >
                <span>Quick Sort Partitioning</span>
                <Badge variant="cyan" size="xs">
                  O(n log n)
                </Badge>
              </Link>
              <Link
                to="/visualizer/searching?algo=binary"
                className="p-2.5 rounded-lg bg-[#111827] hover:bg-[#1A243B] border border-[#252F44] text-xs font-medium text-slate-200 flex items-center justify-between"
              >
                <span>Binary Search Interval Halving</span>
                <Badge variant="cyan" size="xs">
                  O(log n)
                </Badge>
              </Link>
              <Link
                to="/visualizer/data-structures?ds=bst"
                className="p-2.5 rounded-lg bg-[#111827] hover:bg-[#1A243B] border border-[#252F44] text-xs font-medium text-slate-200 flex items-center justify-between"
              >
                <span>Binary Search Tree Mutations</span>
                <Badge variant="cyan" size="xs">
                  Hierarchical
                </Badge>
              </Link>
            </div>
          </Card>

          {/* Educational Callout */}
          <Card className="bg-[#151E30] border-[#293449] p-4 flex flex-col gap-2.5">
            <span className="text-xs font-bold text-emerald-300 flex items-center gap-1.5 uppercase tracking-wider">
              <CheckCircle size={14} className="text-emerald-400" />
              How Algox Execution Works
            </span>
            <p className="text-xs text-slate-400 leading-relaxed">
              Every algorithm pre-generates an immutable stream of step snapshots with verified comparison counts and pointers. You can step forward, step backward, and pause at any moment to study exact states.
            </p>
          </Card>
        </div>
      </div>
    </div>
  )
}
