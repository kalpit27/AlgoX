import React from 'react'

export interface TabItem<T extends string> {
  id: T
  label: string
  icon?: React.ReactNode
  badge?: string
}

export interface TabsProps<T extends string> {
  items: TabItem<T>[]
  activeTab: T
  onChange: (tabId: T) => void
  size?: 'sm' | 'md'
  className?: string
}

export function Tabs<T extends string>({
  items,
  activeTab,
  onChange,
  size = 'md',
  className = '',
}: TabsProps<T>) {
  const paddingClasses = size === 'sm' ? 'px-3 py-1.5 text-xs' : 'px-4 py-2 text-sm'

  return (
    <div className={`flex flex-wrap items-center gap-1.5 p-1 bg-[#111827] border border-[#252F44] rounded-xl ${className}`}>
      {items.map((tab) => {
        const isActive = tab.id === activeTab
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`inline-flex items-center gap-2 font-medium rounded-lg transition-all duration-150 cursor-pointer ${paddingClasses} ${
              isActive
                ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
            }`}
          >
            {tab.icon && <span>{tab.icon}</span>}
            <span>{tab.label}</span>
            {tab.badge && (
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                  isActive ? 'bg-indigo-800 text-indigo-200' : 'bg-slate-800 text-slate-400'
                }`}
              >
                {tab.badge}
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}
