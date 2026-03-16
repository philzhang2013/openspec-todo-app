import { describe, it, expect } from 'vitest'
import fs from 'fs'
import path from 'path'

describe('theme.css', () => {
  const themeCssPath = path.resolve(__dirname, 'theme.css')

  it('should exist', () => {
    expect(fs.existsSync(themeCssPath)).toBe(true)
  })

  it('should contain light theme variables', () => {
    const content = fs.readFileSync(themeCssPath, 'utf-8')

    expect(content).toContain('--bg-color')
    expect(content).toContain('--text-color')
    expect(content).toContain('--border-color')
    expect(content).toContain('--primary-color')
  })

  it('should contain dark theme variables', () => {
    const content = fs.readFileSync(themeCssPath, 'utf-8')

    expect(content).toContain('.dark')
    expect(content).toContain('--bg-color')
  })

  it('should define both light and dark values', () => {
    const content = fs.readFileSync(themeCssPath, 'utf-8')

    // Light theme should have white background
    expect(content).toContain('#ffffff')
    // Dark theme should have dark background
    expect(content).toContain('#1a1a1a')
  })
})
