import { ElementState, SortingStep } from '../../types/sorting'

export function generateSelectionSortSteps(initialArray: number[]): SortingStep[] {
  const steps: SortingStep[] = []
  const arr = [...initialArray]
  const n = arr.length
  let comparisons = 0
  let swaps = 0
  let writes = 0

  const sortedIndices = new Set<number>()

  const addStep = (
    elementStates: Record<number, ElementState>,
    description: string,
    codeLine: number,
    type: SortingStep['type']
  ) => {
    const states: Record<number, ElementState> = {}
    for (let idx = 0; idx < n; idx++) {
      if (sortedIndices.has(idx)) states[idx] = 'sorted'
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

  addStep({}, 'Starting Selection Sort. Array is initially unsorted.', 1, 'initial')

  if (n <= 1) {
    if (n === 1) sortedIndices.add(0)
    addStep({}, 'Array with 0 or 1 element is already sorted.', 1, 'complete')
    return steps
  }

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i
    addStep(
      { [i]: 'min-max' },
      `Current scan pass: initialized minimum element at index ${i} (${arr[i]})`,
      2,
      'min-max'
    )

    for (let j = i + 1; j < n; j++) {
      comparisons++
      addStep(
        { [minIdx]: 'min-max', [j]: 'comparing' },
        `Comparing current minimum arr[${minIdx}] (${arr[minIdx]}) with arr[${j}] (${arr[j]})`,
        4,
        'compare'
      )

      if (arr[j] < arr[minIdx]) {
        minIdx = j
        addStep(
          { [minIdx]: 'min-max' },
          `Found new minimum: arr[${minIdx}] = ${arr[minIdx]}`,
          5,
          'min-max'
        )
      }
    }

    if (minIdx !== i) {
      const temp = arr[i]
      arr[i] = arr[minIdx]
      arr[minIdx] = temp
      swaps++
      addStep(
        { [i]: 'swapping', [minIdx]: 'swapping' },
        `Swapping minimum arr[${minIdx}] into sorted position at index ${i}`,
        7,
        'swap'
      )
    }

    sortedIndices.add(i)
    addStep(
      { [i]: 'sorted' },
      `Index ${i} (${arr[i]}) is now confirmed in sorted position.`,
      1,
      'mark-sorted'
    )
  }

  sortedIndices.add(n - 1)
  const allSortedStates: Record<number, ElementState> = {}
  for (let idx = 0; idx < n; idx++) allSortedStates[idx] = 'sorted'
  steps.push({
    array: [...arr],
    elementStates: allSortedStates,
    comparisons,
    swaps,
    writes,
    description: `Selection Sort finished! Total comparisons: ${comparisons}, swaps: ${swaps}.`,
    codeLine: 1,
    type: 'complete',
  })

  return steps
}
