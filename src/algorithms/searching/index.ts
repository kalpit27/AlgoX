import { SearchAlgorithmId, SearchingStep } from '../../types/searching'
import { generateLinearSearchSteps } from './linearSearch'
import { generateBinarySearchSteps } from './binarySearch'

export * from '../../types/searching'
export * from './meta'
export { generateLinearSearchSteps, generateBinarySearchSteps }

export function getSearchingSteps(algorithm: SearchAlgorithmId, array: number[], target: number): SearchingStep[] {
  if (algorithm === 'binary') {
    return generateBinarySearchSteps(array, target)
  }
  return generateLinearSearchSteps(array, target)
}
