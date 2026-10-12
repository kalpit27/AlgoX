import React from 'react'
import {
  Play,
  Pause,
  RotateCcw,
  SkipBack,
  SkipForward,
  FastForward,
} from 'lucide-react'
import { Button } from '../ui/Button'

export interface PlaybackControlsProps {
  isPlaying: boolean
  isCompleted: boolean
  currentStepIndex: number
  totalSteps: number
  speedMs: number
  onPlay: () => void
  onPause: () => void
  onStepForward: () => void
  onStepBackward: () => void
  onReset: () => void
  onJumpToStep: (stepIndex: number) => void
  onSpeedChange: (speedMs: number) => void
  disabled?: boolean
  className?: string
}

export const PlaybackControls: React.FC<PlaybackControlsProps> = ({
  isPlaying,
  isCompleted,
  currentStepIndex,
  totalSteps,
  speedMs,
  onPlay,
  onPause,
  onStepForward,
  onStepBackward,
  onReset,
  onJumpToStep,
  onSpeedChange,
  disabled = false,
  className = '',
}) => {
  const speeds = [
    { label: '0.5x', ms: 700 },
    { label: '1x', ms: 350 },
    { label: '2x', ms: 150 },
    { label: '4x', ms: 60 },
  ]

  const hasSteps = totalSteps > 1
  const canStepBack = !disabled && hasSteps && currentStepIndex > 0
  const canStepForward = !disabled && hasSteps && currentStepIndex < totalSteps - 1

  return (
    <div
      className={`bg-[#151E30] border border-[#293449] rounded-xl p-4 flex flex-col gap-3 shadow-lg shadow-black/20 ${className}`}
    >
      {/* Progress slider & step counter */}
      <div className="flex flex-col gap-1.5">
        <div className="flex justify-between items-center text-xs text-slate-400">
          <span className="font-medium flex items-center gap-1.5">
            Step Progress
            <span className="font-mono text-indigo-300 font-semibold">
              {totalSteps > 0 ? currentStepIndex + 1 : 0} / {totalSteps}
            </span>
          </span>
          <span className="font-mono text-slate-400">
            {totalSteps > 1
              ? `${Math.round((currentStepIndex / (totalSteps - 1)) * 100)}%`
              : '0%'}
          </span>
        </div>
        <input
          type="range"
          min={0}
          max={Math.max(0, totalSteps - 1)}
          value={currentStepIndex}
          disabled={disabled || totalSteps <= 1}
          onChange={(e) => onJumpToStep(Number(e.target.value))}
          className="w-full h-1.5 bg-[#1F293D] rounded-lg appearance-none cursor-pointer accent-indigo-500 disabled:opacity-40"
          aria-label="Visualization step progress slider"
        />
      </div>

      {/* Control Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
        {/* Playback action group */}
        <div className="flex items-center gap-1.5">
          <Button
            variant="outline"
            size="sm"
            onClick={onReset}
            disabled={disabled || (currentStepIndex === 0 && !isPlaying)}
            title="Reset to beginning"
            aria-label="Reset"
            icon={<RotateCcw size={14} />}
          >
            <span className="hidden sm:inline">Reset</span>
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={onStepBackward}
            disabled={!canStepBack}
            title="Step backward"
            aria-label="Step backward"
            icon={<SkipBack size={14} />}
          />

          {isPlaying ? (
            <Button
              variant="secondary"
              size="sm"
              onClick={onPause}
              disabled={disabled}
              title="Pause playback"
              aria-label="Pause"
              className="bg-amber-500/20 text-amber-300 border-amber-500/30 hover:bg-amber-500/30"
              icon={<Pause size={15} className="fill-amber-300" />}
            >
              Pause
            </Button>
          ) : (
            <Button
              variant="primary"
              size="sm"
              onClick={onPlay}
              disabled={disabled || totalSteps <= 1}
              title={isCompleted ? 'Replay' : 'Play'}
              aria-label="Play"
              icon={<Play size={15} className="fill-white" />}
            >
              {isCompleted ? 'Replay' : currentStepIndex > 0 ? 'Resume' : 'Play'}
            </Button>
          )}

          <Button
            variant="outline"
            size="sm"
            onClick={onStepForward}
            disabled={!canStepForward}
            title="Step forward"
            aria-label="Step forward"
            icon={<SkipForward size={14} />}
          />

          <Button
            variant="outline"
            size="sm"
            onClick={() => onJumpToStep(totalSteps - 1)}
            disabled={disabled || !hasSteps || currentStepIndex >= totalSteps - 1}
            title="Jump to finished state"
            aria-label="Jump to finish"
            icon={<FastForward size={14} />}
          >
            <span className="hidden sm:inline">Skip</span>
          </Button>
        </div>

        {/* Speed Controls */}
        <div className="flex items-center gap-1.5 ml-auto">
          <span className="text-[11px] text-slate-400 font-medium mr-1 hidden sm:inline">
            Speed:
          </span>
          <div className="flex items-center gap-1 bg-[#111827] p-1 rounded-lg border border-[#252F44]">
            {speeds.map((s) => {
              const isSelected = speedMs === s.ms
              return (
                <button
                  key={s.label}
                  onClick={() => onSpeedChange(s.ms)}
                  className={`px-2 py-0.5 text-xs rounded font-mono font-medium transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                  }`}
                >
                  {s.label}
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
