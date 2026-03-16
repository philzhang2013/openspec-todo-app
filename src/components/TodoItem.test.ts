import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import TodoItem from './TodoItem.vue'
import type { Todo } from '../types/Todo'

describe('TodoItem', () => {
  const mockTodo: Todo = {
    id: '1',
    content: 'Test task',
    completed: false,
    createdAt: Date.now()
  }

  it('should render todo content', () => {
    const wrapper = mount(TodoItem, {
      props: {
        todo: mockTodo,
        onToggle: vi.fn(),
        onDelete: vi.fn()
      }
    })

    expect(wrapper.text()).toContain('Test task')
  })

  it('should emit toggle event when checkbox clicked', async () => {
    const onToggle = vi.fn()
    const wrapper = mount(TodoItem, {
      props: {
        todo: mockTodo,
        onToggle,
        onDelete: vi.fn()
      }
    })

    await wrapper.find('input[type="checkbox"]').trigger('change')

    expect(onToggle).toHaveBeenCalledWith('1')
  })

  it('should emit delete event when delete button clicked', async () => {
    const onDelete = vi.fn()
    const wrapper = mount(TodoItem, {
      props: {
        todo: mockTodo,
        onToggle: vi.fn(),
        onDelete
      }
    })

    await wrapper.find('button').trigger('click')

    expect(onDelete).toHaveBeenCalledWith('1')
  })

  it('should apply completed class when todo is completed', () => {
    const completedTodo = { ...mockTodo, completed: true }
    const wrapper = mount(TodoItem, {
      props: {
        todo: completedTodo,
        onToggle: vi.fn(),
        onDelete: vi.fn()
      }
    })

    expect(wrapper.find('.completed').exists()).toBe(true)
  })

  it('should not apply completed class when todo is not completed', () => {
    const wrapper = mount(TodoItem, {
      props: {
        todo: mockTodo,
        onToggle: vi.fn(),
        onDelete: vi.fn()
      }
    })

    expect(wrapper.find('.completed').exists()).toBe(false)
  })
})
