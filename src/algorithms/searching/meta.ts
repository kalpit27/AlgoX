import { SearchAlgorithmId, SearchingAlgorithmMeta } from '../../types/searching'

export const SEARCHING_METADATA: Record<SearchAlgorithmId, SearchingAlgorithmMeta> = {
  linear: {
    id: 'linear',
    name: 'Linear Search',
    description:
      'Linear Search sequentially checks each element of the array from left to right until a match is found or the end of the array is reached.',
    requiresSorted: false,
    bestTime: 'O(1)',
    averageTime: 'O(n)',
    worstTime: 'O(n)',
    space: 'O(1)',
    pseudocode: [
      'for i = 0 to n - 1:',
      '  if array[i] == target:',
      '    return i',
      'return -1',
    ],
    explanation:
      'Linear Search works on any arbitrary list without needing sorted input. In the best case, the target is the first element (1 comparison). In the worst case, the target is at the end or absent, requiring n comparisons.',
  },
  binary: {
    id: 'binary',
    name: 'Binary Search',
    description:
      'Binary Search works on a sorted array by repeatedly dividing the search space in half. It compares the target with the middle element and narrows the range accordingly.',
    requiresSorted: true,
    bestTime: 'O(1)',
    averageTime: 'O(log n)',
    worstTime: 'O(log n)',
    space: 'O(1)',
    pseudocode: [
      'low = 0, high = n - 1',
      'while low <= high:',
      '  mid = floor((low + high) / 2)',
      '  if array[mid] == target: return mid',
      '  else if array[mid] < target: low = mid + 1',
      '  else: high = mid - 1',
      'return -1',
    ],
    explanation:
      'Because each comparison discards half of the remaining elements, Binary Search achieves logarithmic O(log n) time. However, the input array must be ordered monotonically beforehand.',
  },
}
