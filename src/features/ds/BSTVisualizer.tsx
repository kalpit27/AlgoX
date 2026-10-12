import React, { useState, useMemo } from 'react'
import { Card } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { Badge } from '../../components/ui/Badge'
import {
  BSTNode,
  insertBSTNode,
  searchBST,
  deleteBSTNode,
  inorderTraversal,
  preorderTraversal,
  postorderTraversal,
  levelorderTraversal,
  layoutBST,
  BSTLayoutNode,
} from '../../algorithms/datastructures/bstModel'
import { AlertCircle, Plus, Trash2, Search, Play } from 'lucide-react'

export const BSTVisualizer: React.FC = () => {
  // Prepopulate balanced initial tree: 50 -> (25, 75) -> (15, 35, 65, 85)
  const [root, setRoot] = useState<BSTNode | null>(() => {
    let r: BSTNode | null = null
    const initialVals = [50, 25, 75, 15, 35, 65, 85]
    initialVals.forEach((v) => {
      const res = insertBSTNode(r, v)
      r = res.newRoot
    })
    return r
  })

  const [inputValue, setInputValue] = useState<string>('40')
  const [highlightedNodeIds, setHighlightedNodeIds] = useState<Set<string>>(new Set())
  const [targetFoundId, setTargetFoundId] = useState<string | null>(null)
  const [traversalResult, setTraversalResult] = useState<{ type: string; values: number[] } | null>(null)
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' | 'info' }>({
    text: 'Binary Search Tree initialized with 7 nodes.',
    type: 'info',
  })

  const resetState = () => {
    setHighlightedNodeIds(new Set())
    setTargetFoundId(null)
  }

  const handleInsert = () => {
    resetState()
    const val = Number(inputValue)
    if (isNaN(val) || !Number.isInteger(val)) {
      setMessage({ text: 'Please enter a valid integer to insert.', type: 'error' })
      return
    }

    const res = insertBSTNode(root, val)
    if (!res.success) {
      setMessage({
        text: `Duplicate value ${val} rejected. Standard BSTs maintain strictly unique keys.`,
        type: 'error',
      })
      return
    }

    // Animate path taken down to insertion
    animatePath(res.path, () => {
      setRoot(res.newRoot)
      setTargetFoundId(res.path[res.path.length - 1])
      setMessage({ text: `Successfully inserted ${val} into the BST.`, type: 'success' })
      setInputValue(String(Math.floor(Math.random() * 90) + 10))
      setTimeout(resetState, 1500)
    })
  }

  const handleSearch = () => {
    resetState()
    const val = Number(inputValue)
    if (isNaN(val)) return

    const { path, found } = searchBST(root, val)
    if (path.length === 0) {
      setMessage({ text: 'Tree is empty.', type: 'error' })
      return
    }

    animatePath(path, () => {
      if (found) {
        setTargetFoundId(path[path.length - 1])
        setMessage({ text: `Value ${val} found in BST along path!`, type: 'success' })
      } else {
        setMessage({ text: `Value ${val} not found in the BST.`, type: 'error' })
      }
      setTimeout(resetState, 2000)
    })
  }

  const handleDelete = () => {
    resetState()
    const val = Number(inputValue)
    if (isNaN(val)) return

    const res = deleteBSTNode(root, val)
    if (!res.success) {
      setMessage({ text: `Value ${val} not found to delete.`, type: 'error' })
      return
    }

    animatePath(res.path, () => {
      setRoot(res.newRoot)
      const detail =
        res.deletedType === 'leaf'
          ? '(Case 1: Leaf node deleted)'
          : res.deletedType === 'one-child'
          ? '(Case 2: Node with 1 child bypassed)'
          : '(Case 3: Node with 2 children replaced with in-order successor)'
      setMessage({
        text: `Deleted node ${val} from BST ${detail}.`,
        type: 'success',
      })
      setTimeout(resetState, 1500)
    })
  }

  const animatePath = (path: string[], onComplete?: () => void) => {
    path.forEach((id, index) => {
      setTimeout(() => {
        setHighlightedNodeIds(new Set([id]))
        if (index === path.length - 1 && onComplete) {
          onComplete()
        }
      }, index * 350)
    })
  }

  const handleTraversal = (type: 'inorder' | 'preorder' | 'postorder' | 'levelorder') => {
    resetState()
    let result: { values: number[]; nodeIds: string[] }

    switch (type) {
      case 'inorder':
        result = inorderTraversal(root)
        break
      case 'preorder':
        result = preorderTraversal(root)
        break
      case 'postorder':
        result = postorderTraversal(root)
        break
      case 'levelorder':
        result = levelorderTraversal(root)
        break
    }

    setTraversalResult({ type, values: result.values })
    setMessage({
      text: `${type.toUpperCase()} traversal: [${result.values.join(', ')}]`,
      type: 'info',
    })

    result.nodeIds.forEach((id, index) => {
      setTimeout(() => {
        setHighlightedNodeIds(new Set([id]))
        if (index === result.nodeIds.length - 1) {
          setTimeout(resetState, 1000)
        }
      }, index * 300)
    })
  }

  const handleClear = () => {
    setRoot(null)
    resetState()
    setTraversalResult(null)
    setMessage({ text: 'Tree cleared.', type: 'info' })
  }

  // Compute 2D coordinates for rendering SVG
  const layout = useMemo(() => layoutBST(root, 720, 360), [root])

  // Collect edges and nodes from layout
  const { renderedEdges, renderedNodes } = useMemo(() => {
    const edges: { id: string; x1: number; y1: number; x2: number; y2: number }[] = []
    const nodes: BSTLayoutNode[] = []

    function traverse(node: BSTLayoutNode | null) {
      if (!node) return
      nodes.push(node)
      if (node.left) {
        edges.push({
          id: `${node.id}-${node.left.id}`,
          x1: node.x,
          y1: node.y,
          x2: node.left.x,
          y2: node.left.y,
        })
        traverse(node.left)
      }
      if (node.right) {
        edges.push({
          id: `${node.id}-${node.right.id}`,
          x1: node.x,
          y1: node.y,
          x2: node.right.x,
          y2: node.right.y,
        })
        traverse(node.right)
      }
    }

    traverse(layout)
    return { renderedEdges: edges, renderedNodes: nodes }
  }, [layout])

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Controls & Operations */}
      <Card className="flex flex-col gap-4">
        <div className="border-b border-[#293449] pb-3">
          <h3 className="text-base font-bold text-white">BST Controls</h3>
          <p className="text-xs text-slate-400">
            Binary Search Tree invariant: Left &lt; Root &lt; Right
          </p>
        </div>

        {/* Input */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="bst-node-key-input" className="text-xs font-semibold text-slate-300">Node Key Value:</label>
          <div className="flex gap-2">
            <input
              id="bst-node-key-input"
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="flex-1 bg-[#111827] border border-[#252F44] rounded-lg px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-indigo-500"
              placeholder="e.g. 40"
            />
            <Button variant="primary" size="sm" onClick={handleInsert} icon={<Plus size={14} />}>
              Insert
            </Button>
          </div>
        </div>

        {/* Search & Delete */}
        <div className="flex gap-2">
          <Button variant="secondary" size="sm" onClick={handleSearch} icon={<Search size={14} />} className="flex-1">
            Search
          </Button>
          <Button variant="outline" size="sm" onClick={handleDelete} className="flex-1 text-rose-300 border-rose-500/30">
            Delete
          </Button>
        </div>

        {/* Traversals */}
        <div className="flex flex-col gap-1.5 pt-2 border-t border-[#1E283D]">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Traversals
          </span>
          <div className="grid grid-cols-2 gap-1.5">
            <Button variant="outline" size="xs" onClick={() => handleTraversal('inorder')} icon={<Play size={11} />}>
              In-Order (Sorted)
            </Button>
            <Button variant="outline" size="xs" onClick={() => handleTraversal('preorder')} icon={<Play size={11} />}>
              Pre-Order
            </Button>
            <Button variant="outline" size="xs" onClick={() => handleTraversal('postorder')} icon={<Play size={11} />}>
              Post-Order
            </Button>
            <Button variant="outline" size="xs" onClick={() => handleTraversal('levelorder')} icon={<Play size={11} />}>
              Level-Order (BFS)
            </Button>
          </div>
        </div>

        {/* Traversal Result Output */}
        {traversalResult && (
          <div className="bg-[#111827] border border-[#252F44] p-2.5 rounded-lg text-xs flex flex-col gap-1">
            <span className="text-slate-400 uppercase tracking-wider font-semibold text-[10px]">
              {traversalResult.type} Output:
            </span>
            <span className="font-mono text-indigo-300 font-bold break-all">
              [{traversalResult.values.join(', ')}]
            </span>
          </div>
        )}

        <div className="pt-2 border-t border-[#1E283D]">
          <Button variant="danger" size="xs" onClick={handleClear} icon={<Trash2 size={12} />}>
            Clear Tree
          </Button>
        </div>

        {/* Feedback Banner */}
        <div
          className={`p-3 rounded-lg border text-xs flex items-center gap-2 mt-auto ${
            message.type === 'error'
              ? 'bg-rose-500/10 border-rose-500/30 text-rose-300'
              : message.type === 'success'
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
              : 'bg-indigo-500/10 border-indigo-500/30 text-indigo-300'
          }`}
        >
          <AlertCircle size={15} className="shrink-0" />
          <span>{message.text}</span>
        </div>
      </Card>

      {/* SVG Tree Canvas */}
      <Card className="lg:col-span-2 flex flex-col justify-between p-6 min-h-[420px] bg-[#151E30] border-[#293449]">
        <div className="w-full flex items-center justify-between border-b border-[#293449] pb-3 mb-2">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-white">Hierarchical Tree Structure</span>
            <Badge variant="indigo" size="xs">
              Nodes: {renderedNodes.length}
            </Badge>
          </div>
          <div className="flex items-center gap-1.5">
            <Badge variant="cyan" size="xs">
              Bal: O(log n)
            </Badge>
            <Badge variant="rose" size="xs">
              Skew: O(n)
            </Badge>
          </div>
        </div>

        {/* SVG Container */}
        <div className="w-full h-[360px] bg-[#0E1528] rounded-xl border border-[#222E46] overflow-hidden relative flex items-center justify-center">
          {renderedNodes.length === 0 ? (
            <div className="text-xs text-slate-400 text-center">
              Tree is empty. Insert a node key to begin building the tree.
            </div>
          ) : (
            <svg viewBox="0 0 720 360" className="w-full h-full">
              {/* Edges */}
              {renderedEdges.map((edge) => (
                <line
                  key={edge.id}
                  x1={edge.x1}
                  y1={edge.y1}
                  x2={edge.x2}
                  y2={edge.y2}
                  stroke="#3E4E6D"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              ))}

              {/* Nodes */}
              {renderedNodes.map((node) => {
                const isHighlighted = highlightedNodeIds.has(node.id)
                const isFound = targetFoundId === node.id

                return (
                  <g key={node.id} className="transition-all duration-200">
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r="18"
                      className={`transition-colors duration-200 cursor-pointer ${
                        isFound
                          ? 'fill-emerald-600 stroke-emerald-300 stroke-[3]'
                          : isHighlighted
                          ? 'fill-amber-500 stroke-amber-300 stroke-[3]'
                          : 'fill-[#151E30] stroke-indigo-500 stroke-[2] hover:stroke-sky-400'
                      }`}
                    />
                    <text
                      x={node.x}
                      y={node.y + 5}
                      textAnchor="middle"
                      className="font-mono text-xs font-bold fill-white pointer-events-none select-none"
                    >
                      {node.value}
                    </text>
                  </g>
                )
              })}
            </svg>
          )}
        </div>

        <div className="text-[11px] text-slate-400 mt-2 flex justify-between items-center">
          <span>In-Order Traversal (L, Root, R) always recovers keys in ascending sorted order.</span>
          <span>Max visual depth: 5 levels</span>
        </div>
      </Card>
    </div>
  )
}
