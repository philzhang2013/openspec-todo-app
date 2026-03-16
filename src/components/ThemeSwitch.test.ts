import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import ThemeSwitch from './ThemeSwitch.vue'

describe('ThemeSwitch', () => {
  it('should render a button', () => {
    const wrapper = mount(ThemeSwitch, {
      props: {
        theme: 'light',
        onToggle: vi.fn()
      }
    })

    expect(wrapper.find('button').exists()).toBe(true)
  })

  it('should show moon icon for light theme (click to switch to dark)', () => {
    const wrapper = mount(ThemeSwitch, {
      props: {
        theme: 'light',
        onToggle: vi.fn()
      }
    })

    expect(wrapper.find('button').text()).toContain('🌙')
  })

  it('should show sun icon for dark theme (click to switch to light)', () => {
    const wrapper = mount(ThemeSwitch, {
      props: {
        theme: 'dark',
        onToggle: vi.fn()
      }
    })

    expect(wrapper.find('button').text()).toContain('☀️')
  })

  it('should emit toggle event when clicked', async () => {
    const onToggle = vi.fn()
    const wrapper = mount(ThemeSwitch, {
      props: {
        theme: 'light',
        onToggle
      }
    })

    await wrapper.find('button').trigger('click')

    expect(onToggle).toHaveBeenCalled()
  })
})
