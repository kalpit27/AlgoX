import { SearchElementState, SearchingStep } from '../../types/searching'

export function generateBinarySearchSteps(array: number[], target: number): SearchingStep[] {
  const steps: SearchingStep[] = []
  const n = array.length
  let comparisons = 0

  const getRangeStates = (low: number, high: number, mid?: number): Record<number, SearchElementState> => {
    const states: Record<number, SearchElementState> = {}
    for (let k = 0; k < n; k++) {
      if (k < low || k > high) {
        states[k] = 'out-of-range'
      } else {
        states[k] = 'default'
      }
    }
    if (mid !== undefined && mid >= 0 && mid < n) {
      states[mid] = 'inspecting'
    }
    return states
  }

  steps.push({
    array: [...array],
    elementStates: getRangeStates(0, n - 1),
    low: 0,
    high: n - 1,
    target,
    comparisons: 0,
    foundIndex: null,
    description: `Starting Binary Search for target ${target} over range [0..${n - 1}].`,
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
      codeLine: 7,
      type: 'not-found',
    })
    return steps
  }

  let low = 0
  let high = n - 1

  while (low <= high) {
    const mid = Math.floor((low + high) / 2)
    comparisons++

    steps.push({
      array: [...array],
      elementStates: getRangeStates(low, high, mid),
      low,
      mid,
      high,
      target,
      comparisons,
      foundIndex: null,
      description: `Midpoint index is ${mid} (value ${array[mid]}). Active range: [${low}..${high}]. Comparing arr[${mid}] with target ${target}.`,
      codeLine: 3,
      type: 'compare',
    })

    if (array[mid] === target) {
      const foundStates = getRangeStates(low, high)
      foundStates[mid] = 'found'
      steps.push({
        array: [...array],
        elementStates: foundStates,
        low,
        mid,
        high,
        target,
        comparisons,
        foundIndex: mid,
        description: `Target ${target} found at mid index ${mid}! Comparisons made: ${comparisons}.`,
        codeLine: 4,
        type: 'found',
      })
      return steps
    } else if (array[mid] < target) {
      const oldLow = low
      low = mid + 1
      steps.push({
        array: [...array],
        elementStates: getRangeStates(low, high),
        low,
        mid,
        high,
        target,
        comparisons,
        foundIndex: null,
        description: `Since arr[${mid}] (${array[mid]}) < ${target}, discarding left range [${oldLow}..${mid}]. New search range is [${low}..${high}].`,
        codeLine: 5,
        type: 'range-update',
      })
    } else {
      const oldHigh = high
      high = mid - 1
      steps.push({
        array: [...array],
        elementStates: getRangeStates(low, high),
        low,
        mid,
        high,
        target,
        comparisons,
        foundIndex: null,
        description: `Since arr[${mid}] (${array[mid]}) > ${target}, discarding right range [${mid}..${oldHigh}]. New search range is [${low}..${high}].`,
        codeLine: 6,
        type: 'range-update',
      })
    }
  }

  // Not found
  const outOfRangeStates: Record<number, SearchElementState> = {}
  for (let k = 0; k < n; k++) outOfRangeStates[k] = 'out-of-range'

  steps.push({
    array: [...array],
    elementStates: outOfRangeStates,
    target,
    comparisons,
    foundIndex: null,
    description: `Search space exhausted (low > high). Target ${target} does not exist in the array. Comparisons: ${comparisons}.`,
    codeLine: 7,
    type: 'not-found',
  })

  return steps
}
