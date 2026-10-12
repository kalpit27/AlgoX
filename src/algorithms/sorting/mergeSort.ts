import { ElementState, SortingStep } from '../../types/sorting'

export function generateMergeSortSteps(initialArray: number[]): SortingStep[] {
  const steps: SortingStep[] = []
  const arr = [...initialArray]
  const n = arr.length
  let comparisons = 0
  let swaps = 0
  let writes = 0

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

  addStep({}, 'Starting Merge Sort. Initial array.', 1, 'initial')

  if (n <= 1) {
    const states: Record<number, ElementState> = {}
    if (n === 1) states[0] = 'sorted'
    addStep(states, 'Array with 0 or 1 element is already sorted.', 2, 'complete')
    return steps
  }

  function merge(left: number, mid: number, right: number) {
    const temp: number[] = []
    let i = left
    let j = mid + 1

    addStep(
      (() => {
        const s: Record<number, ElementState> = {}
        for (let k = left; k <= right; k++) s[k] = 'default'
        s[left] = 'comparing'
        s[mid + 1] = 'comparing'
        return s
      })(),
      `Merging subarrays: [${left}..${mid}] and [${mid + 1}..${right}]`,
      6,
      'compare'
    )

    while (i <= mid && j <= right) {
      comparisons++
      addStep(
        { [i]: 'comparing', [j]: 'comparing' },
        `Comparing arr[${i}] (${arr[i]}) with arr[${j}] (${arr[j]})`,
        6,
        'compare'
      )

      if (arr[i] <= arr[j]) {
        temp.push(arr[i])
        i++
      } else {
        temp.push(arr[j])
        j++
      }
    }

    while (i <= mid) {
      temp.push(arr[i])
      i++
    }

    while (j <= right) {
      temp.push(arr[j])
      j++
    }

    // Write back to original array
    for (let k = 0; k < temp.length; k++) {
      const targetIdx = left + k
      arr[targetIdx] = temp[k]
      writes++

      addStep(
        { [targetIdx]: 'writing' },
        `Writing value ${temp[k]} back to position ${targetIdx}`,
        6,
        'write'
      )
    }

    // Subarray left..right is now merged and sorted
    const rangeSorted: Record<number, ElementState> = {}
    for (let k = left; k <= right; k++) rangeSorted[k] = 'sorted'
    addStep(
      rangeSorted,
      `Subarray [${left}..${right}] is now sorted.`,
      6,
      'mark-sorted'
    )
  }

  function mergeSortHelper(left: number, right: number) {
    if (left >= right) return

    const mid = Math.floor((left + right) / 2)
    addStep(
      { [mid]: 'pivot' },
      `Splitting subarray [${left}..${right}] around midpoint ${mid}`,
      3,
      'pivot'
    )

    mergeSortHelper(left, mid)
    mergeSortHelper(mid + 1, right)
    merge(left, mid, right)
  }

  mergeSortHelper(0, n - 1)

  const allSorted: Record<number, ElementState> = {}
  for (let k = 0; k < n; k++) allSorted[k] = 'sorted'
  steps.push({
    array: [...arr],
    elementStates: allSorted,
    comparisons,
    swaps,
    writes,
    description: `Merge Sort complete! Comparisons: ${comparisons}, writes: ${writes}.`,
    codeLine: 1,
    type: 'complete',
  })

  return steps
}
