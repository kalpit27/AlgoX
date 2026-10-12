import React from 'react'
import { Outlet, useLocation, Link } from 'react-router-dom'
import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { ChevronRight, Home } from 'lucide-react'

export const Layout: React.FC = () => {
  const location = useLocation()

  // Generate breadcrumb items
  const pathnames = location.pathname.split('/').filter(Boolean)

  const formatBreadcrumb = (str: string) => {
    return str
      .replace(/-/g, ' ')
      .replace(/\b\w/g, (char) => char.toUpperCase())
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#0B1020] text-[#F3F4F6]">
      <Navbar />

      {/* Breadcrumb row (only on inner routes) */}
      {pathnames.length > 0 && (
        <div className="w-full bg-[#0E1528] border-b border-[#1E283D] py-2 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto flex items-center gap-1.5 text-xs text-slate-400">
            <Link
              to="/"
              className="inline-flex items-center gap-1 hover:text-indigo-400 transition-colors"
            >
              <Home size={13} />
              <span>Home</span>
            </Link>
            {pathnames.map((value, index) => {
              const to = `/${pathnames.slice(0, index + 1).join('/')}`
              const isLast = index === pathnames.length - 1

              return (
                <React.Fragment key={to}>
                  <ChevronRight size={12} className="text-slate-400" />
                  {isLast ? (
                    <span className="text-slate-200 font-medium font-sans">
                      {formatBreadcrumb(value)}
                    </span>
                  ) : (
                    <Link
                      to={to}
                      className="hover:text-indigo-400 transition-colors"
                    >
                      {formatBreadcrumb(value)}
                    </Link>
                  )}
                </React.Fragment>
              )
            })}
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}
