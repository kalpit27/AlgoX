import React, { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { ALGORITHM_CATALOGUE, DSA_GLOSSARY } from '../../data/algorithmsCatalogue'
import { Card } from '../../components/ui/Card'
import { Badge } from '../../components/ui/Badge'
import { Search, ExternalLink, BookOpen, Clock, Table, Info } from 'lucide-react'

type CategoryFilter = 'All' | 'Sorting' | 'Searching' | 'Linear DS' | 'Trees' | 'Graphs'

export const AlgorithmsReferenceView: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('All')

  const categories: CategoryFilter[] = [
    'All',
    'Sorting',
    'Searching',
    'Linear DS',
    'Trees',
    'Graphs',
  ]

  const filteredItems = useMemo(() => {
    return ALGORITHM_CATALOGUE.filter((item) => {
      const matchesCategory =
        selectedCategory === 'All' || item.category === selectedCategory
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.keyConcepts.some((c) => c.toLowerCase().includes(searchQuery.toLowerCase()))
      return matchesCategory && matchesSearch
    })
  }, [selectedCategory, searchQuery])

  return (
    <div className="flex flex-col gap-8">
      {/* Page Header */}
      <div className="border-b border-[#1E283D] pb-5">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
          Algorithm & Data Structure Reference
          <span className="text-xs px-2.5 py-0.5 rounded-full font-mono bg-indigo-500/15 text-indigo-300 border border-indigo-500/30 font-medium">
            14 Topics
          </span>
        </h1>
        <p className="text-sm text-slate-400 mt-1 max-w-2xl leading-relaxed">
          Comprehensive technical reference cataloguing time & space bounds, algorithmic invariants, and implementation trade-offs for technical placements.
        </p>
      </div>

      {/* Search & Category Filter Toolbar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-[#151E30] p-4 rounded-xl border border-[#293449]">
        {/* Search input */}
        <div className="relative flex-1 max-w-md">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search algorithms, concepts, or terms..."
            className="w-full bg-[#111827] border border-[#252F44] rounded-lg pl-9 pr-4 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-[#111827] text-slate-400 hover:text-white border border-[#252F44]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Algorithm Catalogue Cards Grid */}
      <div className="flex flex-col gap-3">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <BookOpen size={18} className="text-sky-400" />
          Supported Algorithms & Structures ({filteredItems.length})
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredItems.map((item) => (
            <Card
              key={item.id}
              className="flex flex-col justify-between hover:border-indigo-500/50 transition-colors bg-[#151E30] border-[#293449]"
            >
              <div className="flex flex-col gap-3">
                {/* Title & Category */}
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-base font-bold text-white tracking-tight">
                    {item.name}
                  </h3>
                  <Badge variant="cyan" size="xs">
                    {item.category}
                  </Badge>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {item.description}
                </p>

                {/* Complexities Table */}
                <div className="grid grid-cols-3 gap-1.5 bg-[#111827] p-2 rounded-lg border border-[#252F44] text-[11px] font-mono">
                  <div className="flex flex-col">
                    <span className="text-[9px] uppercase tracking-wider text-slate-400">
                      Best
                    </span>
                    <span className="text-emerald-400 font-bold">{item.timeBest}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[9px] uppercase tracking-wider text-slate-400">
                      Avg
                    </span>
                    <span className="text-amber-400 font-bold">{item.timeAverage}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[9px] uppercase tracking-wider text-slate-400">
                      Space
                    </span>
                    <span className="text-sky-400 font-bold">{item.spaceComplexity}</span>
                  </div>
                </div>

                {/* Key Concepts */}
                <div className="flex flex-wrap gap-1 mt-1">
                  {item.keyConcepts.map((concept, i) => (
                    <span
                      key={i}
                      className="text-[10px] px-2 py-0.5 rounded bg-[#111827] text-slate-300 border border-[#222E46]"
                    >
                      {concept}
                    </span>
                  ))}
                </div>

                {/* Practical note */}
                <div className="text-[11px] text-slate-400 border-t border-[#1F293D] pt-2">
                  <span className="text-slate-300 font-medium">When to use: </span>
                  {item.whenToUse}
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4 mt-2">
                <Link
                  to={item.path}
                  className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 transition-colors"
                >
                  <span>Launch Visualizer</span>
                  <ExternalLink size={13} />
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Asymptotic Notation Educational Section */}
      <Card className="bg-[#151E30] border-[#293449] p-6 flex flex-col gap-4">
        <h2 className="text-lg font-bold text-white flex items-center gap-2 border-b border-[#293449] pb-3">
          <Clock size={18} className="text-amber-400" />
          Asymptotic Analysis Foundations (Big-O, Big-Ω, Big-Θ)
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-[#111827] p-4 rounded-xl border border-[#252F44] flex flex-col gap-2">
            <span className="text-sm font-mono font-bold text-rose-400">
              Big-O (O) — Asymptotic Upper Bound
            </span>
            <p className="text-xs text-slate-300 leading-relaxed">
              f(n) = O(g(n)) implies that f(n) does not grow faster than g(n) beyond some threshold n₀. It describes worst-case running time guarantee, ensuring runtime will never exceed this ceiling.
            </p>
          </div>

          <div className="bg-[#111827] p-4 rounded-xl border border-[#252F44] flex flex-col gap-2">
            <span className="text-sm font-mono font-bold text-emerald-400">
              Big-Omega (Ω) — Asymptotic Lower Bound
            </span>
            <p className="text-xs text-slate-300 leading-relaxed">
              f(n) = Ω(g(n)) implies that f(n) grows at least as fast as g(n). It represents the best-case execution time under the most favorable input distributions.
            </p>
          </div>

          <div className="bg-[#111827] p-4 rounded-xl border border-[#252F44] flex flex-col gap-2">
            <span className="text-sm font-mono font-bold text-indigo-400">
              Big-Theta (Θ) — Asymptotically Tight Bound
            </span>
            <p className="text-xs text-slate-300 leading-relaxed">
              f(n) = Θ(g(n)) holds when f(n) is bounded both above and below by g(n). The algorithm's growth rate is tightly sandwiched between constant multiples of g(n).
            </p>
          </div>
        </div>
      </Card>

      {/* Big-O Comparison Reference Table */}
      <Card className="bg-[#151E30] border-[#293449] p-6 flex flex-col gap-4">
        <h2 className="text-lg font-bold text-white flex items-center gap-2 border-b border-[#293449] pb-3">
          <Table size={18} className="text-sky-400" />
          Big-O Complexity Master Reference
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left text-slate-300">
            <thead className="text-[11px] uppercase tracking-wider text-slate-400 bg-[#0E1528] border-b border-[#252F44]">
              <tr>
                <th className="py-3 px-4">Algorithm / Structure</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Best Time</th>
                <th className="py-3 px-4">Average Time</th>
                <th className="py-3 px-4">Worst Time</th>
                <th className="py-3 px-4">Aux Space</th>
                <th className="py-3 px-4">Stability</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1F293D] font-mono">
              {ALGORITHM_CATALOGUE.map((item) => (
                <tr key={item.id} className="hover:bg-white/5 transition-colors">
                  <td className="py-2.5 px-4 font-sans font-semibold text-white">
                    {item.name}
                  </td>
                  <td className="py-2.5 px-4 text-slate-400 font-sans">
                    {item.category}
                  </td>
                  <td className="py-2.5 px-4 text-emerald-400 font-bold">
                    {item.timeBest}
                  </td>
                  <td className="py-2.5 px-4 text-amber-400 font-bold">
                    {item.timeAverage}
                  </td>
                  <td className="py-2.5 px-4 text-rose-400 font-bold">
                    {item.timeWorst}
                  </td>
                  <td className="py-2.5 px-4 text-sky-400 font-bold">
                    {item.spaceComplexity}
                  </td>
                  <td className="py-2.5 px-4 font-sans text-slate-300">
                    {item.stable !== undefined ? (item.stable ? 'Yes' : 'No') : '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* DSA Glossary */}
      <Card className="bg-[#151E30] border-[#293449] p-6 flex flex-col gap-4">
        <h2 className="text-lg font-bold text-white flex items-center gap-2 border-b border-[#293449] pb-3">
          <Info size={18} className="text-purple-400" />
          DSA Terminology Glossary
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {DSA_GLOSSARY.map((entry, idx) => (
            <div
              key={idx}
              className="bg-[#111827] p-3.5 rounded-lg border border-[#252F44] flex flex-col gap-1"
            >
              <span className="text-xs font-bold text-indigo-300 font-sans">
                {entry.term}
              </span>
              <p className="text-xs text-slate-400 leading-relaxed">
                {entry.definition}
              </p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
