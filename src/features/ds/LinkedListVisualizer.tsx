import React, { useState } from 'react'
import { Card } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { Badge } from '../../components/ui/Badge'
import {
  LLNode,
  createLLNode,
  insertAtHead,
  insertAtTail,
  insertAtIndex,
  deleteByValue,
  deleteAtIndex,
  searchLinkedList,
} from '../../algorithms/datastructures/linkedListModel'
import { ArrowRight, AlertCircle, Plus, Trash2, Search, Play } from 'lucide-react'

export const LinkedListVisualizer: React.FC = () => {
  const [list, setList] = useState<LLNode[]>([
    createLLNode(12),
    createLLNode(28),
    createLLNode(45),
    createLLNode(70),
  ])

  const [valueInput, setValueInput] = useState<string>('99')
  const [indexInput, setIndexInput] = useState<string>('0')
  const [searchTarget, setSearchTarget] = useState<string>('28')
  const [highlightedNodeIds, setHighlightedNodeIds] = useState<Set<string>>(new Set())
  const [targetFoundId, setTargetFoundId] = useState<string | null>(null)
  const [isTraversing, setIsTraversing] = useState(false)
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' | 'info' }>({
    text: 'Singly Linked List initialized with 4 nodes.',
    type: 'info',
  })

  const resetHighlights = () => {
    setHighlightedNodeIds(new Set())
    setTargetFoundId(null)
  }

  const handleInsertHead = () => {
    resetHighlights()
    const val = Number(valueInput)
    if (isNaN(val)) return
    const updated = insertAtHead(list, val)
    setList(updated)
    setHighlightedNodeIds(new Set([updated[0].id]))
    setMessage({ text: `Inserted ${val} at the head (index 0).`, type: 'success' })
    setTimeout(resetHighlights, 1200)
  }

  const handleInsertTail = () => {
    resetHighlights()
    const val = Number(valueInput)
    if (isNaN(val)) return
    const updated = insertAtTail(list, val)
    setList(updated)
    setHighlightedNodeIds(new Set([updated[updated.length - 1].id]))
    setMessage({ text: `Inserted ${val} at the tail (index ${updated.length - 1}).`, type: 'success' })
    setTimeout(resetHighlights, 1200)
  }

  const handleInsertAtIndex = () => {
    resetHighlights()
    const val = Number(valueInput)
    const idx = Number(indexInput)
    if (isNaN(val) || isNaN(idx)) return
    const res = insertAtIndex(list, idx, val)
    if (!res.success) {
      setMessage({ text: res.error || 'Failed to insert.', type: 'error' })
      return
    }
    setList(res.list)
    setHighlightedNodeIds(new Set([res.list[idx].id]))
    setMessage({ text: `Inserted ${val} at position ${idx}.`, type: 'success' })
    setTimeout(resetHighlights, 1200)
  }

  const handleDeleteValue = () => {
    resetHighlights()
    const val = Number(valueInput)
    if (isNaN(val)) return
    const res = deleteByValue(list, val)
    if (!res.success) {
      setMessage({ text: res.error || 'Value not found.', type: 'error' })
      return
    }
    setList(res.list)
    setMessage({ text: `Deleted node containing value ${val}.`, type: 'success' })
  }

  const handleDeleteAtIndex = () => {
    resetHighlights()
    const idx = Number(indexInput)
    if (isNaN(idx)) return
    const res = deleteAtIndex(list, idx)
    if (!res.success) {
      setMessage({ text: res.error || 'Index out of bounds.', type: 'error' })
      return
    }
    setList(res.list)
    setMessage({ text: `Deleted node at index ${idx} (value ${res.deletedValue}).`, type: 'success' })
  }

  const handleSearch = () => {
    resetHighlights()
    const target = Number(searchTarget)
    if (isNaN(target)) return
    const { pathNodeIds, foundIndex } = searchLinkedList(list, target)

    if (foundIndex === null) {
      // Highlight all visited then clear
      setHighlightedNodeIds(new Set(pathNodeIds))
      setMessage({ text: `Search for ${target}: Not found in linked list.`, type: 'error' })
      setTimeout(resetHighlights, 1500)
    } else {
      const matchNodeId = list[foundIndex].id
      setHighlightedNodeIds(new Set(pathNodeIds.filter((id) => id !== matchNodeId)))
      setTargetFoundId(matchNodeId)
      setMessage({ text: `Search for ${target}: Found at index ${foundIndex}!`, type: 'success' })
      setTimeout(resetHighlights, 2000)
    }
  }

  const handleTraverse = () => {
    if (list.length === 0 || isTraversing) return
    setIsTraversing(true)
    resetHighlights()
    setMessage({ text: 'Traversing linked list from head to tail...', type: 'info' })

    list.forEach((node, i) => {
      setTimeout(() => {
        setHighlightedNodeIds(new Set([node.id]))
        if (i === list.length - 1) {
          setTimeout(() => {
            resetHighlights()
            setIsTraversing(false)
            setMessage({ text: `Traversal complete. Visited ${list.length} nodes.`, type: 'success' })
          }, 600)
        }
      }, i * 400)
    })
  }

  const handleClear = () => {
    setList([])
    resetHighlights()
    setMessage({ text: 'Linked list cleared.', type: 'info' })
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Control Panel */}
      <Card className="flex flex-col gap-4">
        <div className="border-b border-[#293449] pb-3">
          <h3 className="text-base font-bold text-white">Linked List Controls</h3>
          <p className="text-xs text-slate-400">
            Dynamic node and pointer link mutations
          </p>
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-2 gap-2">
          <div className="flex flex-col gap-1">
            <label htmlFor="ll-node-value-input" className="text-xs font-semibold text-slate-300">Node Value:</label>
            <input
              id="ll-node-value-input"
              type="number"
              value={valueInput}
              onChange={(e) => setValueInput(e.target.value)}
              className="bg-[#111827] border border-[#252F44] rounded-lg px-2.5 py-1.5 text-sm text-white font-mono focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="ll-target-index-input" className="text-xs font-semibold text-slate-300">Target Index:</label>
            <input
              id="ll-target-index-input"
              type="number"
              value={indexInput}
              onChange={(e) => setIndexInput(e.target.value)}
              className="bg-[#111827] border border-[#252F44] rounded-lg px-2.5 py-1.5 text-sm text-white font-mono focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Insertion Actions */}
        <div className="flex flex-col gap-1.5">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Insert Operations
          </span>
          <div className="flex flex-wrap gap-1.5">
            <Button variant="secondary" size="xs" onClick={handleInsertHead} icon={<Plus size={12} />}>
              Insert Head
            </Button>
            <Button variant="secondary" size="xs" onClick={handleInsertTail} icon={<Plus size={12} />}>
              Insert Tail
            </Button>
            <Button variant="outline" size="xs" onClick={handleInsertAtIndex} icon={<Plus size={12} />}>
              Insert at Index
            </Button>
          </div>
        </div>

        {/* Deletion Actions */}
        <div className="flex flex-col gap-1.5 pt-2 border-t border-[#1E283D]">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Delete Operations
          </span>
          <div className="flex flex-wrap gap-1.5">
            <Button variant="outline" size="xs" onClick={handleDeleteValue}>
              Delete Value
            </Button>
            <Button variant="outline" size="xs" onClick={handleDeleteAtIndex}>
              Delete at Index
            </Button>
          </div>
        </div>

        {/* Search & Traversal */}
        <div className="flex flex-col gap-2 pt-2 border-t border-[#1E283D]">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Search & Traversal
          </span>
          <div className="flex gap-2">
            <input
              type="number"
              value={searchTarget}
              onChange={(e) => setSearchTarget(e.target.value)}
              placeholder="Target"
              className="w-20 bg-[#111827] border border-[#252F44] rounded-lg px-2.5 py-1 text-sm text-white font-mono focus:outline-none focus:border-indigo-500"
            />
            <Button variant="primary" size="xs" onClick={handleSearch} icon={<Search size={12} />}>
              Search
            </Button>
            <Button
              variant="outline"
              size="xs"
              onClick={handleTraverse}
              disabled={isTraversing}
              icon={<Play size={12} />}
            >
              Traverse
            </Button>
          </div>
        </div>

        <div className="pt-2 border-t border-[#1E283D]">
          <Button variant="danger" size="xs" onClick={handleClear} icon={<Trash2 size={12} />}>
            Clear List
          </Button>
        </div>

        {/* Message Banner */}
        <div
          className={`p-3 rounded-lg border text-xs flex items-center gap-2 mt-auto ${
            message.type === 'error'
              ? 'bg-rose-500/10 border-rose-500/30 text-rose-300'
              : message.type === 'success'
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
              : 'bg-indigo-500/10 border-indigo-500/30 text-indigo-300'
          }`}
        >
          <AlertCircle size={15} className="shrink-0" />
          <span>{message.text}</span>
        </div>
      </Card>

      {/* Linked List Canvas */}
      <Card className="lg:col-span-2 flex flex-col justify-between p-6 min-h-[380px] bg-[#151E30] border-[#293449]">
        <div className="w-full flex items-center justify-between border-b border-[#293449] pb-3 mb-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-white">Singly Linked Structure</span>
            <Badge variant="indigo" size="xs">
              Length: {list.length}
            </Badge>
          </div>
          <Badge variant={list.length === 0 ? 'amber' : 'emerald'} size="xs">
            {list.length === 0 ? 'NULL HEAD' : 'Connected'}
          </Badge>
        </div>

        {/* Nodes and Pointers Row */}
        <div className="flex-1 flex items-center justify-start overflow-x-auto p-4 min-h-[160px] bg-[#0E1528] rounded-xl border border-[#222E46]">
          {list.length === 0 ? (
            <div className="flex items-center justify-center w-full text-slate-400 text-xs">
              HEAD → <span className="font-mono text-rose-400 ml-1">NULL</span> (Empty list)
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-sky-400 mr-1 select-none">
                HEAD →
              </span>

              {list.map((node, index) => {
                const isHighlighted = highlightedNodeIds.has(node.id)
                const isFound = targetFoundId === node.id

                return (
                  <React.Fragment key={node.id}>
                    {/* Node Container (Data + Next Pointer Compartments) */}
                    <div
                      className={`flex rounded-xl border transition-all duration-200 select-none shadow-md ${
                        isFound
                          ? 'bg-emerald-500/30 border-emerald-400 text-emerald-200 ring-2 ring-emerald-400 scale-105'
                          : isHighlighted
                          ? 'bg-amber-500/30 border-amber-400 text-amber-200 ring-2 ring-amber-400 scale-105'
                          : 'bg-[#151E30] border-[#293449] text-white'
                      }`}
                    >
                      {/* Data compartment */}
                      <div className="px-3.5 py-3 flex flex-col items-center justify-center border-r border-[#293449]">
                        <span className="text-[9px] text-slate-400 font-mono">val</span>
                        <span className="text-base font-bold font-mono">{node.value}</span>
                        <span className="text-[8px] text-slate-400 font-mono mt-0.5">
                          idx: {index}
                        </span>
                      </div>

                      {/* Next pointer compartment */}
                      <div className="px-2 py-3 flex flex-col items-center justify-center bg-black/20">
                        <span className="text-[9px] text-slate-400 font-mono">next</span>
                        <span className="text-xs font-mono text-indigo-400 font-bold">•</span>
                      </div>
                    </div>

                    {/* Directional arrow */}
                    {index < list.length - 1 ? (
                      <ArrowRight size={18} className="text-indigo-400 shrink-0 select-none" />
                    ) : (
                      <div className="flex items-center gap-1">
                        <ArrowRight size={18} className="text-slate-400 shrink-0 select-none" />
                        <span className="text-xs font-mono font-bold text-rose-400 px-1.5 py-0.5 rounded bg-rose-500/10 border border-rose-500/20 select-none">
                          NULL
                        </span>
                      </div>
                    )}
                  </React.Fragment>
                )
              })}
            </div>
          )}
        </div>

        <div className="text-[11px] text-slate-400 mt-3 flex justify-between items-center">
          <span>Search policy: Inspects left-to-right, terminating at the first matching element.</span>
          <span>O(1) Head Insert • O(n) Positional Access</span>
        </div>
      </Card>
    </div>
  )
}
