import React, { useRef, useState } from 'react'
import { GraphEdge, GraphNode, GraphStep } from '../../types/graph'
import { Legend } from '../../components/ui/Legend'

export interface GraphCanvasProps {
  nodes: GraphNode[]
  edges: GraphEdge[]
  isDirected: boolean
  isWeighted: boolean
  selectedStartNodeId: string
  currentStep: GraphStep | null
  onNodeClick?: (nodeId: string) => void
  onCanvasClick?: (x: number, y: number) => void
  onNodeMove?: (nodeId: string, x: number, y: number) => void
  className?: string
}

export const GraphCanvas: React.FC<GraphCanvasProps> = ({
  nodes,
  edges,
  isDirected,
  isWeighted,
  selectedStartNodeId,
  currentStep,
  onNodeClick,
  onCanvasClick,
  onNodeMove,
  className = '',
}) => {
  const svgRef = useRef<SVGSVGElement | null>(null)
  const [draggingNodeId, setDraggingNodeId] = useState<string | null>(null)

  const visitedSet = new Set(currentStep?.visitedNodes || [])
  const traversedEdgeSet = new Set(currentStep?.traversedEdges || [])
  const currentNodeId = currentStep?.currentNodeId
  const currentEdgeId = currentStep?.currentEdgeId

  // Node position map
  const nodeMap = new Map<string, GraphNode>()
  nodes.forEach((n) => nodeMap.set(n.id, n))

  const handleMouseDown = (e: React.MouseEvent, nodeId: string) => {
    e.stopPropagation()
    setDraggingNodeId(nodeId)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!draggingNodeId || !svgRef.current || !onNodeMove) return
    const rect = svgRef.current.getBoundingClientRect()
    // Calculate SVG coordinate scale
    const svgWidth = 700
    const svgHeight = 400
    const scaleX = svgWidth / rect.width
    const scaleY = svgHeight / rect.height

    const x = Math.max(30, Math.min(svgWidth - 30, Math.round((e.clientX - rect.left) * scaleX)))
    const y = Math.max(30, Math.min(svgHeight - 30, Math.round((e.clientY - rect.top) * scaleY)))

    onNodeMove(draggingNodeId, x, y)
  }

  const handleMouseUp = () => {
    setDraggingNodeId(null)
  }

  const handleSvgClick = (e: React.MouseEvent) => {
    if (!onCanvasClick || !svgRef.current) return
    const rect = svgRef.current.getBoundingClientRect()
    const svgWidth = 700
    const svgHeight = 400
    const scaleX = svgWidth / rect.width
    const scaleY = svgHeight / rect.height

    const x = Math.round((e.clientX - rect.left) * scaleX)
    const y = Math.round((e.clientY - rect.top) * scaleY)
    onCanvasClick(x, y)
  }

  const legendItems = [
    { label: 'Unvisited', colorClass: 'bg-indigo-600/40' },
    { label: 'Current Visiting', colorClass: 'bg-amber-400' },
    { label: 'Visited in Traversal', colorClass: 'bg-emerald-500' },
    { label: 'Traversed Edge', colorClass: 'bg-emerald-400' },
    { label: 'Start Node', colorClass: 'bg-sky-400' },
  ]

  return (
    <div className={`flex flex-col gap-3 w-full ${className}`}>
      <div
        className="w-full bg-[#0E1528] border border-[#222E46] rounded-xl overflow-hidden relative"
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        <svg
          ref={svgRef}
          viewBox="0 0 700 400"
          className="w-full h-[380px] cursor-crosshair select-none"
          onClick={handleSvgClick}
        >
          {/* Arrowhead marker for directed graphs */}
          <defs>
            <marker
              id="arrow-default"
              viewBox="0 0 10 10"
              refX="22"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 1 L 10 5 L 0 9 z" fill="#4B5E80" />
            </marker>
            <marker
              id="arrow-traversed"
              viewBox="0 0 10 10"
              refX="22"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 1 L 10 5 L 0 9 z" fill="#34D399" />
            </marker>
            <marker
              id="arrow-current"
              viewBox="0 0 10 10"
              refX="22"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 1 L 10 5 L 0 9 z" fill="#FBBF24" />
            </marker>
          </defs>

          {/* Edges */}
          {edges.map((edge) => {
            const u = nodeMap.get(edge.from)
            const v = nodeMap.get(edge.to)
            if (!u || !v) return null

            const isTraversed = traversedEdgeSet.has(edge.id)
            const isCurrent = currentEdgeId === edge.id

            const strokeColor = isCurrent
              ? '#FBBF24'
              : isTraversed
              ? '#34D399'
              : '#334155'
            const strokeWidth = isCurrent || isTraversed ? 3.5 : 2

            const markerId = isDirected
              ? isCurrent
                ? 'url(#arrow-current)'
                : isTraversed
                ? 'url(#arrow-traversed)'
                : 'url(#arrow-default)'
              : undefined

            const midX = Math.round((u.x + v.x) / 2)
            const midY = Math.round((u.y + v.y) / 2)

            return (
              <g key={edge.id}>
                <line
                  x1={u.x}
                  y1={u.y}
                  x2={v.x}
                  y2={v.y}
                  stroke={strokeColor}
                  strokeWidth={strokeWidth}
                  strokeLinecap="round"
                  markerEnd={markerId}
                />
                {isWeighted && edge.weight !== undefined && (
                  <g>
                    <rect
                      x={midX - 11}
                      y={midY - 10}
                      width={22}
                      height={18}
                      rx={4}
                      fill="#0B1020"
                      stroke="#2E3C57"
                      strokeWidth={1}
                    />
                    <text
                      x={midX}
                      y={midY + 3}
                      textAnchor="middle"
                      className="font-mono text-[10px] font-bold fill-sky-400 select-none pointer-events-none"
                    >
                      {edge.weight}
                    </text>
                  </g>
                )}
              </g>
            )
          })}

          {/* Nodes */}
          {nodes.map((node) => {
            const isCurrent = currentNodeId === node.id
            const isVisited = visitedSet.has(node.id)
            const isStart = selectedStartNodeId === node.id

            const fillColor = isCurrent
              ? '#F59E0B'
              : isVisited
              ? '#10B981'
              : '#1E293B'

            const strokeColor = isCurrent
              ? '#FDE68A'
              : isVisited
              ? '#A7F3D0'
              : isStart
              ? '#38BDF8'
              : '#6366F1'

            const strokeWidth = isCurrent || isStart ? 3 : 2

            return (
              <g
                key={node.id}
                onMouseDown={(e) => handleMouseDown(e, node.id)}
                onClick={(e) => {
                  e.stopPropagation()
                  onNodeClick?.(node.id)
                }}
                className="cursor-move select-none"
              >
                <circle
                  cx={node.x}
                  cy={node.y}
                  r="20"
                  fill={fillColor}
                  stroke={strokeColor}
                  strokeWidth={strokeWidth}
                  className="transition-colors duration-150"
                />
                <text
                  x={node.x}
                  y={node.y + 5}
                  textAnchor="middle"
                  className="font-mono text-xs font-bold fill-white pointer-events-none"
                >
                  {node.label}
                </text>
                {isStart && (
                  <text
                    x={node.x}
                    y={node.y - 25}
                    textAnchor="middle"
                    className="font-mono text-[9px] font-bold fill-sky-400 pointer-events-none"
                  >
                    START
                  </text>
                )}
              </g>
            )
          })}
        </svg>

        {/* Tip text overlay */}
        <div className="absolute bottom-2 left-3 text-[10px] text-slate-400 bg-black/60 px-2 py-1 rounded backdrop-blur-xs select-none">
          Click canvas to add node • Drag nodes to reposition • Click node to set start node
        </div>
      </div>

      <Legend items={legendItems} />
    </div>
  )
}
