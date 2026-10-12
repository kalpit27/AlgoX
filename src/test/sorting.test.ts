import { describe, it, expect } from 'vitest'
import {
  generateBubbleSortSteps,
  generateSelectionSortSteps,
  generateInsertionSortSteps,
  generateMergeSortSteps,
  generateQuickSortSteps,
  generateHeapSortSteps,
  SortingAlgorithmId,
  getSortingSteps,
} from '../algorithms/sorting'

const algorithms: { id: SortingAlgorithmId; name: string }[] = [
  { id: 'bubble', name: 'Bubble Sort' },
  { id: 'selection', name: 'Selection Sort' },
  { id: 'insertion', name: 'Insertion Sort' },
  { id: 'merge', name: 'Merge Sort' },
  { id: 'quick', name: 'Quick Sort' },
  { id: 'heap', name: 'Heap Sort' },
]

describe('Sorting Algorithms Correctness & Invariants', () => {
  algorithms.forEach(({ id, name }) => {
    describe(`${name} (${id})`, () => {
      it('correctly sorts a standard unsorted array', () => {
        const input = [34, 12, 89, 5, 23, 70, 1]
        const inputCopy = [...input]
        const steps = getSortingSteps(id, input)
        const finalArray = steps[steps.length - 1].array

        expect(finalArray).toEqual([1, 5, 12, 23, 34, 70, 89])
        // Verify original input array was not mutated
        expect(input).toEqual(inputCopy)
      })

      it('handles empty arrays', () => {
        const input: number[] = []
        const steps = getSortingSteps(id, input)
        expect(steps.length).toBeGreaterThan(0)
        expect(steps[steps.length - 1].array).toEqual([])
      })

      it('handles single-element arrays', () => {
        const input = [42]
        const steps = getSortingSteps(id, input)
        expect(steps.length).toBeGreaterThan(0)
        expect(steps[steps.length - 1].array).toEqual([42])
      })

      it('handles already sorted arrays', () => {
        const input = [2, 5, 8, 11, 14, 20]
        const steps = getSortingSteps(id, input)
        expect(steps[steps.length - 1].array).toEqual([2, 5, 8, 11, 14, 20])
      })

      it('handles reverse-sorted arrays', () => {
        const input = [90, 75, 60, 45, 30, 15]
        const steps = getSortingSteps(id, input)
        expect(steps[steps.length - 1].array).toEqual([15, 30, 45, 60, 75, 90])
      })

      it('handles duplicate values correctly', () => {
        const input = [7, 3, 7, 1, 3, 7, 2]
        const steps = getSortingSteps(id, input)
        expect(steps[steps.length - 1].array).toEqual([1, 2, 3, 3, 7, 7, 7])
      })

      it('handles negative integers and zero', () => {
        const input = [0, -15, 8, -3, 25, -50]
        const steps = getSortingSteps(id, input)
        expect(steps[steps.length - 1].array).toEqual([-50, -15, -3, 0, 8, 25])
      })

      it('preserves history and tracks non-negative comparisons', () => {
        const input = [10, 5, 2]
        const steps = getSortingSteps(id, input)
        expect(steps.length).toBeGreaterThan(1)
        const finalStep = steps[steps.length - 1]
        expect(finalStep.comparisons).toBeGreaterThanOrEqual(0)
        expect(finalStep.type).toBe('complete')
      })
    })
  })
})
