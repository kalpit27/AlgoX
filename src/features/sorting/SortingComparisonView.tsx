import React, { useMemo, useState } from 'react'
import {
  SortingAlgorithmId,
  getSortingSteps,
  SORTING_METADATA,
} from '../../algorithms/sorting'
import { usePlaybackEngine } from '../../hooks/usePlaybackEngine'
import { ArrayBarVisualization } from './ArrayBarVisualization'
import { PlaybackControls } from '../../components/controls/PlaybackControls'
import { MetricsPanel } from '../../components/panels/MetricsPanel'
import { Card } from '../../components/ui/Card'
import { Badge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'
import { Play, Pause, RotateCcw } from 'lucide-react'

export interface SortingComparisonViewProps {
  initialArray: number[]
}

const ALGORITHMS: { id: SortingAlgorithmId; label: string }[] = [
  { id: 'bubble', label: 'Bubble Sort' },
  { id: 'selection', label: 'Selection Sort' },
  { id: 'insertion', label: 'Insertion Sort' },
  { id: 'merge', label: 'Merge Sort' },
  { id: 'quick', label: 'Quick Sort' },
  { id: 'heap', label: 'Heap Sort' },
]

export const SortingComparisonView: React.FC<SortingComparisonViewProps> = ({
  initialArray,
}) => {
  const [algoA, setAlgoA] = useState<SortingAlgorithmId>('bubble')
  const [algoB, setAlgoB] = useState<SortingAlgorithmId>('quick')

  // Generate steps for both algorithms from identical input array
  const stepsA = useMemo(() => getSortingSteps(algoA, initialArray), [algoA, initialArray])
  const stepsB = useMemo(() => getSortingSteps(algoB, initialArray), [algoB, initialArray])

  const engineA = usePlaybackEngine({ steps: stepsA, initialSpeedMs: 300 })
  const engineB = usePlaybackEngine({ steps: stepsB, initialSpeedMs: 300 })

  const metaA = SORTING_METADATA[algoA]
  const metaB = SORTING_METADATA[algoB]

  // Dual playback control handlers
  const handleDualPlay = () => {
    engineA.play()
    engineB.play()
  }

  const handleDualPause = () => {
    engineA.pause()
    engineB.pause()
  }

  const handleDualReset = () => {
    engineA.reset()
    engineB.reset()
  }

  const isAnyPlaying = engineA.isPlaying || engineB.isPlaying

  return (
    <div className="flex flex-col gap-6">
      {/* Dual Playback master toolbar */}
      <div className="bg-[#151E30] border border-[#293449] rounded-xl p-4 flex flex-wrap items-center justify-between gap-3 shadow-md">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
            Synchronized Playback:
          </span>
          {isAnyPlaying ? (
            <Button
              variant="secondary"
              size="sm"
              onClick={handleDualPause}
              icon={<Pause size={14} />}
              className="bg-amber-500/20 text-amber-300 border-amber-500/30"
            >
              Pause Both
            </Button>
          ) : (
            <Button
              variant="primary"
              size="sm"
              onClick={handleDualPlay}
              icon={<Play size={14} />}
            >
              Play Both
            </Button>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={handleDualReset}
            icon={<RotateCcw size={14} />}
          >
            Reset Both
          </Button>
        </div>

        <p className="text-xs text-slate-400">
          Comparing on identical initial input of {initialArray.length} elements.
        </p>
      </div>

      {/* Side-by-Side Comparison Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Panel A */}
        <Card className="flex flex-col gap-4">
          <div className="flex items-center justify-between border-b border-[#293449] pb-3">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold flex items-center justify-center font-mono">
                A
              </span>
              <select
                value={algoA}
                onChange={(e) => setAlgoA(e.target.value as SortingAlgorithmId)}
                className="bg-[#111827] border border-[#252F44] text-white text-sm font-semibold rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-indigo-500 cursor-pointer"
              >
                {ALGORITHMS.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-1.5">
              <Badge variant="indigo" size="xs">
                Avg: {metaA.complexity.averageTime}
              </Badge>
              <Badge variant="cyan" size="xs">
                Space: {metaA.complexity.space}
              </Badge>
            </div>
          </div>

          <ArrayBarVisualization
            array={engineA.currentStep?.array || initialArray}
            elementStates={engineA.currentStep?.elementStates || {}}
            height={240}
          />

          <MetricsPanel
            comparisons={engineA.currentStep?.comparisons || 0}
            swaps={engineA.currentStep?.swaps}
            writes={engineA.currentStep?.writes}
            size={initialArray.length}
            status={
              engineA.isCompleted
                ? 'completed'
                : engineA.isPlaying
                ? 'running'
                : engineA.currentStepIndex > 0
                ? 'paused'
                : 'idle'
            }
          />

          <PlaybackControls
            isPlaying={engineA.isPlaying}
            isCompleted={engineA.isCompleted}
            currentStepIndex={engineA.currentStepIndex}
            totalSteps={engineA.totalSteps}
            speedMs={engineA.speedMs}
            onPlay={engineA.play}
            onPause={engineA.pause}
            onStepForward={engineA.stepForward}
            onStepBackward={engineA.stepBackward}
            onReset={engineA.reset}
            onJumpToStep={engineA.jumpToStep}
            onSpeedChange={engineA.setSpeedMs}
          />
        </Card>

        {/* Panel B */}
        <Card className="flex flex-col gap-4">
          <div className="flex items-center justify-between border-b border-[#293449] pb-3">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-sky-500/20 text-sky-300 text-xs font-bold flex items-center justify-center font-mono">
                B
              </span>
              <select
                value={algoB}
                onChange={(e) => setAlgoB(e.target.value as SortingAlgorithmId)}
                className="bg-[#111827] border border-[#252F44] text-white text-sm font-semibold rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-indigo-500 cursor-pointer"
              >
                {ALGORITHMS.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-1.5">
              <Badge variant="indigo" size="xs">
                Avg: {metaB.complexity.averageTime}
              </Badge>
              <Badge variant="cyan" size="xs">
                Space: {metaB.complexity.space}
              </Badge>
            </div>
          </div>

          <ArrayBarVisualization
            array={engineB.currentStep?.array || initialArray}
            elementStates={engineB.currentStep?.elementStates || {}}
            height={240}
          />

          <MetricsPanel
            comparisons={engineB.currentStep?.comparisons || 0}
            swaps={engineB.currentStep?.swaps}
            writes={engineB.currentStep?.writes}
            size={initialArray.length}
            status={
              engineB.isCompleted
                ? 'completed'
                : engineB.isPlaying
                ? 'running'
                : engineB.currentStepIndex > 0
                ? 'paused'
                : 'idle'
            }
          />

          <PlaybackControls
            isPlaying={engineB.isPlaying}
            isCompleted={engineB.isCompleted}
            currentStepIndex={engineB.currentStepIndex}
            totalSteps={engineB.totalSteps}
            speedMs={engineB.speedMs}
            onPlay={engineB.play}
            onPause={engineB.pause}
            onStepForward={engineB.stepForward}
            onStepBackward={engineB.stepBackward}
            onReset={engineB.reset}
            onJumpToStep={engineB.jumpToStep}
            onSpeedChange={engineB.setSpeedMs}
          />
        </Card>
      </div>

      {/* Comparison Analysis Footer */}
      <Card className="bg-[#111827] border-[#252F44]">
        <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
          Algorithmic Comparison Notice
        </h4>
        <p className="text-xs text-slate-400 leading-relaxed">
          Operation counts reflect abstract fundamental operations (element comparisons and mutations), rather than CPU clock cycles or wall-clock elapsed time. While an algorithm like Quick Sort performs significantly fewer comparisons on random arrays, Selection Sort guarantees minimal swaps (at most n - 1), making it preferable in flash memory where write wear is costly.
        </p>
      </Card>
    </div>
  )
}
