import { describe, it, expect } from 'vitest'
import {
  createLLNode,
  insertAtHead,
  insertAtTail,
  insertAtIndex,
  deleteByValue,
  deleteAtIndex,
  searchLinkedList,
} from '../algorithms/datastructures/linkedListModel'
import {
  insertBSTNode,
  searchBST,
  deleteBSTNode,
  inorderTraversal,
  preorderTraversal,
  postorderTraversal,
  levelorderTraversal,
  BSTNode,
} from '../algorithms/datastructures/bstModel'

describe('Data Structures Correctness', () => {
  describe('Singly Linked List Model', () => {
    it('inserts at head and tail correctly', () => {
      let list = [createLLNode(10)]
      list = insertAtHead(list, 5)
      list = insertAtTail(list, 20)

      expect(list.map((n) => n.value)).toEqual([5, 10, 20])
    })

    it('inserts at specified valid index', () => {
      const list = [createLLNode(1), createLLNode(3)]
      const res = insertAtIndex(list, 1, 2)
      expect(res.success).toBe(true)
      expect(res.list.map((n) => n.value)).toEqual([1, 2, 3])
    })

    it('rejects out of bounds index insertion', () => {
      const list = [createLLNode(1)]
      const res = insertAtIndex(list, 5, 99)
      expect(res.success).toBe(false)
      expect(res.list.length).toBe(1)
    })

    it('deletes by value', () => {
      const list = [createLLNode(10), createLLNode(20), createLLNode(30)]
      const res = deleteByValue(list, 20)
      expect(res.success).toBe(true)
      expect(res.list.map((n) => n.value)).toEqual([10, 30])
    })

    it('deletes by index', () => {
      const list = [createLLNode(10), createLLNode(20), createLLNode(30)]
      const res = deleteAtIndex(list, 0)
      expect(res.success).toBe(true)
      expect(res.list.map((n) => n.value)).toEqual([20, 30])
    })

    it('searches for present and absent values', () => {
      const list = [createLLNode(10), createLLNode(20), createLLNode(30)]
      const present = searchLinkedList(list, 20)
      expect(present.foundIndex).toBe(1)

      const absent = searchLinkedList(list, 99)
      expect(absent.foundIndex).toBeNull()
    })
  })

  describe('Binary Search Tree Model', () => {
    const buildSampleTree = (): BSTNode => {
      let root: BSTNode | null = null
      const values = [50, 25, 75, 15, 35, 65, 85]
      values.forEach((v) => {
        const res = insertBSTNode(root, v)
        root = res.newRoot
      })
      return root!
    }

    it('inserts maintaining BST invariant', () => {
      const root = buildSampleTree()
      const { values } = inorderTraversal(root)
      // In-order traversal of a valid BST must always be strictly sorted
      expect(values).toEqual([15, 25, 35, 50, 65, 75, 85])
    })

    it('rejects duplicate keys according to policy', () => {
      const root = buildSampleTree()
      const res = insertBSTNode(root, 25)
      expect(res.success).toBe(false)
    })

    it('searches for present and absent nodes', () => {
      const root = buildSampleTree()
      expect(searchBST(root, 35).found).toBe(true)
      expect(searchBST(root, 99).found).toBe(false)
    })

    it('deletes leaf node (Case 1: 0 children)', () => {
      const root = buildSampleTree()
      const res = deleteBSTNode(root, 15)
      expect(res.success).toBe(true)
      expect(res.deletedType).toBe('leaf')
      const { values } = inorderTraversal(res.newRoot)
      expect(values).toEqual([25, 35, 50, 65, 75, 85])
    })

    it('deletes node with one child (Case 2: 1 child)', () => {
      let root: BSTNode | null = null
      ;[50, 25, 30].forEach((v) => {
        root = insertBSTNode(root, v).newRoot
      })
      const res = deleteBSTNode(root, 25)
      expect(res.success).toBe(true)
      expect(res.deletedType).toBe('one-child')
      const { values } = inorderTraversal(res.newRoot)
      expect(values).toEqual([30, 50])
    })

    it('deletes node with two children (Case 3: replaced with in-order successor)', () => {
      const root = buildSampleTree()
      // Node 25 has two children (15 and 35)
      const res = deleteBSTNode(root, 25)
      expect(res.success).toBe(true)
      expect(res.deletedType).toBe('two-children')
      const { values } = inorderTraversal(res.newRoot)
      expect(values).toEqual([15, 35, 50, 65, 75, 85])
    })

    it('computes pre-order, post-order, and level-order traversals correctly', () => {
      const root = buildSampleTree()
      expect(preorderTraversal(root).values).toEqual([50, 25, 15, 35, 75, 65, 85])
      expect(postorderTraversal(root).values).toEqual([15, 35, 25, 65, 85, 75, 50])
      expect(levelorderTraversal(root).values).toEqual([50, 25, 75, 15, 35, 65, 85])
    })
  })
})
