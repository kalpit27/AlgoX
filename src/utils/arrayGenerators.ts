export function generateRandomArray(size: number, min = 5, max = 100): number[] {
  const result: number[] = []
  for (let i = 0; i < size; i++) {
    result.push(Math.floor(Math.random() * (max - min + 1)) + min)
  }
  return result
}

export function generateSortedArray(size: number, min = 5, step = 4): number[] {
  const result: number[] = []
  let current = min
  for (let i = 0; i < size; i++) {
    result.push(current)
    current += Math.floor(Math.random() * step) + 2
  }
  return result
}

export function generateReverseArray(size: number, _max = 100, step = 4): number[] {
  const sorted = generateSortedArray(size, 5, step)
  return sorted.reverse()
}

export function generateNearlySortedArray(size: number): number[] {
  const array = generateSortedArray(size, 10, 4)
  const swaps = Math.max(1, Math.floor(size / 6))
  for (let s = 0; s < swaps; s++) {
    const i = Math.floor(Math.random() * (size - 1))
    const j = i + 1
    const temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }
  return array
}

export function generateFewUniqueArray(size: number): number[] {
  const uniquePool = [15, 35, 60, 85]
  const result: number[] = []
  for (let i = 0; i < size; i++) {
    const chosen = uniquePool[Math.floor(Math.random() * uniquePool.length)]
    result.push(chosen)
  }
  return result
}
