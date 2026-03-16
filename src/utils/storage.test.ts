import { describe, it, expect, beforeEach } from 'vitest'
import type { Todo } from '../types/Todo'
import { saveTodos, loadTodos } from './storage'

describe('storage utils', () => {
  const STORAGE_KEY = 'todos'

  beforeEach(() => {
    localStorage.clear()
  })

  describe('saveTodos', () => {
    it('should save todos to localStorage', () => {
      const todos: Todo[] = [
        { id: '1', content: 'Test task', completed: false, createdAt: Date.now(), priority: 'medium' }
      ]

      saveTodos(todos)

      const stored = localStorage.getItem(STORAGE_KEY)
      expect(stored).toBe(JSON.stringify(todos))
    })

    it('should overwrite existing data', () => {
      const initialTodos: Todo[] = [
        { id: '1', content: 'Initial', completed: false, createdAt: Date.now(), priority: 'medium' }
      ]
      const newTodos: Todo[] = [
        { id: '2', content: 'New', completed: true, createdAt: Date.now(), priority: 'high' }
      ]

      saveTodos(initialTodos)
      saveTodos(newTodos)

      const stored = localStorage.getItem(STORAGE_KEY)
      expect(stored).toBe(JSON.stringify(newTodos))
    })
  })

  describe('loadTodos', () => {
    it('should load todos from localStorage', () => {
      const todos: Todo[] = [
        { id: '1', content: 'Test task', completed: false, createdAt: Date.now(), priority: 'medium' }
      ]
      localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))

      const loaded = loadTodos()

      expect(loaded).toEqual(todos)
    })

    it('should return empty array when no data', () => {
      const loaded = loadTodos()

      expect(loaded).toEqual([])
    })

    it('should return empty array for invalid JSON', () => {
      localStorage.setItem(STORAGE_KEY, 'invalid json')

      const loaded = loadTodos()

      expect(loaded).toEqual([])
    })
  })
})
