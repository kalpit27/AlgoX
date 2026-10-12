export type SearchAlgorithmId = 'linear' | 'binary'

export type SearchElementState =
  | 'default'
  | 'inspecting'
  | 'found'
  | 'out-of-range'
  | 'match-candidate'

export interface SearchingStep {
  array: number[]
  elementStates: Record<number, SearchElementState>
  currentIndex?: number
  low?: number
  mid?: number
  high?: number
  target: number
  comparisons: number
  foundIndex: number | null
  description: string
  codeLine: number
  type: 'inspect' | 'compare' | 'found' | 'not-found' | 'range-update' | 'initial'
}

export interface SearchingAlgorithmMeta {
  id: SearchAlgorithmId
  name: string
  description: string
  requiresSorted: boolean
  bestTime: string
  averageTime: string
  worstTime: string
  space: string
  pseudocode: string[]
  explanation: string
}
