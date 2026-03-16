import type { Todo } from '../types/Todo'

const STORAGE_KEY = 'todos'

export function saveTodos(todos: Todo[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
}

export function loadTodos(): Todo[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    if (!data) return []
    return JSON.parse(data) as Todo[]
  } catch {
    return []
  }
}
