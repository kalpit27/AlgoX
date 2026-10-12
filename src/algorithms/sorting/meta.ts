import { SortingAlgorithmId, SortingAlgorithmMeta } from '../../types/sorting'

export const SORTING_METADATA: Record<SortingAlgorithmId, SortingAlgorithmMeta> = {
  bubble: {
    id: 'bubble',
    name: 'Bubble Sort',
    category: 'Comparison Sort',
    tagline: 'Repeatedly step through the list, compare adjacent pairs, and swap out-of-order elements.',
    description:
      'Bubble Sort is an elementary comparison-based sorting algorithm. Adjacent items are compared, and if the left item exceeds the right item, they swap positions. After each pass, the largest remaining unsorted element "bubbles up" to its correct position at the end.',
    complexity: {
      bestTime: 'O(n)',
      averageTime: 'O(n²)',
      worstTime: 'O(n²)',
      space: 'O(1)',
      stable: true,
      inPlace: true,
    },
    pseudocode: [
      'for i = 0 to n - 1:',
      '  swapped = false',
      '  for j = 0 to n - i - 2:',
      '    if array[j] > array[j + 1]:',
      '      swap(array[j], array[j + 1])',
      '      swapped = true',
      '  if not swapped: break',
    ],
    explanation:
      'Bubble Sort checks adjacent items step by step. If early termination with a swapped flag is used, an already sorted array completes in O(n) time. However, due to repeated quadratic adjacent swaps, it is inefficient on large datasets.',
  },
  selection: {
    id: 'selection',
    name: 'Selection Sort',
    category: 'Comparison Sort',
    tagline: 'Repeatedly select the minimum unsorted element and swap it into its sorted position.',
    description:
      'Selection Sort divides the array into a sorted subarray and an unsorted subarray. In each pass, it scans the entire unsorted region to locate the minimum element, and then performs a single swap to place it at the boundary of the sorted region.',
    complexity: {
      bestTime: 'O(n²)',
      averageTime: 'O(n²)',
      worstTime: 'O(n²)',
      space: 'O(1)',
      stable: false,
      inPlace: true,
    },
    pseudocode: [
      'for i = 0 to n - 1:',
      '  minIdx = i',
      '  for j = i + 1 to n - 1:',
      '    if array[j] < array[minIdx]:',
      '      minIdx = j',
      '  if minIdx != i:',
      '    swap(array[i], array[minIdx])',
    ],
    explanation:
      'Selection sort always makes O(n²) comparisons regardless of initial ordering because it must scan the entire remainder to confirm the minimum. Its advantage is minimizing write operations to at most n - 1 swaps.',
  },
  insertion: {
    id: 'insertion',
    name: 'Insertion Sort',
    category: 'Comparison Sort',
    tagline: 'Build the sorted list one item at a time by shifting larger elements rightward.',
    description:
      'Insertion Sort iterates through the array, consuming one element per repetition, and inserts it into its correct location within the already sorted prefix by shifting greater elements to the right.',
    complexity: {
      bestTime: 'O(n)',
      averageTime: 'O(n²)',
      worstTime: 'O(n²)',
      space: 'O(1)',
      stable: true,
      inPlace: true,
    },
    pseudocode: [
      'for i = 1 to n - 1:',
      '  key = array[i]',
      '  j = i - 1',
      '  while j >= 0 and array[j] > key:',
      '    array[j + 1] = array[j]',
      '    j = j - 1',
      '  array[j + 1] = key',
    ],
    explanation:
      'Insertion sort performs exceptionally well on small or nearly sorted lists with linear O(n) best-case complexity. It is adaptive, stable, and in-place, making it widely used as the base case in hybrid algorithms like Timsort.',
  },
  merge: {
    id: 'merge',
    name: 'Merge Sort',
    category: 'Divide & Conquer',
    tagline: 'Divide the unsorted list into halves, sort them recursively, and merge the sorted halves.',
    description:
      'Merge Sort is a classic divide-and-conquer algorithm. It divides the input array into two equal halves, sorts each half recursively, and then cleanly merges the two sorted halves back together into a combined sorted array.',
    complexity: {
      bestTime: 'O(n log n)',
      averageTime: 'O(n log n)',
      worstTime: 'O(n log n)',
      space: 'O(n)',
      stable: true,
      inPlace: false,
    },
    pseudocode: [
      'function mergeSort(arr, left, right):',
      '  if left >= right: return',
      '  mid = (left + right) / 2',
      '  mergeSort(arr, left, mid)',
      '  mergeSort(arr, mid + 1, right)',
      '  merge(arr, left, mid, right)',
    ],
    explanation:
      'Merge sort guarantees O(n log n) performance even in the worst-case scenario. It requires O(n) auxiliary memory to hold elements during the merge phase. Because equal elements preserve relative order, it is stable.',
  },
  quick: {
    id: 'quick',
    name: 'Quick Sort',
    category: 'Divide & Conquer',
    tagline: 'Partition the array around a chosen pivot, then sort the partitions recursively.',
    description:
      'Quick Sort selects a pivot element and partitions the remaining elements into two sub-arrays according to whether they are less than or greater than the pivot. The sub-arrays are then sorted recursively in-place.',
    complexity: {
      bestTime: 'O(n log n)',
      averageTime: 'O(n log n)',
      worstTime: 'O(n²)',
      space: 'O(log n)',
      stable: false,
      inPlace: true,
    },
    pseudocode: [
      'function quickSort(arr, low, high):',
      '  if low < high:',
      '    p = partition(arr, low, high)',
      '    quickSort(arr, low, p - 1)',
      '    quickSort(arr, p + 1, high)',
      'function partition(arr, low, high):',
      '  pivot = arr[high], i = low',
      '  for j = low to high - 1:',
      '    if arr[j] < pivot: swap(arr[i++], arr[j])',
      '  swap(arr[i], arr[high]); return i',
    ],
    explanation:
      'Quick Sort is typically the fastest in-place comparison sort in practice because of low constant factors and excellent cache locality. Worst case O(n²) occurs when partitions are extremely unbalanced (e.g. sorted input with end pivot).',
  },
  heap: {
    id: 'heap',
    name: 'Heap Sort',
    category: 'Comparison Sort',
    tagline: 'Build a Max-Heap from the array, then repeatedly extract the maximum element to the end.',
    description:
      'Heap Sort transforms the input array into a binary max-heap. It repeatedly extracts the root (the maximum element) by swapping it with the last unsorted element, decreases the heap size, and calls heapify to restore the heap property.',
    complexity: {
      bestTime: 'O(n log n)',
      averageTime: 'O(n log n)',
      worstTime: 'O(n log n)',
      space: 'O(1)',
      stable: false,
      inPlace: true,
    },
    pseudocode: [
      'buildMaxHeap(arr)',
      'for i = n - 1 down to 1:',
      '  swap(arr[0], arr[i])',
      '  heapify(arr, 0, i)',
      'function heapify(arr, root, size):',
      '  largest = root, l = 2*root + 1, r = 2*root + 2',
      '  if l < size and arr[l] > arr[largest]: largest = l',
      '  if r < size and arr[r] > arr[largest]: largest = r',
      '  if largest != root: swap and heapify',
    ],
    explanation:
      'Heap Sort combines the O(n log n) worst-case time guarantee of Merge Sort with the O(1) auxiliary space advantage of Selection/Insertion Sort. It is an in-place but unstable sorting algorithm.',
  },
}
