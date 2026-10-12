import { ElementState, SortingStep } from '../../types/sorting'

export function generateHeapSortSteps(initialArray: number[]): SortingStep[] {
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

  addStep({}, 'Starting Heap Sort. Initial array.', 1, 'initial')

  if (n <= 1) {
    if (n === 1) sortedIndices.add(0)
    addStep({}, 'Array with 0 or 1 element is already sorted.', 1, 'complete')
    return steps
  }

  function heapify(size: number, root: number) {
    let largest = root
    const left = 2 * root + 1
    const right = 2 * root + 2

    if (left < size) {
      comparisons++
      addStep(
        { [root]: 'min-max', [left]: 'comparing' },
        `Heapify: comparing root arr[${root}] (${arr[root]}) with left child arr[${left}] (${arr[left]})`,
        6,
        'compare'
      )
      if (arr[left] > arr[largest]) {
        largest = left
      }
    }

    if (right < size) {
      comparisons++
      addStep(
        { [largest]: 'min-max', [right]: 'comparing' },
        `Heapify: comparing largest arr[${largest}] (${arr[largest]}) with right child arr[${right}] (${arr[right]})`,
        7,
        'compare'
      )
      if (arr[right] > arr[largest]) {
        largest = right
      }
    }

    if (largest !== root) {
      const temp = arr[root]
      arr[root] = arr[largest]
      arr[largest] = temp
      swaps++

      addStep(
        { [root]: 'swapping', [largest]: 'swapping' },
        `Swapped root arr[${root}] with larger child arr[${largest}] (${arr[root]} < ${arr[largest]})`,
        8,
        'swap'
      )

      heapify(size, largest)
    }
  }

  // Build max heap
  addStep({}, 'Phase 1: Building initial Max-Heap from the array.', 1, 'initial')
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(n, i)
  }

  addStep({}, 'Max-Heap construction complete. Root is the maximum element.', 1, 'initial')

  // Extract elements one by one from heap
  for (let i = n - 1; i > 0; i--) {
    // Swap current root (max) to end
    const temp = arr[0]
    arr[0] = arr[i]
    arr[i] = temp
    swaps++

    sortedIndices.add(i)
    addStep(
      { [0]: 'swapping', [i]: 'sorted' },
      `Extracted max element ${arr[i]} from heap root to index ${i}. Marked as sorted.`,
      3,
      'mark-sorted'
    )

    // Heapify reduced heap
    heapify(i, 0)
  }

  sortedIndices.add(0)
  const allSorted: Record<number, ElementState> = {}
  for (let k = 0; k < n; k++) allSorted[k] = 'sorted'
  steps.push({
    array: [...arr],
    elementStates: allSorted,
    comparisons,
    swaps,
    writes,
    description: `Heap Sort completed! Total comparisons: ${comparisons}, swaps: ${swaps}.`,
    codeLine: 1,
    type: 'complete',
  })

  return steps
}
