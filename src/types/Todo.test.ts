import { describe, it, expect } from 'vitest'
import type { Todo } from './Todo'

describe('Todo Type', () => {
  it('should have correct structure', () => {
    const todo: Todo = {
      id: '1',
      content: 'Test task',
      completed: false,
      createdAt: Date.now()
    }

    expect(todo).toHaveProperty('id')
    expect(todo).toHaveProperty('content')
    expect(todo).toHaveProperty('completed')
    expect(todo).toHaveProperty('createdAt')
  })

  it('should allow boolean for completed', () => {
    const todo: Todo = {
      id: '1',
      content: 'Test task',
      completed: true,
      createdAt: Date.now()
    }

    expect(todo.completed).toBe(true)
  })

  it('should require all fields', () => {
    const todo: Todo = {
      id: '1',
      content: 'Test task',
      completed: false,
      createdAt: 1234567890
    }

    expect(todo.id).toBeDefined()
    expect(todo.content).toBeDefined()
    expect(todo.completed).toBeDefined()
    expect(todo.createdAt).toBeDefined()
  })
})
