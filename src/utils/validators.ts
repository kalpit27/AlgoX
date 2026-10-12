export interface ParseArrayResult {
  success: boolean
  data?: number[]
  error?: string
}

export function parseCustomArray(input: string, minSize = 2, maxSize = 60, minVal = -999, maxVal = 999): ParseArrayResult {
  const trimmed = input.trim()
  if (!trimmed) {
    return { success: false, error: 'Please enter a comma-separated list of numbers.' }
  }

  const parts = trimmed.split(/[\s,]+/).filter(Boolean)
  if (parts.length < minSize) {
    return { success: false, error: `Please provide at least ${minSize} numbers.` }
  }
  if (parts.length > maxSize) {
    return { success: false, error: `Array size cannot exceed ${maxSize} elements for visual performance.` }
  }

  const numbers: number[] = []
  for (const part of parts) {
    const num = Number(part)
    if (isNaN(num) || !Number.isInteger(num)) {
      return { success: false, error: `"${part}" is not a valid integer.` }
    }
    if (num < minVal || num > maxVal) {
      return { success: false, error: `Values must be between ${minVal} and ${maxVal}.` }
    }
    numbers.push(num)
  }

  return { success: true, data: numbers }
}

export function validateInteger(input: string, min = -999, max = 999): { success: boolean; value?: number; error?: string } {
  const trimmed = input.trim()
  if (!trimmed) {
    return { success: false, error: 'Input cannot be empty.' }
  }
  const num = Number(trimmed)
  if (isNaN(num) || !Number.isInteger(num)) {
    return { success: false, error: 'Must be a valid integer.' }
  }
  if (num < min || num > max) {
    return { success: false, error: `Value must be between ${min} and ${max}.` }
  }
  return { success: true, value: num }
}
