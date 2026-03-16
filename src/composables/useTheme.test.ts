import { describe, it, expect, beforeEach, vi } from 'vitest'
import { useTheme } from './useTheme'

describe('useTheme', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('should return light theme by default', () => {
    const { theme } = useTheme()

    expect(theme.value).toBe('light')
  })

  it('should load theme from localStorage', () => {
    localStorage.setItem('theme', 'dark')

    const { theme } = useTheme()

    expect(theme.value).toBe('dark')
  })

  it('should toggle theme from light to dark', () => {
    const { theme, toggleTheme } = useTheme()

    expect(theme.value).toBe('light')
    toggleTheme()
    expect(theme.value).toBe('dark')
  })

  it('should toggle theme from dark to light', () => {
    localStorage.setItem('theme', 'dark')
    const { theme, toggleTheme } = useTheme()

    toggleTheme()
    expect(theme.value).toBe('light')
  })

  it('should persist theme to localStorage when changed', async () => {
    const { theme, toggleTheme } = useTheme()

    toggleTheme()

    // Wait for watch to trigger
    await vi.waitFor(() => {
      expect(localStorage.getItem('theme')).toBe('dark')
    })
  })

  it('should return isDark as true for dark theme', () => {
    localStorage.setItem('theme', 'dark')
    const { isDark } = useTheme()

    expect(isDark.value).toBe(true)
  })

  it('should return isDark as false for light theme', () => {
    const { isDark } = useTheme()

    expect(isDark.value).toBe(false)
  })
})
