import React, { useState } from 'react'
import { Modal } from '../../components/ui/Modal'
import { Button } from '../../components/ui/Button'
import { parseCustomArray } from '../../utils/validators'
import {
  generateNearlySortedArray,
  generateRandomArray,
  generateReverseArray,
  generateFewUniqueArray,
} from '../../utils/arrayGenerators'

export interface CustomArrayModalProps {
  isOpen: boolean
  onClose: () => void
  onApply: (newArray: number[]) => void
  currentArray: number[]
}

export const CustomArrayModal: React.FC<CustomArrayModalProps> = ({
  isOpen,
  onClose,
  onApply,
  currentArray,
}) => {
  const [inputText, setInputText] = useState(currentArray.join(', '))
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const result = parseCustomArray(inputText, 2, 40, -99, 999)
    if (!result.success || !result.data) {
      setError(result.error || 'Invalid array input')
      return
    }
    setError(null)
    onApply(result.data)
    onClose()
  }

  const applyPreset = (genFn: () => number[]) => {
    const arr = genFn()
    setInputText(arr.join(', '))
    setError(null)
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Configure Array Input"
      description="Enter custom integer values or select a predefined distribution pattern."
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Preset distributions */}
        <div className="flex flex-col gap-1.5">
          <span className="text-xs font-semibold text-slate-300">
            Quick Patterns:
          </span>
          <div className="flex flex-wrap gap-1.5">
            <button
              type="button"
              onClick={() => applyPreset(() => generateRandomArray(15, 5, 95))}
              className="px-2.5 py-1 text-xs rounded bg-[#111827] hover:bg-[#1E293B] border border-[#252F44] text-slate-300 transition-colors cursor-pointer"
            >
              Random (15)
            </button>
            <button
              type="button"
              onClick={() => applyPreset(() => generateNearlySortedArray(15))}
              className="px-2.5 py-1 text-xs rounded bg-[#111827] hover:bg-[#1E293B] border border-[#252F44] text-slate-300 transition-colors cursor-pointer"
            >
              Nearly Sorted
            </button>
            <button
              type="button"
              onClick={() => applyPreset(() => generateReverseArray(15, 90, 5))}
              className="px-2.5 py-1 text-xs rounded bg-[#111827] hover:bg-[#1E293B] border border-[#252F44] text-slate-300 transition-colors cursor-pointer"
            >
              Reverse Ordered
            </button>
            <button
              type="button"
              onClick={() => applyPreset(() => generateFewUniqueArray(16))}
              className="px-2.5 py-1 text-xs rounded bg-[#111827] hover:bg-[#1E293B] border border-[#252F44] text-slate-300 transition-colors cursor-pointer"
            >
              Few Unique Keys
            </button>
          </div>
        </div>

        {/* Text area */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="custom-array-input" className="text-xs font-semibold text-slate-300">
            Comma-separated Integers (2 to 40 items):
          </label>
          <textarea
            id="custom-array-input"
            rows={3}
            value={inputText}
            onChange={(e) => {
              setInputText(e.target.value)
              if (error) setError(null)
            }}
            placeholder="e.g. 45, 12, 89, 23, 67, 34, 9"
            className="w-full bg-[#111827] border border-[#252F44] rounded-lg p-2.5 font-mono text-sm text-slate-200 focus:outline-none focus:border-indigo-500/80 resize-none"
          />
          {error && <span className="text-xs text-rose-400 font-medium">{error}</span>}
          <span className="text-[11px] text-slate-400">
            Values should be between -99 and 999.
          </span>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-2 pt-2 border-t border-[#293449]">
          <Button variant="outline" size="sm" type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" size="sm" type="submit">
            Apply Array
          </Button>
        </div>
      </form>
    </Modal>
  )
}
