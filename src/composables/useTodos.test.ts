import { describe, it, expect, beforeEach, vi } from 'vitest'
import type { Todo } from '../types/Todo'
import { useTodos } from './useTodos'

describe('useTodos', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('should load todos from storage on init', () => {
    const storedTodos: Todo[] = [
      { id: '1', content: 'Stored task', completed: false, createdAt: Date.now(), priority: 'medium' }
    ]
    localStorage.setItem('todos', JSON.stringify(storedTodos))

    const { todos } = useTodos()

    expect(todos.value).toEqual(storedTodos)
  })

  it('should start with empty array when no storage', () => {
    const { todos } = useTodos()

    expect(todos.value).toEqual([])
  })

  it('should add a new todo', () => {
    const { todos, addTodo } = useTodos()

    addTodo('New task')

    expect(todos.value.length).toBe(1)
    expect(todos.value[0].content).toBe('New task')
    expect(todos.value[0].completed).toBe(false)
    expect(todos.value[0].id).toBeDefined()
  })

  it('should toggle todo completion status', () => {
    const { todos, addTodo, toggleTodo } = useTodos()

    addTodo('Test task')
    const todoId = todos.value[0].id
    toggleTodo(todoId)

    expect(todos.value[0].completed).toBe(true)

    toggleTodo(todoId)
    expect(todos.value[0].completed).toBe(false)
  })

  it('should delete a todo', () => {
    const { todos, addTodo, deleteTodo } = useTodos()

    addTodo('Task 1')
    addTodo('Task 2')
    const todoId = todos.value[0].id
    deleteTodo(todoId)

    expect(todos.value.length).toBe(1)
    expect(todos.value[0].content).toBe('Task 2')
  })

  it('should persist todos to storage', async () => {
    const { addTodo } = useTodos()

    addTodo('Persisted task')

    // Wait for watch to trigger
    await vi.waitFor(() => {
      const stored = localStorage.getItem('todos')
      const parsed = JSON.parse(stored || '[]')
      expect(parsed.length).toBe(1)
    })

    const stored = localStorage.getItem('todos')
    const parsed = JSON.parse(stored || '[]')
    expect(parsed[0].content).toBe('Persisted task')
  })
})
