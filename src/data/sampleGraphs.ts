import { GraphEdge, GraphNode } from '../types/graph'

export interface SampleGraphPreset {
  id: string
  name: string
  description: string
  nodes: GraphNode[]
  edges: GraphEdge[]
  isDirected: boolean
  defaultStartNode: string
}

export const SAMPLE_GRAPHS: SampleGraphPreset[] = [
  {
    id: 'standard-network',
    name: 'Classic Network (6 Nodes)',
    description: 'A connected graph featuring cycles and multiple paths.',
    isDirected: false,
    defaultStartNode: 'A',
    nodes: [
      { id: 'A', label: 'A', x: 120, y: 150 },
      { id: 'B', label: 'B', x: 260, y: 80 },
      { id: 'C', label: 'C', x: 260, y: 240 },
      { id: 'D', label: 'D', x: 420, y: 80 },
      { id: 'E', label: 'E', x: 420, y: 240 },
      { id: 'F', label: 'F', x: 560, y: 160 },
    ],
    edges: [
      { id: 'e1', from: 'A', to: 'B', weight: 4 },
      { id: 'e2', from: 'A', to: 'C', weight: 2 },
      { id: 'e3', from: 'B', to: 'C', weight: 1 },
      { id: 'e4', from: 'B', to: 'D', weight: 5 },
      { id: 'e5', from: 'C', to: 'E', weight: 8 },
      { id: 'e6', from: 'D', to: 'E', weight: 2 },
      { id: 'e7', from: 'D', to: 'F', weight: 6 },
      { id: 'e8', from: 'E', to: 'F', weight: 3 },
    ],
  },
  {
    id: 'dag-flow',
    name: 'Directed Acyclic Graph (DAG)',
    description: 'A directed graph with ordered dependency branches.',
    isDirected: true,
    defaultStartNode: '1',
    nodes: [
      { id: '1', label: '1', x: 100, y: 160 },
      { id: '2', label: '2', x: 250, y: 80 },
      { id: '3', label: '3', x: 250, y: 240 },
      { id: '4', label: '4', x: 400, y: 80 },
      { id: '5', label: '5', x: 400, y: 240 },
      { id: '6', label: '6', x: 550, y: 160 },
    ],
    edges: [
      { id: 'de1', from: '1', to: '2' },
      { id: 'de2', from: '1', to: '3' },
      { id: 'de3', from: '2', to: '4' },
      { id: 'de4', from: '3', to: '5' },
      { id: 'de5', from: '2', to: '5' },
      { id: 'de6', from: '4', to: '6' },
      { id: 'de7', from: '5', to: '6' },
    ],
  },
  {
    id: 'disconnected-clusters',
    name: 'Disconnected Graph (2 Components)',
    description: 'Two separate components to demonstrate traversal reachability.',
    isDirected: false,
    defaultStartNode: 'A',
    nodes: [
      { id: 'A', label: 'A', x: 140, y: 120 },
      { id: 'B', label: 'B', x: 260, y: 100 },
      { id: 'C', label: 'C', x: 200, y: 220 },
      { id: 'X', label: 'X', x: 450, y: 130 },
      { id: 'Y', label: 'Y', x: 570, y: 110 },
      { id: 'Z', label: 'Z', x: 510, y: 230 },
    ],
    edges: [
      { id: 'dc1', from: 'A', to: 'B' },
      { id: 'dc2', from: 'B', to: 'C' },
      { id: 'dc3', from: 'A', to: 'C' },
      { id: 'dc4', from: 'X', to: 'Y' },
      { id: 'dc5', from: 'Y', to: 'Z' },
    ],
  },
]
