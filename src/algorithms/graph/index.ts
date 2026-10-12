import { GraphAlgorithmType, GraphEdge, GraphNode, GraphStep } from '../../types/graph'
import { generateBFSSteps } from './bfs'
import { generateDFSSteps } from './dfs'

export * from '../../types/graph'
export * from './meta'
export { generateBFSSteps, generateDFSSteps }

export function getGraphSteps(
  type: GraphAlgorithmType,
  nodes: GraphNode[],
  edges: GraphEdge[],
  startNodeId: string,
  isDirected: boolean
): GraphStep[] {
  if (type === 'bfs') {
    return generateBFSSteps(nodes, edges, startNodeId, isDirected)
  }
  return generateDFSSteps(nodes, edges, startNodeId, isDirected)
}
