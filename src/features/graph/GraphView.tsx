import React, { useState, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import {
  GraphAlgorithmType,
  GraphEdge,
  GraphNode,
  getGraphSteps,
  GRAPH_METADATA,
} from '../../algorithms/graph'
import { SAMPLE_GRAPHS } from '../../data/sampleGraphs'
import { usePlaybackEngine } from '../../hooks/usePlaybackEngine'
import { GraphCanvas } from './GraphCanvas'
import { PlaybackControls } from '../../components/controls/PlaybackControls'
import { CodeExplanationPanel } from '../../components/panels/CodeExplanationPanel'
import { Tabs } from '../../components/ui/Tabs'
import { Button } from '../../components/ui/Button'
import { Card } from '../../components/ui/Card'
import { Badge } from '../../components/ui/Badge'
import {
  Plus,
  Trash2,
  GitBranch,
  Network,
} from 'lucide-react'

const ALGORITHM_TABS: { id: GraphAlgorithmType; label: string }[] = [
  { id: 'bfs', label: 'Breadth-First Search (BFS)' },
  { id: 'dfs', label: 'Depth-First Search (DFS)' },
]

export const GraphView: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const initialAlgo = (searchParams.get('algo') as GraphAlgorithmType) || 'bfs'

  const [selectedAlgo, setSelectedAlgo] = useState<GraphAlgorithmType>(initialAlgo)
  const [currentPresetId, setCurrentPresetId] = useState<string>('standard-network')

  // Graph state initialized with preset 0
  const [nodes, setNodes] = useState<GraphNode[]>(SAMPLE_GRAPHS[0].nodes)
  const [edges, setEdges] = useState<GraphEdge[]>(SAMPLE_GRAPHS[0].edges)
  const [isDirected, setIsDirected] = useState<boolean>(SAMPLE_GRAPHS[0].isDirected)
  const [isWeighted, setIsWeighted] = useState<boolean>(true)
  const [startNodeId, setStartNodeId] = useState<string>(SAMPLE_GRAPHS[0].defaultStartNode)

  // Edge creation form state
  const [edgeFrom, setEdgeFrom] = useState<string>(SAMPLE_GRAPHS[0].nodes[0]?.id || '')
  const [edgeTo, setEdgeTo] = useState<string>(SAMPLE_GRAPHS[0].nodes[1]?.id || '')
  const [edgeWeight, setEdgeWeight] = useState<string>('5')

  const handleSelectAlgo = (algo: GraphAlgorithmType) => {
    setSelectedAlgo(algo)
    setSearchParams({ algo })
  }

  const handleApplyPreset = (presetId: string) => {
    const preset = SAMPLE_GRAPHS.find((p) => p.id === presetId)
    if (!preset) return
    setCurrentPresetId(presetId)
    setNodes(preset.nodes)
    setEdges(preset.edges)
    setIsDirected(preset.isDirected)
    setStartNodeId(preset.defaultStartNode)
    if (preset.nodes.length >= 2) {
      setEdgeFrom(preset.nodes[0].id)
      setEdgeTo(preset.nodes[1].id)
    }
  }

  const handleAddNodeAt = (x: number, y: number) => {
    if (nodes.length >= 10) return
    const nextChar = String.fromCharCode(65 + nodes.length) // 'A', 'B', ...
    const id = nodes.some((n) => n.id === nextChar) ? `N${nodes.length + 1}` : nextChar
    const newNode: GraphNode = { id, label: id, x, y }
    setNodes([...nodes, newNode])
  }

  const handleMoveNode = (nodeId: string, x: number, y: number) => {
    setNodes((prev) => prev.map((n) => (n.id === nodeId ? { ...n, x, y } : n)))
  }

  const handleAddEdge = () => {
    if (!edgeFrom || !edgeTo || edgeFrom === edgeTo) return
    // Prevent duplicate edges
    const exists = edges.some(
      (e) =>
        (e.from === edgeFrom && e.to === edgeTo) ||
        (!isDirected && e.from === edgeTo && e.to === edgeFrom)
    )
    if (exists) return

    const newEdge: GraphEdge = {
      id: `e-${Date.now()}`,
      from: edgeFrom,
      to: edgeTo,
      weight: isWeighted ? Number(edgeWeight) || 1 : undefined,
    }
    setEdges([...edges, newEdge])
  }

  const handleRemoveNode = (nodeId: string) => {
    setNodes(nodes.filter((n) => n.id !== nodeId))
    setEdges(edges.filter((e) => e.from !== nodeId && e.to !== nodeId))
    if (startNodeId === nodeId) {
      const remaining = nodes.filter((n) => n.id !== nodeId)
      setStartNodeId(remaining[0]?.id || '')
    }
  }

  const handleClearGraph = () => {
    setNodes([])
    setEdges([])
    setStartNodeId('')
  }

  // Pre-generate graph traversal steps
  const steps = useMemo(() => {
    return getGraphSteps(selectedAlgo, nodes, edges, startNodeId, isDirected)
  }, [selectedAlgo, nodes, edges, startNodeId, isDirected])

  const engine = usePlaybackEngine({
    steps,
    initialSpeedMs: 450,
  })

  const currentMeta = GRAPH_METADATA[selectedAlgo]
  const currentStep = engine.currentStep

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="border-b border-[#1E283D] pb-4">
        <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
          Graph Algorithm Visualizer
          <span className="text-xs px-2 py-0.5 rounded-full font-mono bg-sky-500/15 text-sky-300 border border-sky-500/30 font-medium">
            BFS & DFS Traversal
          </span>
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Explore vertex reachability, edge discovery, and frontier maintenance across directed and undirected topologies.
        </p>
      </div>

      {/* Tabs */}
      <Tabs items={ALGORITHM_TABS} activeTab={selectedAlgo} onChange={handleSelectAlgo} />

      {/* Global Toolbar: Presets & Topology Settings */}
      <Card className="bg-[#151E30] border-[#293449] p-4 flex flex-wrap items-center justify-between gap-4">
        {/* Sample Presets */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5 mr-1">
            <Network size={14} className="text-sky-400" />
            Preset Graph:
          </span>
          {SAMPLE_GRAPHS.map((preset) => (
            <Button
              key={preset.id}
              variant={currentPresetId === preset.id ? 'primary' : 'outline'}
              size="xs"
              onClick={() => handleApplyPreset(preset.id)}
            >
              {preset.name}
            </Button>
          ))}
        </div>

        {/* Directed & Weighted Toggles */}
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={isDirected}
              onChange={(e) => setIsDirected(e.target.checked)}
              className="rounded bg-[#111827] border-[#293449] text-indigo-600 focus:ring-0 cursor-pointer"
            />
            <span>Directed Graph</span>
          </label>

          <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={isWeighted}
              onChange={(e) => setIsWeighted(e.target.checked)}
              className="rounded bg-[#111827] border-[#293449] text-indigo-600 focus:ring-0 cursor-pointer"
            />
            <span>Show Weights</span>
          </label>

          <Button
            variant="danger"
            size="xs"
            onClick={handleClearGraph}
            icon={<Trash2 size={12} />}
          >
            Clear
          </Button>
        </div>
      </Card>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Visualizer & Controls (2 Columns) */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <Card className="flex flex-col gap-4 bg-[#151E30] border-[#293449]">
            {/* Top Bar: Start Node Selector & Frontier status */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#293449] pb-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-slate-300">Start Vertex:</span>
                <select
                  value={startNodeId}
                  onChange={(e) => setStartNodeId(e.target.value)}
                  className="bg-[#111827] border border-[#252F44] text-sky-400 font-mono font-bold text-xs rounded-lg px-2.5 py-1 focus:outline-none focus:border-indigo-500 cursor-pointer"
                >
                  {nodes.map((n) => (
                    <option key={n.id} value={n.id}>
                      Node {n.label}
                    </option>
                  ))}
                </select>
                <Button
                  variant="outline"
                  size="xs"
                  onClick={() => handleRemoveNode(startNodeId)}
                  disabled={nodes.length <= 1}
                  className="text-rose-300 border-rose-500/30 hover:bg-rose-500/10"
                >
                  Delete Vertex
                </Button>
              </div>

              <div className="flex items-center gap-2">
                <Badge variant="indigo" size="xs">
                  Vertices: {nodes.length}
                </Badge>
                <Badge variant="cyan" size="xs">
                  Edges: {edges.length}
                </Badge>
              </div>
            </div>

            {/* Canvas */}
            <GraphCanvas
              nodes={nodes}
              edges={edges}
              isDirected={isDirected}
              isWeighted={isWeighted}
              selectedStartNodeId={startNodeId}
              currentStep={currentStep}
              onNodeClick={(id) => setStartNodeId(id)}
              onCanvasClick={handleAddNodeAt}
              onNodeMove={handleMoveNode}
            />

            {/* Live Data Structure State Display (Queue / Call Stack) */}
            <div className="bg-[#111827] border border-[#252F44] p-3 rounded-xl flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                  <GitBranch size={13} className="text-amber-400" />
                  Active {currentMeta.structureUsed} Frontier:
                </span>
                <span className="text-[11px] font-mono text-slate-400">
                  Visited: {currentStep?.visitedNodes.length || 0} / {nodes.length}
                </span>
              </div>

              {/* Frontier items box */}
              <div className="flex items-center gap-1.5 overflow-x-auto min-h-[32px] p-1 bg-[#0B1020] rounded-lg border border-[#1E283D]">
                {currentStep?.frontier && currentStep.frontier.length > 0 ? (
                  currentStep.frontier.map((nodeId, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-mono text-xs font-bold border border-indigo-500/30 shrink-0"
                    >
                      {nodeId}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-slate-400 italic px-2">Frontier is empty</span>
                )}
              </div>

              {/* Traversal sequence order */}
              {currentStep?.traversalOrder && currentStep.traversalOrder.length > 0 && (
                <div className="text-xs text-slate-300 flex items-center gap-1 pt-1">
                  <span className="text-slate-400 font-semibold text-[11px]">Traversal Path:</span>
                  <span className="font-mono text-emerald-400 font-bold">
                    {currentStep.traversalOrder.join(' → ')}
                  </span>
                </div>
              )}
            </div>

            {/* Playback Controls */}
            <PlaybackControls
              isPlaying={engine.isPlaying}
              isCompleted={engine.isCompleted}
              currentStepIndex={engine.currentStepIndex}
              totalSteps={engine.totalSteps}
              speedMs={engine.speedMs}
              onPlay={engine.play}
              onPause={engine.pause}
              onStepForward={engine.stepForward}
              onStepBackward={engine.stepBackward}
              onReset={engine.reset}
              onJumpToStep={engine.jumpToStep}
              onSpeedChange={engine.setSpeedMs}
            />

            {/* Add Edge Sub-Panel */}
            <div className="bg-[#111827] border border-[#252F44] p-3 rounded-xl flex flex-wrap items-center gap-3 text-xs">
              <span className="font-semibold text-slate-300">Connect Vertices:</span>
              <div className="flex items-center gap-1.5">
                <span className="text-slate-400">From:</span>
                <select
                  value={edgeFrom}
                  onChange={(e) => setEdgeFrom(e.target.value)}
                  className="bg-[#151E30] border border-[#293449] rounded px-2 py-1 text-white font-mono"
                >
                  {nodes.map((n) => (
                    <option key={n.id} value={n.id}>
                      {n.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-1.5">
                <span className="text-slate-400">To:</span>
                <select
                  value={edgeTo}
                  onChange={(e) => setEdgeTo(e.target.value)}
                  className="bg-[#151E30] border border-[#293449] rounded px-2 py-1 text-white font-mono"
                >
                  {nodes.map((n) => (
                    <option key={n.id} value={n.id}>
                      {n.label}
                    </option>
                  ))}
                </select>
              </div>

              {isWeighted && (
                <div className="flex items-center gap-1.5">
                  <span className="text-slate-400">Weight:</span>
                  <input
                    type="number"
                    value={edgeWeight}
                    onChange={(e) => setEdgeWeight(e.target.value)}
                    className="w-14 bg-[#151E30] border border-[#293449] rounded px-2 py-1 text-white font-mono"
                  />
                </div>
              )}

              <Button
                variant="primary"
                size="xs"
                onClick={handleAddEdge}
                icon={<Plus size={12} />}
              >
                Add Edge
              </Button>
            </div>
          </Card>
        </div>

        {/* Algorithm Pseudocode & Explanation (1 Column) */}
        <div className="lg:col-span-1">
          <CodeExplanationPanel
            algorithmName={currentMeta.fullName}
            description={currentMeta.explanation}
            pseudocode={currentMeta.pseudocode}
            activeLine={currentStep?.codeLine || 0}
            currentDescription={currentStep?.description}
            complexity={{
              bestTime: currentMeta.timeComplexity,
              averageTime: currentMeta.timeComplexity,
              worstTime: currentMeta.timeComplexity,
              space: currentMeta.spaceComplexity,
            }}
          />
        </div>
      </div>
    </div>
  )
}
