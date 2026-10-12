import { SortingAlgorithmId, SortingStep } from '../../types/sorting'
import { generateBubbleSortSteps } from './bubbleSort'
import { generateSelectionSortSteps } from './selectionSort'
import { generateInsertionSortSteps } from './insertionSort'
import { generateMergeSortSteps } from './mergeSort'
import { generateQuickSortSteps } from './quickSort'
import { generateHeapSortSteps } from './heapSort'

export * from '../../types/sorting'
export * from './meta'
export {
  generateBubbleSortSteps,
  generateSelectionSortSteps,
  generateInsertionSortSteps,
  generateMergeSortSteps,
  generateQuickSortSteps,
  generateHeapSortSteps,
}

export function getSortingSteps(algorithm: SortingAlgorithmId, array: number[]): SortingStep[] {
  switch (algorithm) {
    case 'bubble':
      return generateBubbleSortSteps(array)
    case 'selection':
      return generateSelectionSortSteps(array)
    case 'insertion':
      return generateInsertionSortSteps(array)
    case 'merge':
      return generateMergeSortSteps(array)
    case 'quick':
      return generateQuickSortSteps(array)
    case 'heap':
      return generateHeapSortSteps(array)
    default:
      return generateBubbleSortSteps(array)
  }
}
