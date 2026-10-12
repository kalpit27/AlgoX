import { describe, it, expect, vi } from 'vitest'
import '@testing-library/jest-dom/vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Button } from '../components/ui/Button'
import { Tabs } from '../components/ui/Tabs'
import { MetricsPanel } from '../components/panels/MetricsPanel'
import { parseCustomArray, validateInteger } from '../utils/validators'

describe('UI Components & Validation Integration', () => {
  describe('Button Component', () => {
    it('renders with correct text and handles clicks', () => {
      const handleClick = vi.fn()
      render(<Button onClick={handleClick}>Click Me</Button>)

      const btn = screen.getByRole('button', { name: /click me/i })
      expect(btn).toBeInTheDocument()
      fireEvent.click(btn)
      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('honors disabled prop', () => {
      const handleClick = vi.fn()
      render(<Button disabled onClick={handleClick}>Disabled</Button>)

      const btn = screen.getByRole('button', { name: /disabled/i })
      expect(btn).toBeDisabled()
      fireEvent.click(btn)
      expect(handleClick).not.toHaveBeenCalled()
    })
  })

  describe('Tabs Component', () => {
    it('renders all tab items and responds to tab change', () => {
      const handleTabChange = vi.fn()
      const items = [
        { id: 'tab1', label: 'First Tab' },
        { id: 'tab2', label: 'Second Tab' },
      ]

      render(
        <Tabs
          items={items}
          activeTab="tab1"
          onChange={handleTabChange}
        />
      )

      expect(screen.getByText('First Tab')).toBeInTheDocument()
      const tab2 = screen.getByText('Second Tab')
      expect(tab2).toBeInTheDocument()

      fireEvent.click(tab2)
      expect(handleTabChange).toHaveBeenCalledWith('tab2')
    })
  })

  describe('MetricsPanel Component', () => {
    it('displays exact comparisons, swaps, and writes', () => {
      render(
        <MetricsPanel
          comparisons={42}
          swaps={17}
          writes={8}
          size={20}
          status="completed"
        />
      )

      expect(screen.getByText('42')).toBeInTheDocument()
      expect(screen.getByText('17')).toBeInTheDocument()
      expect(screen.getByText('8')).toBeInTheDocument()
      expect(screen.getByText('20')).toBeInTheDocument()
      expect(screen.getByText('Completed')).toBeInTheDocument()
    })
  })

  describe('Validation Utilities', () => {
    it('parses comma-separated integers properly', () => {
      const res = parseCustomArray('10, 25, 30, 45, 5')
      expect(res.success).toBe(true)
      expect(res.data).toEqual([10, 25, 30, 45, 5])
    })

    it('rejects non-integer and malformed strings', () => {
      const res = parseCustomArray('10, abc, 30')
      expect(res.success).toBe(false)
      expect(res.error).toBeDefined()
    })

    it('rejects empty inputs', () => {
      const res = parseCustomArray('   ')
      expect(res.success).toBe(false)
    })

    it('validates integer ranges accurately', () => {
      expect(validateInteger('50', 0, 100).success).toBe(true)
      expect(validateInteger('200', 0, 100).success).toBe(false)
      expect(validateInteger('xyz', 0, 100).success).toBe(false)
    })
  })
})
