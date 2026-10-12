import { ElementState, SortingStep } from '../../types/sorting'

export function generateInsertionSortSteps(initialArray: number[]): SortingStep[] {
  const steps: SortingStep[] = []
  const arr = [...initialArray]
  const n = arr.length
  let comparisons = 0
  let swaps = 0
  let writes = 0

  const sortedPrefix = (count: number): Record<number, ElementState> => {
    const states: Record<number, ElementState> = {}
    for (let k = 0; k < count; k++) states[k] = 'sorted'
    return states
  }

  const addStep = (
    elementStates: Record<number, ElementState>,
    description: string,
    codeLine: number,
    type: SortingStep['type']
  ) => {
    steps.push({
      array: [...arr],
      elementStates,
      comparisons,
      swaps,
      writes,
      description,
      codeLine,
      type,
    })
  }

  addStep({}, 'Starting Insertion Sort. Initial array.', 1, 'initial')

  if (n <= 1) {
    addStep(sortedPrefix(n), 'Array with 0 or 1 element is already sorted.', 1, 'complete')
    return steps
  }

  addStep(sortedPrefix(1), 'Element at index 0 is trivially sorted.', 1, 'mark-sorted')

  for (let i = 1; i < n; i++) {
    const key = arr[i]
    let j = i - 1

    addStep(
      { ...sortedPrefix(i), [i]: 'min-max' },
      `Examining key arr[${i}] = ${key} to insert into sorted prefix.`,
      2,
      'min-max'
    )

    while (j >= 0) {
      comparisons++
      addStep(
        { ...sortedPrefix(i), [j]: 'comparing', [j + 1]: 'min-max' },
        `Comparing arr[${j}] (${arr[j]}) with key (${key})`,
        4,
        'compare'
      )

      if (arr[j] > key) {
        arr[j + 1] = arr[j]
        writes++
        addStep(
          { ...sortedPrefix(i), [j + 1]: 'writing', [j]: 'default' },
          `Shifted arr[${j}] (${arr[j]}) to index ${j + 1}`,
          5,
          'write'
        )
        j--
      } else {
        break
      }
    }

    arr[j + 1] = key
    writes++
    addStep(
      { ...sortedPrefix(i + 1), [j + 1]: 'sorted' },
      `Inserted key ${key} at index ${j + 1}. Prefix 0..${i} is now sorted.`,
      7,
      'mark-sorted'
    )
  }

  const allSorted: Record<number, ElementState> = {}
  for (let idx = 0; idx < n; idx++) allSorted[idx] = 'sorted'
  steps.push({
    array: [...arr],
    elementStates: allSorted,
    comparisons,
    swaps,
    writes,
    description: `Insertion Sort completed! Comparisons: ${comparisons}, writes/shifts: ${writes}.`,
    codeLine: 1,
    type: 'complete',
  })

  return steps
}
