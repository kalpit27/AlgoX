export type ElementState =
  | 'default'
  | 'comparing'
  | 'swapping'
  | 'writing'
  | 'pivot'
  | 'min-max'
  | 'sorted'

export interface SortingStep {
  array: number[]
  elementStates: Record<number, ElementState>
  comparisons: number
  swaps: number
  writes: number
  description: string
  codeLine: number
  type: 'initial' | 'compare' | 'swap' | 'write' | 'pivot' | 'min-max' | 'mark-sorted' | 'complete'
}

export type SortingAlgorithmId =
  | 'bubble'
  | 'selection'
  | 'insertion'
  | 'merge'
  | 'quick'
  | 'heap'

export interface ComplexityInfo {
  bestTime: string
  averageTime: string
  worstTime: string
  space: string
  stable: boolean
  inPlace: boolean
}

export interface SortingAlgorithmMeta {
  id: SortingAlgorithmId
  name: string
  category: 'Comparison Sort' | 'Divide & Conquer'
  tagline: string
  description: string
  complexity: ComplexityInfo
  pseudocode: string[]
  explanation: string
}
