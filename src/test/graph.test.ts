import { describe, it, expect } from 'vitest'
import { generateBFSSteps } from '../algorithms/graph/bfs'
import { generateDFSSteps } from '../algorithms/graph/dfs'
import { GraphEdge, GraphNode } from '../types/graph'

describe('Graph Traversal Correctness (BFS & DFS)', () => {
  const connectedNodes: GraphNode[] = [
    { id: 'A', label: 'A', x: 0, y: 0 },
    { id: 'B', label: 'B', x: 0, y: 0 },
    { id: 'C', label: 'C', x: 0, y: 0 },
    { id: 'D', label: 'D', x: 0, y: 0 },
  ]

  const connectedEdges: GraphEdge[] = [
    { id: 'e1', from: 'A', to: 'B' },
    { id: 'e2', from: 'A', to: 'C' },
    { id: 'e3', from: 'B', to: 'D' },
  ]

  describe('Breadth-First Search (BFS)', () => {
    it('traverses connected graph level by level', () => {
      const steps = generateBFSSteps(connectedNodes, connectedEdges, 'A', false)
      const lastStep = steps[steps.length - 1]
      expect(lastStep.type).toBe('finish')
      expect(lastStep.visitedNodes.sort()).toEqual(['A', 'B', 'C', 'D'])
      // A visits B and C first, then D
      expect(lastStep.traversalOrder).toEqual(['A', 'B', 'C', 'D'])
    })

    it('handles disconnected graphs without crashing', () => {
      const disconnectedNodes: GraphNode[] = [
        { id: 'A', label: 'A', x: 0, y: 0 },
        { id: 'B', label: 'B', x: 0, y: 0 },
        { id: 'X', label: 'X', x: 0, y: 0 },
      ]
      const disconnectedEdges: GraphEdge[] = [{ id: 'e1', from: 'A', to: 'B' }]

      const steps = generateBFSSteps(disconnectedNodes, disconnectedEdges, 'A', false)
      const lastStep = steps[steps.length - 1]
      expect(lastStep.traversalOrder).toEqual(['A', 'B'])
      expect(lastStep.visitedNodes.includes('X')).toBe(false)
    })

    it('handles cyclic graphs without infinite loops', () => {
      const cycleNodes: GraphNode[] = [
        { id: '1', label: '1', x: 0, y: 0 },
        { id: '2', label: '2', x: 0, y: 0 },
        { id: '3', label: '3', x: 0, y: 0 },
      ]
      const cycleEdges: GraphEdge[] = [
        { id: 'c1', from: '1', to: '2' },
        { id: 'c2', from: '2', to: '3' },
        { id: 'c3', from: '3', to: '1' },
      ]

      const steps = generateBFSSteps(cycleNodes, cycleEdges, '1', false)
      const lastStep = steps[steps.length - 1]
      expect(lastStep.traversalOrder.length).toBe(3)
    })

    it('handles single-node graph', () => {
      const singleNode: GraphNode[] = [{ id: 'S', label: 'S', x: 0, y: 0 }]
      const steps = generateBFSSteps(singleNode, [], 'S', false)
      const lastStep = steps[steps.length - 1]
      expect(lastStep.traversalOrder).toEqual(['S'])
    })

    it('handles directed graphs respecting edge direction', () => {
      const directedNodes: GraphNode[] = [
        { id: 'A', label: 'A', x: 0, y: 0 },
        { id: 'B', label: 'B', x: 0, y: 0 },
      ]
      // Directed edge from B -> A
      const directedEdges: GraphEdge[] = [{ id: 'd1', from: 'B', to: 'A' }]

      // Starting from A, B should not be reachable in directed mode
      const steps = generateBFSSteps(directedNodes, directedEdges, 'A', true)
      const lastStep = steps[steps.length - 1]
      expect(lastStep.traversalOrder).toEqual(['A'])
    })
  })

  describe('Depth-First Search (DFS)', () => {
    it('traverses connected graph deeply before backtracking', () => {
      const steps = generateDFSSteps(connectedNodes, connectedEdges, 'A', false)
      const lastStep = steps[steps.length - 1]
      expect(lastStep.type).toBe('finish')
      expect(lastStep.visitedNodes.sort()).toEqual(['A', 'B', 'C', 'D'])
      expect(lastStep.traversalOrder.length).toBe(4)
    })

    it('handles cycles safely via visited set tracking', () => {
      const cycleNodes: GraphNode[] = [
        { id: 'A', label: 'A', x: 0, y: 0 },
        { id: 'B', label: 'B', x: 0, y: 0 },
      ]
      const cycleEdges: GraphEdge[] = [
        { id: 'e1', from: 'A', to: 'B' },
        { id: 'e2', from: 'B', to: 'A' },
      ]

      const steps = generateDFSSteps(cycleNodes, cycleEdges, 'A', false)
      const lastStep = steps[steps.length - 1]
      expect(lastStep.traversalOrder).toEqual(['A', 'B'])
    })
  })
})
