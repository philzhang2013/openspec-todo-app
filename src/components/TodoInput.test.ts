import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import TodoInput from './TodoInput.vue'

describe('TodoInput', () => {
  it('should render input and button', () => {
    const wrapper = mount(TodoInput, {
      props: {
        onAdd: vi.fn()
      }
    })

    expect(wrapper.find('input').exists()).toBe(true)
    expect(wrapper.find('button').exists()).toBe(true)
  })

  it('should emit add event with input value on button click', async () => {
    const onAdd = vi.fn()
    const wrapper = mount(TodoInput, {
      props: { onAdd }
    })

    await wrapper.find('input').setValue('New task')
    await wrapper.find('button').trigger('click')

    expect(onAdd).toHaveBeenCalledWith('New task', 'medium')
  })

  it('should emit add event on Enter key', async () => {
    const onAdd = vi.fn()
    const wrapper = mount(TodoInput, {
      props: { onAdd }
    })

    await wrapper.find('input').setValue('Task via Enter')
    await wrapper.find('input').trigger('keyup.enter')

    expect(onAdd).toHaveBeenCalledWith('Task via Enter', 'medium')
  })

  it('should not emit add for empty input', async () => {
    const onAdd = vi.fn()
    const wrapper = mount(TodoInput, {
      props: { onAdd }
    })

    await wrapper.find('input').setValue('')
    await wrapper.find('button').trigger('click')

    expect(onAdd).not.toHaveBeenCalled()
  })

  it('should clear input after successful add', async () => {
    const onAdd = vi.fn()
    const wrapper = mount(TodoInput, {
      props: { onAdd }
    })

    await wrapper.find('input').setValue('New task')
    await wrapper.find('button').trigger('click')

    expect(wrapper.find('input').element.value).toBe('')
  })

  it('should render priority select', () => {
    const wrapper = mount(TodoInput, {
      props: {
        onAdd: vi.fn()
      }
    })

    expect(wrapper.find('select').exists()).toBe(true)
  })

  it('should have high, medium, low options', () => {
    const wrapper = mount(TodoInput, {
      props: {
        onAdd: vi.fn()
      }
    })

    const options = wrapper.findAll('option')
    expect(options).toHaveLength(3)
    expect(options[0].text()).toContain('高')
    expect(options[1].text()).toContain('中')
    expect(options[2].text()).toContain('低')
  })

  it('should emit add event with priority', async () => {
    const onAdd = vi.fn()
    const wrapper = mount(TodoInput, {
      props: { onAdd }
    })

    await wrapper.find('input').setValue('High priority task')
    await wrapper.find('select').setValue('high')
    await wrapper.find('button').trigger('click')

    expect(onAdd).toHaveBeenCalledWith('High priority task', 'high')
  })
})
