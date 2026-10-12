import { GraphEdge, GraphNode, GraphStep } from '../../types/graph'

export function generateDFSSteps(
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

  const adj = new Map<string, { neighborId: string; edgeId: string }[]>()
  nodes.forEach((n) => adj.set(n.id, []))

  edges.forEach((edge) => {
    adj.get(edge.from)?.push({ neighborId: edge.to, edgeId: edge.id })
    if (!isDirected) {
      adj.get(edge.to)?.push({ neighborId: edge.from, edgeId: edge.id })
    }
  })

  // Sort neighbors deterministically
  adj.forEach((list) => {
    list.sort((a, b) => a.neighborId.localeCompare(b.neighborId))
  })

  const visitedSet = new Set<string>()
  const traversedEdgeSet = new Set<string>()
  const traversalOrder: string[] = []
  const callStack: string[] = []

  steps.push({
    currentNodeId: null,
    currentEdgeId: null,
    visitedNodes: [],
    traversedEdges: [],
    frontier: [],
    traversalOrder: [],
    description: `Initializing Depth-First Search from start node "${startNodeId}".`,
    codeLine: 1,
    type: 'visit',
  })

  function dfsRecursive(u: string, incomingEdgeId: string | null) {
    visitedSet.add(u)
    traversalOrder.push(u)
    callStack.push(u)
    if (incomingEdgeId) {
      traversedEdgeSet.add(incomingEdgeId)
    }

    steps.push({
      currentNodeId: u,
      currentEdgeId: incomingEdgeId,
      visitedNodes: Array.from(visitedSet),
      traversedEdges: Array.from(traversedEdgeSet),
      frontier: [...callStack],
      traversalOrder: [...traversalOrder],
      description: `Visited node "${u}". Pushed "${u}" onto the call stack.`,
      codeLine: 2,
      type: 'push',
    })

    const neighbors = adj.get(u) || []
    for (const { neighborId, edgeId } of neighbors) {
      if (!visitedSet.has(neighborId)) {
        steps.push({
          currentNodeId: u,
          currentEdgeId: edgeId,
          visitedNodes: Array.from(visitedSet),
          traversedEdges: Array.from(traversedEdgeSet),
          frontier: [...callStack],
          traversalOrder: [...traversalOrder],
          description: `Exploring unvisited neighbor "${neighborId}" via edge ${u} -> ${neighborId}.`,
          codeLine: 5,
          type: 'explore-edge',
        })

        dfsRecursive(neighborId, edgeId)

        // After returning from recursive call
        steps.push({
          currentNodeId: u,
          currentEdgeId: null,
          visitedNodes: Array.from(visitedSet),
          traversedEdges: Array.from(traversedEdgeSet),
          frontier: [...callStack],
          traversalOrder: [...traversalOrder],
          description: `Backtracked to node "${u}". Resuming search of remaining neighbors.`,
          codeLine: 3,
          type: 'backtrack',
        })
      } else {
        steps.push({
          currentNodeId: u,
          currentEdgeId: edgeId,
          visitedNodes: Array.from(visitedSet),
          traversedEdges: Array.from(traversedEdgeSet),
          frontier: [...callStack],
          traversalOrder: [...traversalOrder],
          description: `Neighbor "${neighborId}" is already visited. Skipping edge ${u} -> ${neighborId}.`,
          codeLine: 4,
          type: 'explore-edge',
        })
      }
    }

    callStack.pop()
    steps.push({
      currentNodeId: u,
      currentEdgeId: null,
      visitedNodes: Array.from(visitedSet),
      traversedEdges: Array.from(traversedEdgeSet),
      frontier: [...callStack],
      traversalOrder: [...traversalOrder],
      description: `Finished processing node "${u}". Popped from call stack.`,
      codeLine: 1,
      type: 'pop',
    })
  }

  dfsRecursive(startNodeId, null)

  steps.push({
    currentNodeId: null,
    currentEdgeId: null,
    visitedNodes: Array.from(visitedSet),
    traversedEdges: Array.from(traversedEdgeSet),
    frontier: [],
    traversalOrder: [...traversalOrder],
    description: `DFS completed! Visited ${traversalOrder.length} nodes in order: ${traversalOrder.join(' → ')}.`,
    codeLine: 1,
    type: 'finish',
  })

  return steps
}
