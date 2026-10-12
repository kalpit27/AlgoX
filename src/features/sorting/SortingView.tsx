import React, { useState, useMemo, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import {
  SortingAlgorithmId,
  getSortingSteps,
  SORTING_METADATA,
} from '../../algorithms/sorting'
import { usePlaybackEngine } from '../../hooks/usePlaybackEngine'
import { generateRandomArray } from '../../utils/arrayGenerators'
import { ArrayBarVisualization } from './ArrayBarVisualization'
import { SortingComparisonView } from './SortingComparisonView'
import { CustomArrayModal } from './CustomArrayModal'
import { PlaybackControls } from '../../components/controls/PlaybackControls'
import { CodeExplanationPanel } from '../../components/panels/CodeExplanationPanel'
import { MetricsPanel } from '../../components/panels/MetricsPanel'
import { Tabs } from '../../components/ui/Tabs'
import { Slider } from '../../components/ui/Slider'
import { Button } from '../../components/ui/Button'
import { Card } from '../../components/ui/Card'
import {
  Shuffle,
  SlidersHorizontal,
  Split,
  Eye,
} from 'lucide-react'

const ALGORITHM_TABS: { id: SortingAlgorithmId; label: string }[] = [
  { id: 'bubble', label: 'Bubble Sort' },
  { id: 'selection', label: 'Selection Sort' },
  { id: 'insertion', label: 'Insertion Sort' },
  { id: 'merge', label: 'Merge Sort' },
  { id: 'quick', label: 'Quick Sort' },
  { id: 'heap', label: 'Heap Sort' },
]

export const SortingView: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const initialAlgo = (searchParams.get('algo') as SortingAlgorithmId) || 'bubble'

  const [selectedAlgo, setSelectedAlgo] = useState<SortingAlgorithmId>(initialAlgo)
  const [viewMode, setViewMode] = useState<'single' | 'compare'>('single')
  const [arraySize, setArraySize] = useState<number>(18)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Current working array
  const [array, setArray] = useState<number[]>(() => generateRandomArray(18, 10, 95))

  // Sync URL query when selected algorithm changes
  const handleSelectAlgo = (algoId: SortingAlgorithmId) => {
    setSelectedAlgo(algoId)
    setSearchParams({ algo: algoId })
  }

  // Handle changing array size
  const handleSizeChange = (newSize: number) => {
    setArraySize(newSize)
    setArray(generateRandomArray(newSize, 10, 95))
  }

  const handleGenerateRandom = () => {
    setArray(generateRandomArray(arraySize, 10, 95))
  }

  const handleApplyCustomArray = (newArr: number[]) => {
    setArray(newArr)
    setArraySize(newArr.length)
  }

  // Pre-generate steps snapshots
  const steps = useMemo(() => {
    return getSortingSteps(selectedAlgo, array)
  }, [selectedAlgo, array])

  const engine = usePlaybackEngine({
    steps,
    initialSpeedMs: 300,
  })

  // Keyboard shortcut support (Space for play/pause, Arrow keys for step forward/back)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept when focusing input or modal
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement).tagName)) {
        return
      }
      if (e.code === 'Space') {
        e.preventDefault()
        engine.togglePlay()
      } else if (e.code === 'ArrowRight') {
        e.preventDefault()
        engine.stepForward()
      } else if (e.code === 'ArrowLeft') {
        e.preventDefault()
        engine.stepBackward()
      } else if (e.code === 'KeyR') {
        e.preventDefault()
        engine.reset()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [engine])

  const currentMeta = SORTING_METADATA[selectedAlgo]
  const currentStep = engine.currentStep

  return (
    <div className="flex flex-col gap-6">
      {/* Header & Mode Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1E283D] pb-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
            Sorting Visualizer
            <span className="text-xs px-2 py-0.5 rounded-full font-mono bg-indigo-500/15 text-indigo-300 border border-indigo-500/30 font-medium">
              6 Algorithms
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Compare algorithmic invariants, observe partitioning and comparisons in real-time.
          </p>
        </div>

        {/* Single vs Compare Toggle */}
        <div className="flex items-center gap-1 bg-[#111827] border border-[#252F44] p-1 rounded-xl shrink-0">
          <button
            onClick={() => setViewMode('single')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              viewMode === 'single'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Eye size={14} />
            <span>Single Visualizer</span>
          </button>
          <button
            onClick={() => setViewMode('compare')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              viewMode === 'compare'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Split size={14} />
            <span>Comparison Mode</span>
          </button>
        </div>
      </div>

      {/* Global Toolbar: Array generation & configuration */}
      <Card className="bg-[#151E30] border-[#293449] p-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={handleGenerateRandom}
            icon={<Shuffle size={14} />}
            title="Generate new random array"
          >
            Random Array
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsModalOpen(true)}
            icon={<SlidersHorizontal size={14} />}
            title="Enter custom array or choose distributions"
          >
            Custom Array...
          </Button>
        </div>

        {/* Array size slider */}
        <div className="w-full sm:w-48">
          <Slider
            label="Array Size"
            value={arraySize}
            min={5}
            max={35}
            unit=" items"
            onChange={handleSizeChange}
            disabled={engine.isPlaying}
          />
        </div>
      </Card>

      {/* View Mode Switching */}
      {viewMode === 'compare' ? (
        <SortingComparisonView initialArray={array} />
      ) : (
        <div className="flex flex-col gap-6">
          {/* Algorithm Tabs */}
          <Tabs
            items={ALGORITHM_TABS}
            activeTab={selectedAlgo}
            onChange={handleSelectAlgo}
          />

          {/* Main Visualization Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            {/* Visualizer & Controls (2 Columns) */}
            <div className="lg:col-span-2 flex flex-col gap-4">
              <Card className="flex flex-col gap-4 bg-[#151E30] border-[#293449]">
                <div className="flex items-center justify-between border-b border-[#293449] pb-3">
                  <div>
                    <h2 className="text-base font-bold text-white">
                      {currentMeta.name}
                    </h2>
                    <p className="text-xs text-slate-400">
                      {currentMeta.tagline}
                    </p>
                  </div>
                  <span className="text-[11px] font-mono text-indigo-300 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
                    {currentMeta.category}
                  </span>
                </div>

                {/* Bars Canvas */}
                <ArrayBarVisualization
                  array={currentStep?.array || array}
                  elementStates={currentStep?.elementStates || {}}
                  height={320}
                />

                {/* Metrics */}
                <MetricsPanel
                  comparisons={currentStep?.comparisons || 0}
                  swaps={currentStep?.swaps}
                  writes={currentStep?.writes}
                  size={array.length}
                  status={
                    engine.isCompleted
                      ? 'completed'
                      : engine.isPlaying
                      ? 'running'
                      : engine.currentStepIndex > 0
                      ? 'paused'
                      : 'idle'
                  }
                />

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
              </Card>
            </div>

            {/* Explanation & Pseudocode (1 Column) */}
            <div className="lg:col-span-1">
              <CodeExplanationPanel
                algorithmName={currentMeta.name}
                description={currentMeta.description}
                pseudocode={currentMeta.pseudocode}
                activeLine={currentStep?.codeLine || 0}
                currentDescription={currentStep?.description}
                complexity={currentMeta.complexity}
                isSorting={true}
              />
            </div>
          </div>
        </div>
      )}

      {/* Custom Array Input Modal */}
      <CustomArrayModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onApply={handleApplyCustomArray}
        currentArray={array}
      />
    </div>
  )
}
