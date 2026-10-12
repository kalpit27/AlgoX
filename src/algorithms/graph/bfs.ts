import { GraphEdge, GraphNode, GraphStep } from '../../types/graph'

export function generateBFSSteps(
  nodes: GraphNode[],
  edges: GraphEdge[],
  startNodeId: string,
  isDirected: boolean
): GraphStep[] {
  const steps: GraphStep[] = []
  if (nodes.length === 0 || !nodes.some((n) => n.id === startNodeId)) {
    return [
      {
        currentNodeId: null,
        currentEdgeId: null,
        visitedNodes: [],
        traversedEdges: [],
        frontier: [],
        traversalOrder: [],
        description: 'Graph is empty or start node is invalid.',
        codeLine: 1,
        type: 'finish',
      },
    ]
  }

  // Build adjacency list: node -> array of { neighborId, edgeId }
  const adj = new Map<string, { neighborId: string; edgeId: string }[]>()
  nodes.forEach((n) => adj.set(n.id, []))

  edges.forEach((edge) => {
    adj.get(edge.from)?.push({ neighborId: edge.to, edgeId: edge.id })
    if (!isDirected) {
      adj.get(edge.to)?.push({ neighborId: edge.from, edgeId: edge.id })
    }
  })

  // Sort neighbors by label/id deterministically
  adj.forEach((list) => {
    list.sort((a, b) => a.neighborId.localeCompare(b.neighborId))
  })

  const visitedSet = new Set<string>()
  const traversedEdgeSet = new Set<string>()
  const traversalOrder: string[] = []
  const queue: string[] = []

  // Initial step
  steps.push({
    currentNodeId: null,
    currentEdgeId: null,
    visitedNodes: [],
    traversedEdges: [],
    frontier: [],
    traversalOrder: [],
    description: `Initializing Breadth-First Search from start node "${startNodeId}".`,
    codeLine: 1,
    type: 'visit',
  })

  // Enqueue start node
  visitedSet.add(startNodeId)
  queue.push(startNodeId)

  steps.push({
    currentNodeId: startNodeId,
    currentEdgeId: null,
    visitedNodes: Array.from(visitedSet),
    traversedEdges: [],
    frontier: [...queue],
    traversalOrder: [],
    description: `Marked start node "${startNodeId}" as visited and enqueued it.`,
    codeLine: 3,
    type: 'enqueue',
  })

  while (queue.length > 0) {
    const curr = queue.shift()!
    traversalOrder.push(curr)

    steps.push({
      currentNodeId: curr,
      currentEdgeId: null,
      visitedNodes: Array.from(visitedSet),
      traversedEdges: Array.from(traversedEdgeSet),
      frontier: [...queue],
      traversalOrder: [...traversalOrder],
      description: `Dequeued node "${curr}" for processing. Inspecting its outgoing neighbors.`,
      codeLine: 5,
      type: 'dequeue',
    })

    const neighbors = adj.get(curr) || []
    for (const { neighborId, edgeId } of neighbors) {
      if (!visitedSet.has(neighborId)) {
        visitedSet.add(neighborId)
        traversedEdgeSet.add(edgeId)
        queue.push(neighborId)

        steps.push({
          currentNodeId: curr,
          currentEdgeId: edgeId,
          visitedNodes: Array.from(visitedSet),
          traversedEdges: Array.from(traversedEdgeSet),
          frontier: [...queue],
          traversalOrder: [...traversalOrder],
          description: `Discovered unvisited neighbor "${neighborId}" via edge ${curr} -> ${neighborId}. Enqueued neighbor.`,
          codeLine: 8,
          type: 'enqueue',
        })
      } else {
        steps.push({
          currentNodeId: curr,
          currentEdgeId: edgeId,
          visitedNodes: Array.from(visitedSet),
          traversedEdges: Array.from(traversedEdgeSet),
          frontier: [...queue],
          traversalOrder: [...traversalOrder],
          description: `Neighbor "${neighborId}" is already visited. Skipping edge ${curr} -> ${neighborId}.`,
          codeLine: 6,
          type: 'explore-edge',
        })
      }
    }
  }

  // Finished
  steps.push({
    currentNodeId: null,
    currentEdgeId: null,
    visitedNodes: Array.from(visitedSet),
    traversedEdges: Array.from(traversedEdgeSet),
    frontier: [],
    traversalOrder: [...traversalOrder],
    description: `BFS completed! Visited ${traversalOrder.length} nodes in order: ${traversalOrder.join(' → ')}.`,
    codeLine: 1,
    type: 'finish',
  })

  return steps
}
