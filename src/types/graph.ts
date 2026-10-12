export interface GraphNode {
  id: string
  label: string
  x: number
  y: number
}

export interface GraphEdge {
  id: string
  from: string
  to: string
  weight?: number
  isDirected?: boolean
}

export interface GraphStep {
  currentNodeId: string | null
  currentEdgeId: string | null
  visitedNodes: string[]
  traversedEdges: string[]
  frontier: string[] // Queue for BFS, Stack for DFS
  traversalOrder: string[]
  description: string
  codeLine: number
  type: 'visit' | 'explore-edge' | 'backtrack' | 'enqueue' | 'push' | 'dequeue' | 'pop' | 'finish'
}

export type GraphAlgorithmType = 'bfs' | 'dfs'
