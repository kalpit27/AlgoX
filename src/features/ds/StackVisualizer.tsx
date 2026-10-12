import React, { useState } from 'react'
import { Card } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { Badge } from '../../components/ui/Badge'
import { ArrowDown, AlertCircle, Trash2, Eye } from 'lucide-react'

export interface StackItem {
  id: string
  value: number
  isHighlighted?: boolean
}

export const StackVisualizer: React.FC = () => {
  const [stack, setStack] = useState<StackItem[]>([
    { id: '1', value: 10 },
    { id: '2', value: 25 },
    { id: '3', value: 42 },
  ])
  const [inputValue, setInputValue] = useState<string>('50')
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' | 'info' }>({
    text: 'Stack initialized with 3 elements.',
    type: 'info',
  })

  const MAX_CAPACITY = 8

  const handlePush = () => {
    const val = Number(inputValue)
    if (isNaN(val) || !Number.isInteger(val)) {
      setMessage({ text: 'Please enter a valid integer to push.', type: 'error' })
      return
    }
    if (stack.length >= MAX_CAPACITY) {
      setMessage({
        text: `Stack Overflow: Capacity limit (${MAX_CAPACITY}) reached for visual clarity.`,
        type: 'error',
      })
      return
    }

    const newItem: StackItem = {
      id: `${Date.now()}`,
      value: val,
      isHighlighted: true,
    }

    setStack([newItem, ...stack])
    setMessage({
      text: `Pushed ${val} onto top of stack.`,
      type: 'success',
    })
    setInputValue(String(Math.floor(Math.random() * 90) + 10))

    setTimeout(() => {
      setStack((prev) => prev.map((item) => ({ ...item, isHighlighted: false })))
    }, 1200)
  }

  const handlePop = () => {
    if (stack.length === 0) {
      setMessage({ text: 'Stack Underflow: Cannot pop from an empty stack.', type: 'error' })
      return
    }
    const [popped, ...rest] = stack
    setStack(rest)
    setMessage({
      text: `Popped top element ${popped.value} from stack.`,
      type: 'success',
    })
  }

  const handlePeek = () => {
    if (stack.length === 0) {
      setMessage({ text: 'Stack is empty. No top element to inspect.', type: 'error' })
      return
    }
    const topVal = stack[0].value
    setStack((prev) =>
      prev.map((item, idx) => (idx === 0 ? { ...item, isHighlighted: true } : item))
    )
    setMessage({
      text: `Peek: Top element is ${topVal} at index 0.`,
      type: 'info',
    })

    setTimeout(() => {
      setStack((prev) => prev.map((item) => ({ ...item, isHighlighted: false })))
    }, 1500)
  }

  const handleClear = () => {
    setStack([])
    setMessage({ text: 'Stack cleared.', type: 'info' })
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Controls & Operations */}
      <Card className="flex flex-col gap-4">
        <div className="border-b border-[#293449] pb-3">
          <h3 className="text-base font-bold text-white">Stack Controls</h3>
          <p className="text-xs text-slate-400">
            LIFO (Last-In, First-Out) operations
          </p>
        </div>

        {/* Input & Push */}
        <div className="flex flex-col gap-2">
          <label htmlFor="stack-push-input" className="text-xs font-semibold text-slate-300">New Value to Push:</label>
          <div className="flex gap-2">
            <input
              id="stack-push-input"
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="flex-1 bg-[#111827] border border-[#252F44] rounded-lg px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-indigo-500"
              placeholder="e.g. 50"
            />
            <Button variant="primary" size="sm" onClick={handlePush} icon={<ArrowDown size={14} />}>
              Push
            </Button>
          </div>
        </div>

        {/* Other Operations */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-[#1E283D]">
          <Button variant="secondary" size="sm" onClick={handlePop}>
            Pop (Remove Top)
          </Button>
          <Button variant="outline" size="sm" onClick={handlePeek} icon={<Eye size={14} />}>
            Peek Top
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

      {/* Vertical Stack Visualization */}
      <Card className="lg:col-span-2 flex flex-col items-center justify-between p-6 min-h-[380px] bg-[#151E30] border-[#293449]">
        {/* Status Header */}
        <div className="w-full flex items-center justify-between border-b border-[#293449] pb-3 mb-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-white">Stack Representation</span>
            <Badge variant="indigo" size="xs">
              Size: {stack.length} / {MAX_CAPACITY}
            </Badge>
          </div>
          <Badge variant={stack.length === 0 ? 'amber' : 'emerald'} size="xs">
            {stack.length === 0 ? 'Empty' : stack.length === MAX_CAPACITY ? 'Full' : 'Operational'}
          </Badge>
        </div>

        {/* Vertical Stack Bucket */}
        <div className="w-56 flex flex-col items-center justify-end p-2 bg-[#0E1528] border-x-4 border-b-4 border-indigo-500/40 rounded-b-xl min-h-[260px] relative">
          {stack.length === 0 ? (
            <div className="text-xs text-slate-400 py-12 flex flex-col items-center">
              <span>Stack is empty</span>
              <span className="text-[10px] text-slate-400 mt-1">Push an item to start</span>
            </div>
          ) : (
            stack.map((item, index) => {
              const isTop = index === 0
              return (
                <div
                  key={item.id}
                  className={`w-full py-2.5 px-4 my-1 rounded-lg border flex items-center justify-between transition-all duration-200 select-none ${
                    item.isHighlighted
                      ? 'bg-amber-500/30 border-amber-400 text-amber-200 scale-102 ring-2 ring-amber-400/40'
                      : isTop
                      ? 'bg-indigo-600/30 border-indigo-400 text-white shadow-md shadow-indigo-600/20'
                      : 'bg-[#151E30] border-[#293449] text-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm font-bold">{item.value}</span>
                  </div>
                  {isTop && (
                    <Badge variant="cyan" size="xs">
                      TOP
                    </Badge>
                  )}
                </div>
              )
            })
          )}
        </div>

        <span className="text-[11px] text-slate-400 mt-3">
          Bottom of Stack (Closed Boundary)
        </span>
      </Card>
    </div>
  )
}
