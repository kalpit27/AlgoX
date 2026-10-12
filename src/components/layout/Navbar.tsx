import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  BarChart2,
  Search,
  Layers,
  Share2,
  BookOpen,
  Info,
  Menu,
  X,
  Sparkles,
} from 'lucide-react'

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()

  const navLinks = [
    { name: 'Sorting', path: '/visualizer/sorting', icon: <BarChart2 size={16} /> },
    { name: 'Searching', path: '/visualizer/searching', icon: <Search size={16} /> },
    { name: 'Data Structures', path: '/visualizer/data-structures', icon: <Layers size={16} /> },
    { name: 'Graph', path: '/visualizer/graph', icon: <Share2 size={16} /> },
    { name: 'Catalogue', path: '/algorithms', icon: <BookOpen size={16} /> },
    { name: 'About', path: '/about', icon: <Info size={16} /> },
  ]

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true
    if (path !== '/' && location.pathname.startsWith(path)) return true
    return false
  }

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0B1020]/90 backdrop-blur-md border-b border-[#293449]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <Link
            to="/"
            className="flex items-center gap-3 group focus:outline-none"
            aria-label="Algox Home"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-sky-400 p-0.5 shadow-md shadow-indigo-600/30 flex items-center justify-center group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-[#0B1020] rounded-[10px] flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-sky-400"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="6" cy="6" r="2.5" fill="#6366F1" stroke="none" />
                  <circle cx="18" cy="6" r="2.5" fill="#38BDF8" stroke="none" />
                  <circle cx="12" cy="18" r="2.5" fill="#F43F5E" stroke="none" />
                  <line x1="6" y1="6" x2="12" y2="18" stroke="#6366F1" />
                  <line x1="18" y1="6" x2="12" y2="18" stroke="#38BDF8" />
                  <line x1="6" y1="6" x2="18" y2="6" stroke="#818CF8" strokeDasharray="2 2" />
                </svg>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight text-white flex items-center gap-1.5 font-sans">
                Algox
                <span className="text-[10px] px-1.5 py-0.2 rounded font-mono font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  DSA
                </span>
              </span>
              <span className="text-[11px] text-slate-400 hidden sm:inline -mt-1 font-normal">
                Algorithms in Motion.
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const active = isActive(link.path)
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    active
                      ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30'
                      : 'text-slate-300 hover:text-white hover:bg-white/5 border border-transparent'
                  }`}
                >
                  {link.icon}
                  <span>{link.name}</span>
                </Link>
              )
            })}
          </nav>

          {/* Action Button & Mobile Toggle */}
          <div className="flex items-center gap-3">
            <Link
              to="/visualizer/sorting"
              className="hidden lg:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-sm shadow-indigo-600/30 transition-all active:scale-95"
            >
              <Sparkles size={14} />
              <span>Start Visualizing</span>
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#293449] bg-[#111827] px-4 pt-2 pb-4 space-y-1 animate-in slide-in-from-top-4 duration-150">
          {navLinks.map((link) => {
            const active = isActive(link.path)
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium ${
                  active
                    ? 'bg-indigo-600 text-white'
                    : 'text-slate-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                {link.icon}
                <span>{link.name}</span>
              </Link>
            )
          })}
          <div className="pt-2">
            <Link
              to="/visualizer/sorting"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold bg-indigo-600 text-white"
            >
              <Sparkles size={14} />
              <span>Start Visualizing</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
