import { ElementState, SortingStep } from '../../types/sorting'

export function generateBubbleSortSteps(initialArray: number[]): SortingStep[] {
  const steps: SortingStep[] = []
  const arr = [...initialArray]
  const n = arr.length
  let comparisons = 0
  let swaps = 0
  let writes = 0

  const sortedIndices = new Set<number>()

  // Helper to construct a step snapshot
  const addStep = (
    elementStates: Record<number, ElementState>,
    description: string,
    codeLine: number,
    type: SortingStep['type']
  ) => {
    // Preserve confirmed sorted elements in visual states
    const states: Record<number, ElementState> = {}
    for (let i = 0; i < n; i++) {
      if (sortedIndices.has(i)) {
        states[i] = 'sorted'
      }
    }
    Object.assign(states, elementStates)

    steps.push({
      array: [...arr],
      elementStates: states,
      comparisons,
      swaps,
      writes,
      description,
      codeLine,
      type,
    })
  }

  // Initial step
  addStep({}, 'Starting Bubble Sort. Array is initially unsorted.', 1, 'initial')

  if (n <= 1) {
    if (n === 1) sortedIndices.add(0)
    addStep({}, 'Array with 0 or 1 element is already sorted.', 7, 'complete')
    return steps
  }

  for (let i = 0; i < n - 1; i++) {
    let swapped = false

    for (let j = 0; j < n - i - 1; j++) {
      comparisons++
      // Comparing step
      addStep(
        { [j]: 'comparing', [j + 1]: 'comparing' },
        `Comparing arr[${j}] (${arr[j]}) and arr[${j + 1}] (${arr[j + 1]})`,
        4,
        'compare'
      )

      if (arr[j] > arr[j + 1]) {
        // Swap values
        const temp = arr[j]
        arr[j] = arr[j + 1]
        arr[j + 1] = temp
        swaps++
        swapped = true

        addStep(
          { [j]: 'swapping', [j + 1]: 'swapping' },
          `Swapped arr[${j}] and arr[${j + 1}] because ${arr[j + 1]} < ${arr[j]}`,
          5,
          'swap'
        )
      }
    }

    // Element at n - 1 - i is confirmed sorted
    sortedIndices.add(n - 1 - i)
    addStep(
      { [n - 1 - i]: 'sorted' },
      `Element ${arr[n - 1 - i]} at index ${n - 1 - i} is now in its final sorted position.`,
      3,
      'mark-sorted'
    )

    if (!swapped) {
      // Early exit if array is already sorted
      for (let k = 0; k < n; k++) sortedIndices.add(k)
      addStep(
        {},
        'No swaps occurred in this pass. Array is fully sorted!',
        7,
        'complete'
      )
      return steps
    }
  }

  // First element is also sorted
  sortedIndices.add(0)
  const allSortedStates: Record<number, ElementState> = {}
  for (let i = 0; i < n; i++) allSortedStates[i] = 'sorted'
  steps.push({
    array: [...arr],
    elementStates: allSortedStates,
    comparisons,
    swaps,
    writes,
    description: `Bubble Sort finished successfully! Total comparisons: ${comparisons}, swaps: ${swaps}.`,
    codeLine: 7,
    type: 'complete',
  })

  return steps
}
