import React, { useState, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import {
  SearchAlgorithmId,
  getSearchingSteps,
  SEARCHING_METADATA,
} from '../../algorithms/searching'
import { usePlaybackEngine } from '../../hooks/usePlaybackEngine'
import { generateRandomArray, generateSortedArray } from '../../utils/arrayGenerators'
import { SearchArrayVisualization } from './SearchArrayVisualization'
import { PlaybackControls } from '../../components/controls/PlaybackControls'
import { CodeExplanationPanel } from '../../components/panels/CodeExplanationPanel'
import { MetricsPanel } from '../../components/panels/MetricsPanel'
import { Tabs } from '../../components/ui/Tabs'
import { Button } from '../../components/ui/Button'
import { Card } from '../../components/ui/Card'
import { Badge } from '../../components/ui/Badge'
import { CustomArrayModal } from '../sorting/CustomArrayModal'
import {
  Shuffle,
  SlidersHorizontal,
  ArrowUpDown,
  Search,
  AlertCircle,
} from 'lucide-react'

const SEARCH_TABS: { id: SearchAlgorithmId; label: string }[] = [
  { id: 'linear', label: 'Linear Search' },
  { id: 'binary', label: 'Binary Search' },
]

export const SearchingView: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const initialAlgo = (searchParams.get('algo') as SearchAlgorithmId) || 'linear'

  const [selectedAlgo, setSelectedAlgo] = useState<SearchAlgorithmId>(initialAlgo)
  const [array, setArray] = useState<number[]>(() =>
    initialAlgo === 'binary' ? generateSortedArray(15, 6, 6) : generateRandomArray(15, 10, 95)
  )
  const [target, setTarget] = useState<number>(() => array[Math.floor(array.length / 2)] ?? 42)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const isSorted = useMemo(() => {
    for (let i = 0; i < array.length - 1; i++) {
      if (array[i] > array[i + 1]) return false
    }
    return true
  }, [array])

  const handleSelectAlgo = (id: SearchAlgorithmId) => {
    setSelectedAlgo(id)
    setSearchParams({ algo: id })
    // If switching to Binary search and array is unsorted, sort it automatically
    if (id === 'binary' && !isSorted) {
      setArray([...array].sort((a, b) => a - b))
    }
  }

  const handleSortArray = () => {
    setArray([...array].sort((a, b) => a - b))
  }

  const handleRandomize = () => {
    const newArr =
      selectedAlgo === 'binary'
        ? generateSortedArray(15, 6, 6)
        : generateRandomArray(15, 10, 95)
    setArray(newArr)
    // Pick an existing element or nearby value as target
    setTarget(newArr[Math.floor(Math.random() * newArr.length)])
  }

  const handlePickRandomTarget = () => {
    if (array.length === 0) return
    const randomExisting = array[Math.floor(Math.random() * array.length)]
    setTarget(randomExisting)
  }

  const handlePickAbsentTarget = () => {
    // Pick a number guaranteed not in array
    let candidate = 999
    while (array.includes(candidate)) {
      candidate--
    }
    setTarget(candidate)
  }

  const steps = useMemo(() => {
    return getSearchingSteps(selectedAlgo, array, target)
  }, [selectedAlgo, array, target])

  const engine = usePlaybackEngine({
    steps,
    initialSpeedMs: 400,
  })

  const currentMeta = SEARCHING_METADATA[selectedAlgo]
  const currentStep = engine.currentStep

  return (
    <div className="flex flex-col gap-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1E283D] pb-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
            Searching Visualizer
            <span className="text-xs px-2 py-0.5 rounded-full font-mono bg-sky-500/15 text-sky-300 border border-sky-500/30 font-medium">
              Linear & Binary Search
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Observe how search spaces are inspected sequentially vs. halved logarithmically.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <Tabs
        items={SEARCH_TABS}
        activeTab={selectedAlgo}
        onChange={handleSelectAlgo}
      />

      {/* Binary search unsorted warning banner */}
      {selectedAlgo === 'binary' && !isSorted && (
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-3.5 flex items-center justify-between gap-3 text-xs text-amber-200">
          <div className="flex items-center gap-2">
            <AlertCircle size={16} className="text-amber-400 shrink-0" />
            <span>
              <strong>Binary Search invariant requirement:</strong> The array must be sorted monotonically. Currently, the array is unsorted.
            </span>
          </div>
          <Button
            variant="secondary"
            size="xs"
            onClick={handleSortArray}
            icon={<ArrowUpDown size={12} />}
            className="bg-amber-500/20 text-amber-200 border-amber-500/40 hover:bg-amber-500/30 shrink-0"
          >
            Sort Array Now
          </Button>
        </div>
      )}

      {/* Toolbar: Target Selection & Array Generation */}
      <Card className="bg-[#151E30] border-[#293449] p-4 flex flex-wrap items-center justify-between gap-4">
        {/* Target input group */}
        <div className="flex items-center gap-2">
          <label htmlFor="search-target-input" className="text-xs font-semibold text-slate-300">Target Value:</label>
          <input
            id="search-target-input"
            type="number"
            value={target}
            onChange={(e) => setTarget(Number(e.target.value))}
            className="w-20 bg-[#111827] border border-[#252F44] rounded-lg px-2.5 py-1.5 font-mono text-sm text-sky-400 font-bold focus:outline-none focus:border-indigo-500"
          />
          <Button
            variant="outline"
            size="xs"
            onClick={handlePickRandomTarget}
            title="Pick an existing value in the array"
          >
            Pick Present
          </Button>
          <Button
            variant="outline"
            size="xs"
            onClick={handlePickAbsentTarget}
            title="Pick a value not present in the array"
          >
            Pick Absent
          </Button>
        </div>

        {/* Array manipulation buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={handleRandomize}
            icon={<Shuffle size={14} />}
          >
            Randomize Array
          </Button>
          {!isSorted && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleSortArray}
              icon={<ArrowUpDown size={14} />}
            >
              Sort Array
            </Button>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsModalOpen(true)}
            icon={<SlidersHorizontal size={14} />}
          >
            Custom Array...
          </Button>
        </div>
      </Card>

      {/* Main Grid: Visualizer + Explanation */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Visualizer & Controls (2 Columns) */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <Card className="flex flex-col gap-4 bg-[#151E30] border-[#293449]">
            <div className="flex items-center justify-between border-b border-[#293449] pb-3">
              <div>
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <Search size={16} className="text-sky-400" />
                  {currentMeta.name}
                </h2>
                <p className="text-xs text-slate-400">
                  {currentMeta.description}
                </p>
              </div>
              <Badge variant="cyan" size="sm">
                Target: {target}
              </Badge>
            </div>

            {/* Visualizer Canvas */}
            <SearchArrayVisualization
              array={currentStep?.array || array}
              elementStates={currentStep?.elementStates || {}}
              low={currentStep?.low}
              mid={currentStep?.mid}
              high={currentStep?.high}
              target={target}
            />

            {/* Metrics */}
            <MetricsPanel
              comparisons={currentStep?.comparisons || 0}
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

        {/* Code Explanation Panel */}
        <div className="lg:col-span-1">
          <CodeExplanationPanel
            algorithmName={currentMeta.name}
            description={currentMeta.explanation}
            pseudocode={currentMeta.pseudocode}
            activeLine={currentStep?.codeLine || 0}
            currentDescription={currentStep?.description}
            complexity={{
              bestTime: currentMeta.bestTime,
              averageTime: currentMeta.averageTime,
              worstTime: currentMeta.worstTime,
              space: currentMeta.space,
            }}
          />
        </div>
      </div>

      <CustomArrayModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onApply={(newArr) => {
          setArray(newArr)
          if (!newArr.includes(target) && newArr.length > 0) {
            setTarget(newArr[0])
          }
        }}
        currentArray={array}
      />
    </div>
  )
}
