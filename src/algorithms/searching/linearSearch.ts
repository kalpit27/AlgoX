import { SearchElementState, SearchingStep } from '../../types/searching'

export function generateLinearSearchSteps(array: number[], target: number): SearchingStep[] {
  const steps: SearchingStep[] = []
  const n = array.length
  let comparisons = 0

  steps.push({
    array: [...array],
    elementStates: {},
    target,
    comparisons: 0,
    foundIndex: null,
    description: `Starting Linear Search for target value ${target}. Scanning from index 0.`,
    codeLine: 1,
    type: 'initial',
  })

  if (n === 0) {
    steps.push({
      array: [],
      elementStates: {},
      target,
      comparisons: 0,
      foundIndex: null,
      description: 'Array is empty. Target value not found.',
      codeLine: 4,
      type: 'not-found',
    })
    return steps
  }

  for (let i = 0; i < n; i++) {
    comparisons++
    const states: Record<number, SearchElementState> = { [i]: 'inspecting' }

    steps.push({
      array: [...array],
      elementStates: states,
      currentIndex: i,
      target,
      comparisons,
      foundIndex: null,
      description: `Inspecting index ${i}: comparing arr[${i}] (${array[i]}) with target (${target})`,
      codeLine: 2,
      type: 'compare',
    })

    if (array[i] === target) {
      const foundStates: Record<number, SearchElementState> = { [i]: 'found' }
      steps.push({
        array: [...array],
        elementStates: foundStates,
        currentIndex: i,
        target,
        comparisons,
        foundIndex: i,
        description: `Target ${target} found at index ${i} after ${comparisons} comparisons!`,
        codeLine: 3,
        type: 'found',
      })
      return steps
    }
  }

  steps.push({
    array: [...array],
    elementStates: {},
    target,
    comparisons,
    foundIndex: null,
    description: `Reached end of array. Target ${target} was not found after ${comparisons} comparisons.`,
    codeLine: 4,
    type: 'not-found',
  })

  return steps
}
