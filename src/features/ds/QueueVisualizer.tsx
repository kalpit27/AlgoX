import React, { useState } from 'react'
import { Card } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { Badge } from '../../components/ui/Badge'
import { ArrowRight, AlertCircle, Trash2, Eye } from 'lucide-react'

export interface QueueItem {
  id: string
  value: number
  isHighlighted?: boolean
}

export const QueueVisualizer: React.FC = () => {
  const [queue, setQueue] = useState<QueueItem[]>([
    { id: '1', value: 14 },
    { id: '2', value: 38 },
    { id: '3', value: 65 },
  ])
  const [inputValue, setInputValue] = useState<string>('72')
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' | 'info' }>({
    text: 'Queue initialized with 3 elements.',
    type: 'info',
  })

  const MAX_CAPACITY = 8

  const handleEnqueue = () => {
    const val = Number(inputValue)
    if (isNaN(val) || !Number.isInteger(val)) {
      setMessage({ text: 'Please enter a valid integer to enqueue.', type: 'error' })
      return
    }
    if (queue.length >= MAX_CAPACITY) {
      setMessage({
        text: `Queue Overflow: Capacity limit (${MAX_CAPACITY}) reached for visual clarity.`,
        type: 'error',
      })
      return
    }

    const newItem: QueueItem = {
      id: `${Date.now()}`,
      value: val,
      isHighlighted: true,
    }

    setQueue([...queue, newItem])
    setMessage({ text: `Enqueued ${val} at the rear of the queue.`, type: 'success' })
    setInputValue(String(Math.floor(Math.random() * 90) + 10))

    setTimeout(() => {
      setQueue((prev) => prev.map((item) => ({ ...item, isHighlighted: false })))
    }, 1200)
  }

  const handleDequeue = () => {
    if (queue.length === 0) {
      setMessage({ text: 'Queue Underflow: Cannot dequeue from an empty queue.', type: 'error' })
      return
    }
    const [dequeued, ...rest] = queue
    setQueue(rest)
    setMessage({
      text: `Dequeued front element ${dequeued.value} from queue.`,
      type: 'success',
    })
  }

  const handlePeek = () => {
    if (queue.length === 0) {
      setMessage({ text: 'Queue is empty. No front element to inspect.', type: 'error' })
      return
    }
    const frontVal = queue[0].value
    setQueue((prev) =>
      prev.map((item, idx) => (idx === 0 ? { ...item, isHighlighted: true } : item))
    )
    setMessage({
      text: `Front / Peek: Front element is ${frontVal}.`,
      type: 'info',
    })

    setTimeout(() => {
      setQueue((prev) => prev.map((item) => ({ ...item, isHighlighted: false })))
    }, 1500)
  }

  const handleClear = () => {
    setQueue([])
    setMessage({ text: 'Queue cleared.', type: 'info' })
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Controls & Operations */}
      <Card className="flex flex-col gap-4">
        <div className="border-b border-[#293449] pb-3">
          <h3 className="text-base font-bold text-white">Queue Controls</h3>
          <p className="text-xs text-slate-400">
            FIFO (First-In, First-Out) operations
          </p>
        </div>

        {/* Input & Enqueue */}
        <div className="flex flex-col gap-2">
          <label htmlFor="queue-enqueue-input" className="text-xs font-semibold text-slate-300">New Value to Enqueue:</label>
          <div className="flex gap-2">
            <input
              id="queue-enqueue-input"
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="flex-1 bg-[#111827] border border-[#252F44] rounded-lg px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-indigo-500"
              placeholder="e.g. 72"
            />
            <Button
              variant="primary"
              size="sm"
              onClick={handleEnqueue}
              icon={<ArrowRight size={14} />}
            >
              Enqueue
            </Button>
          </div>
        </div>

        {/* Other Operations */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-[#1E283D]">
          <Button variant="secondary" size="sm" onClick={handleDequeue}>
            Dequeue (Remove Front)
          </Button>
          <Button variant="outline" size="sm" onClick={handlePeek} icon={<Eye size={14} />}>
            Peek Front
          </Button>
          <Button variant="danger" size="sm" onClick={handleClear} icon={<Trash2 size={14} />}>
            Clear
          </Button>
        </div>

        {/* Feedback message banner */}
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

      {/* Horizontal Queue Visualization */}
      <Card className="lg:col-span-2 flex flex-col justify-between p-6 min-h-[380px] bg-[#151E30] border-[#293449]">
        {/* Status Header */}
        <div className="w-full flex items-center justify-between border-b border-[#293449] pb-3 mb-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-white">Queue Channel</span>
            <Badge variant="indigo" size="xs">
              Size: {queue.length} / {MAX_CAPACITY}
            </Badge>
          </div>
          <Badge variant={queue.length === 0 ? 'amber' : 'emerald'} size="xs">
            {queue.length === 0 ? 'Empty' : queue.length === MAX_CAPACITY ? 'Full' : 'Operational'}
          </Badge>
        </div>

        {/* Horizontal Pipeline */}
        <div className="flex-1 flex flex-col justify-center items-center">
          <div className="w-full flex items-center justify-between text-[11px] text-slate-400 mb-2 px-2">
            <span className="font-semibold text-emerald-400">← FRONT (Dequeue exit)</span>
            <span className="font-semibold text-sky-400">REAR (Enqueue entry) ←</span>
          </div>

          <div className="w-full bg-[#0E1528] border-y-2 border-indigo-500/40 p-4 rounded-xl min-h-[120px] flex items-center gap-3 overflow-x-auto">
            {queue.length === 0 ? (
              <div className="text-xs text-slate-400 py-6 text-center w-full">
                Queue is empty. Enqueue elements at the rear.
              </div>
            ) : (
              queue.map((item, index) => {
                const isFront = index === 0
                const isRear = index === queue.length - 1

                return (
                  <div
                    key={item.id}
                    className={`shrink-0 w-20 h-20 rounded-xl border flex flex-col items-center justify-center p-2 transition-all duration-200 select-none ${
                      item.isHighlighted
                        ? 'bg-amber-500/30 border-amber-400 text-amber-200 ring-2 ring-amber-400/40 scale-105'
                        : isFront
                        ? 'bg-emerald-600/25 border-emerald-400 text-white shadow-md shadow-emerald-600/20'
                        : isRear
                        ? 'bg-sky-600/25 border-sky-400 text-white shadow-md shadow-sky-600/20'
                        : 'bg-[#151E30] border-[#293449] text-slate-200'
                    }`}
                  >
                    <span className="font-mono text-base font-bold">{item.value}</span>
                    <div className="flex gap-1 mt-1">
                      {isFront && (
                        <span className="text-[9px] px-1 rounded bg-emerald-500/30 text-emerald-300 font-mono font-bold">
                          FRONT
                        </span>
                      )}
                      {isRear && (
                        <span className="text-[9px] px-1 rounded bg-sky-500/30 text-sky-300 font-mono font-bold">
                          REAR
                        </span>
                      )}
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </div>

        <span className="text-[11px] text-slate-400 text-center mt-3">
          Elements depart in the order they were inserted (First-In, First-Out).
        </span>
      </Card>
    </div>
  )
}
