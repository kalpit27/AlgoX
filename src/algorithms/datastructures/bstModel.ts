export interface BSTNode {
  id: string
  value: number
  left: BSTNode | null
  right: BSTNode | null
}

export interface BSTLayoutNode {
  id: string
  value: number
  x: number
  y: number
  left: BSTLayoutNode | null
  right: BSTLayoutNode | null
}

let nextId = 1
export function createBSTNode(value: number): BSTNode {
  return {
    id: `bst-node-${nextId++}-${Date.now()}`,
    value,
    left: null,
    right: null,
  }
}

// Deep clone a BST
export function cloneBST(root: BSTNode | null): BSTNode | null {
  if (!root) return null
  return {
    id: root.id,
    value: root.value,
    left: cloneBST(root.left),
    right: cloneBST(root.right),
  }
}

// Insert into BST (returns updated root, or null if duplicate disallowed)
export function insertBSTNode(
  root: BSTNode | null,
  value: number
): { newRoot: BSTNode; path: string[]; success: boolean } {
  const path: string[] = []

  if (!root) {
    const newNode = createBSTNode(value)
    return { newRoot: newNode, path: [newNode.id], success: true }
  }

  const newRoot = cloneBST(root)!
  let curr: BSTNode | null = newRoot

  while (curr) {
    path.push(curr.id)
    if (value === curr.value) {
      return { newRoot, path, success: false } // duplicate rejected
    }
    if (value < curr.value) {
      if (!curr.left) {
        const newNode = createBSTNode(value)
        curr.left = newNode
        path.push(newNode.id)
        return { newRoot, path, success: true }
      }
      curr = curr.left
    } else {
      if (!curr.right) {
        const newNode = createBSTNode(value)
        curr.right = newNode
        path.push(newNode.id)
        return { newRoot, path, success: true }
      }
      curr = curr.right
    }
  }

  return { newRoot, path, success: true }
}

// Search in BST (returns visited path, and whether found)
export function searchBST(
  root: BSTNode | null,
  target: number
): { path: string[]; found: boolean } {
  const path: string[] = []
  let curr = root

  while (curr) {
    path.push(curr.id)
    if (curr.value === target) {
      return { path, found: true }
    }
    if (target < curr.value) {
      curr = curr.left
    } else {
      curr = curr.right
    }
  }

  return { path, found: false }
}

// Delete from BST (supports 0, 1, 2 children)
export function deleteBSTNode(
  root: BSTNode | null,
  value: number
): { newRoot: BSTNode | null; path: string[]; success: boolean; deletedType?: 'leaf' | 'one-child' | 'two-children' } {
  const path: string[] = []
  let deleted = false
  let deletedType: 'leaf' | 'one-child' | 'two-children' | undefined

  function deleteRecursive(node: BSTNode | null, val: number): BSTNode | null {
    if (!node) return null

    path.push(node.id)

    if (val < node.value) {
      node.left = deleteRecursive(node.left, val)
      return node
    } else if (val > node.value) {
      node.right = deleteRecursive(node.right, val)
      return node
    } else {
      deleted = true
      // Preserve the classification of the primary target node being deleted
      if (!deletedType) {
        if (!node.left && !node.right) {
          deletedType = 'leaf'
        } else if (!node.left || !node.right) {
          deletedType = 'one-child'
        } else {
          deletedType = 'two-children'
        }
      }

      // Case 1: Leaf node (0 children)
      if (!node.left && !node.right) {
        return null
      }
      // Case 2: One child (only right child)
      if (!node.left) {
        return node.right
      }
      // Case 2: One child (only left child)
      if (!node.right) {
        return node.left
      }
      // Case 3: Two children
      // Find inorder successor (smallest value in right subtree)
      let successor = node.right
      while (successor.left) {
        successor = successor.left
      }
      node.value = successor.value
      node.right = deleteRecursive(node.right, successor.value)
      return node
    }
  }

  const cloned = cloneBST(root)
  const newRoot = deleteRecursive(cloned, value)

  return { newRoot, path, success: deleted, deletedType }
}

// In-order traversal (Left, Root, Right)
export function inorderTraversal(root: BSTNode | null): { values: number[]; nodeIds: string[] } {
  const values: number[] = []
  const nodeIds: string[] = []

  function traverse(node: BSTNode | null) {
    if (!node) return
    traverse(node.left)
    values.push(node.value)
    nodeIds.push(node.id)
    traverse(node.right)
  }

  traverse(root)
  return { values, nodeIds }
}

// Pre-order traversal (Root, Left, Right)
export function preorderTraversal(root: BSTNode | null): { values: number[]; nodeIds: string[] } {
  const values: number[] = []
  const nodeIds: string[] = []

  function traverse(node: BSTNode | null) {
    if (!node) return
    values.push(node.value)
    nodeIds.push(node.id)
    traverse(node.left)
    traverse(node.right)
  }

  traverse(root)
  return { values, nodeIds }
}

// Post-order traversal (Left, Right, Root)
export function postorderTraversal(root: BSTNode | null): { values: number[]; nodeIds: string[] } {
  const values: number[] = []
  const nodeIds: string[] = []

  function traverse(node: BSTNode | null) {
    if (!node) return
    traverse(node.left)
    traverse(node.right)
    values.push(node.value)
    nodeIds.push(node.id)
  }

  traverse(root)
  return { values, nodeIds }
}

// Level-order traversal (BFS)
export function levelorderTraversal(root: BSTNode | null): { values: number[]; nodeIds: string[] } {
  const values: number[] = []
  const nodeIds: string[] = []
  if (!root) return { values, nodeIds }

  const queue: BSTNode[] = [root]
  while (queue.length > 0) {
    const node = queue.shift()!
    values.push(node.value)
    nodeIds.push(node.id)
    if (node.left) queue.push(node.left)
    if (node.right) queue.push(node.right)
  }

  return { values, nodeIds }
}

// Compute tree layout coordinates (x, y) for responsive SVG rendering
export function layoutBST(root: BSTNode | null, width = 720, height = 360): BSTLayoutNode | null {
  if (!root) return null

  function getDepth(node: BSTNode | null): number {
    if (!node) return 0
    return 1 + Math.max(getDepth(node.left), getDepth(node.right))
  }

  const depth = getDepth(root)
  const verticalSpacing = Math.min(70, Math.floor((height - 70) / Math.max(1, depth)))

  function layoutHelper(
    node: BSTNode | null,
    level: number,
    leftBound: number,
    rightBound: number
  ): BSTLayoutNode | null {
    if (!node) return null

    const x = Math.round((leftBound + rightBound) / 2)
    const y = 45 + level * verticalSpacing

    return {
      id: node.id,
      value: node.value,
      x,
      y,
      left: layoutHelper(node.left, level + 1, leftBound, x),
      right: layoutHelper(node.right, level + 1, x, rightBound),
    }
  }

  return layoutHelper(root, 0, 30, width - 30)
}
