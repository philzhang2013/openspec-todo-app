import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import TodoList from './TodoList.vue'
import type { Todo } from '../types/Todo'

describe('TodoList', () => {
  const mockTodos: Todo[] = [
    { id: '1', content: 'Task 1', completed: false, createdAt: Date.now(), priority: 'medium' },
    { id: '2', content: 'Task 2', completed: true, createdAt: Date.now(), priority: 'high' }
  ]

  it('should render list of todos', () => {
    const wrapper = mount(TodoList, {
      props: {
        todos: mockTodos,
        onToggle: vi.fn(),
        onDelete: vi.fn()
      }
    })

    expect(wrapper.findAllComponents({ name: 'TodoItem' })).toHaveLength(2)
  })

  it('should render empty message when no todos', () => {
    const wrapper = mount(TodoList, {
      props: {
        todos: [],
        onToggle: vi.fn(),
        onDelete: vi.fn()
      }
    })

    expect(wrapper.text()).toContain('暂无任务')
  })

  it('should pass correct props to TodoItem', () => {
    const wrapper = mount(TodoList, {
      props: {
        todos: mockTodos,
        onToggle: vi.fn(),
        onDelete: vi.fn()
      }
    })

    const items = wrapper.findAllComponents({ name: 'TodoItem' })
    expect(items[0].props('todo')).toEqual(mockTodos[0])
    expect(items[1].props('todo')).toEqual(mockTodos[1])
  })
})
