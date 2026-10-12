import { describe, it, expect } from 'vitest'
import {
  generateLinearSearchSteps,
  generateBinarySearchSteps,
} from '../algorithms/searching'

describe('Searching Algorithms Correctness', () => {
  describe('Linear Search', () => {
    it('finds target when present in the middle', () => {
      const arr = [10, 25, 45, 60, 80]
      const steps = generateLinearSearchSteps(arr, 45)
      const lastStep = steps[steps.length - 1]
      expect(lastStep.type).toBe('found')
      expect(lastStep.foundIndex).toBe(2)
      expect(lastStep.comparisons).toBe(3)
    })

    it('reports not-found when target is absent', () => {
      const arr = [10, 25, 45, 60]
      const steps = generateLinearSearchSteps(arr, 99)
      const lastStep = steps[steps.length - 1]
      expect(lastStep.type).toBe('not-found')
      expect(lastStep.foundIndex).toBeNull()
      expect(lastStep.comparisons).toBe(4)
    })

    it('handles empty arrays', () => {
      const steps = generateLinearSearchSteps([], 5)
      const lastStep = steps[steps.length - 1]
      expect(lastStep.type).toBe('not-found')
      expect(lastStep.foundIndex).toBeNull()
    })

    it('handles single-element array (match and mismatch)', () => {
      const matchSteps = generateLinearSearchSteps([7], 7)
      expect(matchSteps[matchSteps.length - 1].foundIndex).toBe(0)

      const mismatchSteps = generateLinearSearchSteps([7], 9)
      expect(mismatchSteps[mismatchSteps.length - 1].foundIndex).toBeNull()
    })

    it('returns first occurrence for duplicate values', () => {
      const arr = [10, 20, 30, 20, 50]
      const steps = generateLinearSearchSteps(arr, 20)
      const lastStep = steps[steps.length - 1]
      expect(lastStep.type).toBe('found')
      expect(lastStep.foundIndex).toBe(1)
    })

    it('handles negative numbers correctly', () => {
      const arr = [-30, -10, 0, 15]
      const steps = generateLinearSearchSteps(arr, -10)
      const lastStep = steps[steps.length - 1]
      expect(lastStep.type).toBe('found')
      expect(lastStep.foundIndex).toBe(1)
    })
  })

  describe('Binary Search', () => {
    it('finds target when present at midpoint', () => {
      const arr = [10, 20, 30, 40, 50]
      const steps = generateBinarySearchSteps(arr, 30)
      const lastStep = steps[steps.length - 1]
      expect(lastStep.type).toBe('found')
      expect(lastStep.foundIndex).toBe(2)
      expect(lastStep.comparisons).toBe(1)
    })

    it('finds target at start (index 0)', () => {
      const arr = [5, 12, 19, 27, 35, 48]
      const steps = generateBinarySearchSteps(arr, 5)
      const lastStep = steps[steps.length - 1]
      expect(lastStep.type).toBe('found')
      expect(lastStep.foundIndex).toBe(0)
    })

    it('finds target at end (last index)', () => {
      const arr = [5, 12, 19, 27, 35, 48]
      const steps = generateBinarySearchSteps(arr, 48)
      const lastStep = steps[steps.length - 1]
      expect(lastStep.type).toBe('found')
      expect(lastStep.foundIndex).toBe(5)
    })

    it('reports not-found when target is outside range', () => {
      const arr = [10, 20, 30, 40]
      const stepsSmaller = generateBinarySearchSteps(arr, 2)
      expect(stepsSmaller[stepsSmaller.length - 1].foundIndex).toBeNull()

      const stepsLarger = generateBinarySearchSteps(arr, 99)
      expect(stepsLarger[stepsLarger.length - 1].foundIndex).toBeNull()
    })

    it('handles empty arrays', () => {
      const steps = generateBinarySearchSteps([], 10)
      const lastStep = steps[steps.length - 1]
      expect(lastStep.type).toBe('not-found')
      expect(lastStep.foundIndex).toBeNull()
    })

    it('handles sorted arrays with negative integers', () => {
      const arr = [-50, -25, -10, 0, 15, 30]
      const steps = generateBinarySearchSteps(arr, -25)
      const lastStep = steps[steps.length - 1]
      expect(lastStep.type).toBe('found')
      expect(lastStep.foundIndex).toBe(1)
    })
  })
})
