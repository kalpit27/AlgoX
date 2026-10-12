export interface GraphAlgorithmMeta {
  id: 'bfs' | 'dfs'
  name: string
  fullName: string
  timeComplexity: string
  spaceComplexity: string
  structureUsed: string
  description: string
  pseudocode: string[]
  explanation: string
}

export const GRAPH_METADATA: Record<'bfs' | 'dfs', GraphAlgorithmMeta> = {
  bfs: {
    id: 'bfs',
    name: 'BFS',
    fullName: 'Breadth-First Search',
    timeComplexity: 'O(V + E)',
    spaceComplexity: 'O(V)',
    structureUsed: 'Queue (FIFO)',
    description:
      'Breadth-First Search explores the graph level by level, visiting all direct neighbors of the current vertex before progressing deeper into the graph.',
    pseudocode: [
      'function BFS(startNode):',
      '  create a queue Q and mark startNode visited',
      '  Q.enqueue(startNode)',
      '  while Q is not empty:',
      '    curr = Q.dequeue()',
      '    for each unvisited neighbor of curr:',
      '      mark neighbor visited',
      '      Q.enqueue(neighbor)',
    ],
    explanation:
      'BFS explores vertices radially from the source. It guarantees the shortest path in unweighted graphs. Because all vertices and edges are inspected once, its runtime is O(V + E).',
  },
  dfs: {
    id: 'dfs',
    name: 'DFS',
    fullName: 'Depth-First Search',
    timeComplexity: 'O(V + E)',
    spaceComplexity: 'O(V)',
    structureUsed: 'Call Stack / Stack (LIFO)',
    description:
      'Depth-First Search traverses as far as possible along each branch before backtracking to explore alternative paths.',
    pseudocode: [
      'function DFS(node):',
      '  mark node as visited',
      '  for each neighbor of node:',
      '    if neighbor is not visited:',
      '      DFS(neighbor)',
    ],
    explanation:
      'DFS dives deeply down reachable edges until no unvisited neighbors remain, then unwinds the call stack. It is fundamental for topological sorting, cycle detection, and strongly connected components.',
  },
}
