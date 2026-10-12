import { useCallback, useEffect, useRef, useState } from 'react'

export interface UsePlaybackEngineOptions<T> {
  steps: T[]
  initialSpeedMs?: number
  onComplete?: () => void
}

export interface PlaybackEngine<T> {
  currentStepIndex: number
  currentStep: T | null
  isPlaying: boolean
  isCompleted: boolean
  totalSteps: number
  progressPercent: number
  speedMs: number
  setSpeedMs: (speed: number) => void
  play: () => void
  pause: () => void
  togglePlay: () => void
  stepForward: () => void
  stepBackward: () => void
  reset: () => void
  jumpToStep: (index: number) => void
}

export function usePlaybackEngine<T>({
  steps,
  initialSpeedMs = 400,
  onComplete,
}: UsePlaybackEngineOptions<T>): PlaybackEngine<T> {
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [speedMs, setSpeedMs] = useState(initialSpeedMs)

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const onCompleteRef = useRef(onComplete)
  onCompleteRef.current = onComplete

  const totalSteps = steps.length
  const isCompleted = totalSteps > 0 && currentStepIndex >= totalSteps - 1

  // Keep step index within valid bounds whenever steps change
  useEffect(() => {
    setCurrentStepIndex(0)
    setIsPlaying(false)
    if (timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }
  }, [steps])

  const pause = useCallback(() => {
    setIsPlaying(false)
    if (timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }
  }, [])

  const stepForward = useCallback(() => {
    pause()
    setCurrentStepIndex((prev) => {
      if (prev < totalSteps - 1) {
        return prev + 1
      }
      return prev
    })
  }, [pause, totalSteps])

  const stepBackward = useCallback(() => {
    pause()
    setCurrentStepIndex((prev) => {
      if (prev > 0) {
        return prev - 1
      }
      return 0
    })
  }, [pause])

  const reset = useCallback(() => {
    pause()
    setCurrentStepIndex(0)
  }, [pause])

  const jumpToStep = useCallback(
    (index: number) => {
      pause()
      const clamped = Math.max(0, Math.min(index, totalSteps - 1))
      setCurrentStepIndex(clamped)
    },
    [pause, totalSteps]
  )

  const play = useCallback(() => {
    if (totalSteps <= 1) return
    if (currentStepIndex >= totalSteps - 1) {
      setCurrentStepIndex(0)
    }
    setIsPlaying(true)
  }, [currentStepIndex, totalSteps])

  const togglePlay = useCallback(() => {
    if (isPlaying) {
      pause()
    } else {
      play()
    }
  }, [isPlaying, pause, play])

  // Playback timer effect
  useEffect(() => {
    if (!isPlaying) {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
        timerRef.current = null
      }
      return
    }

    if (currentStepIndex >= totalSteps - 1) {
      setIsPlaying(false)
      onCompleteRef.current?.()
      return
    }

    timerRef.current = setTimeout(() => {
      setCurrentStepIndex((prev) => {
        const next = prev + 1
        if (next >= totalSteps - 1) {
          setIsPlaying(false)
          onCompleteRef.current?.()
        }
        return next
      })
    }, speedMs)

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
        timerRef.current = null
      }
    }
  }, [isPlaying, currentStepIndex, totalSteps, speedMs])

  const currentStep = steps[currentStepIndex] ?? null
  const progressPercent =
    totalSteps > 1 ? Math.round((currentStepIndex / (totalSteps - 1)) * 100) : totalSteps === 1 ? 100 : 0

  return {
    currentStepIndex,
    currentStep,
    isPlaying,
    isCompleted,
    totalSteps,
    progressPercent,
    speedMs,
    setSpeedMs,
    play,
    pause,
    togglePlay,
    stepForward,
    stepBackward,
    reset,
    jumpToStep,
  }
}
