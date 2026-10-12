export type DataStructureType = 'stack' | 'queue' | 'linked-list' | 'bst'

export interface DSHistoryEntry {
  id: string
  timestamp: number
  operation: string
  status: 'success' | 'warning' | 'error' | 'info'
  message: string
}

export interface LinkedListNodeData {
  id: string
  value: number
  isHighlighted?: boolean
  isTarget?: boolean
  label?: string
}

export interface BSTNodeData {
  id: string
  value: number
  left: BSTNodeData | null
  right: BSTNodeData | null
  x?: number
  y?: number
  highlighted?: boolean
  isTarget?: boolean
  isCurrent?: boolean
  status?: 'default' | 'visiting' | 'found' | 'deleting' | 'inserted'
}

export type TraversalType = 'inorder' | 'preorder' | 'postorder' | 'levelorder'
