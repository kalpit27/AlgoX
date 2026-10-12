import { ElementState, SortingStep } from '../../types/sorting'

export function generateQuickSortSteps(initialArray: number[]): SortingStep[] {
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
    for (let k = 0; k < n; k++) {
      if (sortedIndices.has(k)) states[k] = 'sorted'
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

  addStep({}, 'Starting Quick Sort. Initial array.', 1, 'initial')

  if (n <= 1) {
    if (n === 1) sortedIndices.add(0)
    addStep({}, 'Array with 0 or 1 element is already sorted.', 2, 'complete')
    return steps
  }

  function partition(low: number, high: number): number {
    const pivot = arr[high]
    let i = low

    addStep(
      { [high]: 'pivot' },
      `Selected pivot arr[${high}] = ${pivot} for partition range [${low}..${high}]`,
      7,
      'pivot'
    )

    for (let j = low; j < high; j++) {
      comparisons++
      addStep(
        { [high]: 'pivot', [j]: 'comparing', [i]: 'min-max' },
        `Comparing arr[${j}] (${arr[j]}) with pivot ${pivot}`,
        9,
        'compare'
      )

      if (arr[j] < pivot) {
        if (i !== j) {
          const temp = arr[i]
          arr[i] = arr[j]
          arr[j] = temp
          swaps++

          addStep(
            { [high]: 'pivot', [i]: 'swapping', [j]: 'swapping' },
            `Swapped arr[${i}] (${arr[i]}) and arr[${j}] (${arr[j]}) since ${arr[i]} < pivot`,
            9,
            'swap'
          )
        }
        i++
      }
    }

    // Place pivot in correct spot
    if (i !== high) {
      const temp = arr[i]
      arr[i] = arr[high]
      arr[high] = temp
      swaps++

      addStep(
        { [i]: 'swapping', [high]: 'swapping' },
        `Swapped pivot arr[${high}] to partition boundary index ${i}`,
        10,
        'swap'
      )
    }

    sortedIndices.add(i)
    addStep(
      { [i]: 'sorted' },
      `Pivot element ${arr[i]} is now at its final sorted position index ${i}.`,
      10,
      'mark-sorted'
    )

    return i
  }

  function quickSortHelper(low: number, high: number) {
    if (low < high) {
      const pi = partition(low, high)
      quickSortHelper(low, pi - 1)
      quickSortHelper(pi + 1, high)
    } else if (low === high) {
      sortedIndices.add(low)
      addStep(
        { [low]: 'sorted' },
        `Single element at index ${low} is sorted.`,
        2,
        'mark-sorted'
      )
    }
  }

  quickSortHelper(0, n - 1)

  const allSorted: Record<number, ElementState> = {}
  for (let k = 0; k < n; k++) allSorted[k] = 'sorted'
  steps.push({
    array: [...arr],
    elementStates: allSorted,
    comparisons,
    swaps,
    writes,
    description: `Quick Sort completed! Total comparisons: ${comparisons}, swaps: ${swaps}.`,
    codeLine: 1,
    type: 'complete',
  })

  return steps
}
