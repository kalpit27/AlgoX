import React, { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Tabs } from '../../components/ui/Tabs'
import { StackVisualizer } from './StackVisualizer'
import { QueueVisualizer } from './QueueVisualizer'
import { LinkedListVisualizer } from './LinkedListVisualizer'
import { BSTVisualizer } from './BSTVisualizer'
import { Layers, GitCommit, GitFork, ArrowDownUp } from 'lucide-react'

type DSType = 'stack' | 'queue' | 'linked-list' | 'bst'

const DS_TABS: { id: DSType; label: string; icon: React.ReactNode }[] = [
  { id: 'stack', label: 'Stack (LIFO)', icon: <Layers size={14} /> },
  { id: 'queue', label: 'Queue (FIFO)', icon: <ArrowDownUp size={14} /> },
  { id: 'linked-list', label: 'Linked List', icon: <GitCommit size={14} /> },
  { id: 'bst', label: 'Binary Search Tree', icon: <GitFork size={14} /> },
]

export const DataStructuresView: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const currentDS = (searchParams.get('ds') as DSType) || 'stack'

  const [activeDS, setActiveDS] = useState<DSType>(currentDS)

  const handleSelectDS = (ds: DSType) => {
    setActiveDS(ds)
    setSearchParams({ ds })
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="border-b border-[#1E283D] pb-4">
        <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
          Data Structures Playground
          <span className="text-xs px-2 py-0.5 rounded-full font-mono bg-purple-500/15 text-purple-300 border border-purple-500/30 font-medium">
            4 Interactive Structures
          </span>
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Perform real operations (insert, search, traverse, delete) and observe live structural mutations.
        </p>
      </div>

      {/* Tabs */}
      <Tabs items={DS_TABS} activeTab={activeDS} onChange={handleSelectDS} />

      {/* Selected DS Component */}
      {activeDS === 'stack' && <StackVisualizer />}
      {activeDS === 'queue' && <QueueVisualizer />}
      {activeDS === 'linked-list' && <LinkedListVisualizer />}
      {activeDS === 'bst' && <BSTVisualizer />}
    </div>
  )
}
