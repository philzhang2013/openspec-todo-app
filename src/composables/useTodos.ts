import { ref, watch } from 'vue'
import type { Todo, Priority } from '../types/Todo'
import { saveTodos, loadTodos } from '../utils/storage'

export function useTodos() {
  const loadedTodos = loadTodos()

  // 兼容旧数据：没有 priority 字段的使用默认值
  const todos = ref<Todo[]>(loadedTodos.map(todo => {
    if (!todo.priority) {
      return { ...todo, priority: 'medium' as Priority }
    }
    return todo
  }))

  watch(
    todos,
    (newTodos) => {
      saveTodos(newTodos)
    },
    { deep: true }
  )

  function addTodo(content: string, priority: Priority = 'medium') {
    if (!content.trim()) return

    const newTodo: Todo = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      content: content.trim(),
      completed: false,
      createdAt: Date.now(),
      priority
    }
    todos.value = [...todos.value, newTodo]
  }

  function toggleTodo(id: string) {
    todos.value = todos.value.map(todo => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed }
      }
      return todo
    })
  }

  function deleteTodo(id: string) {
    todos.value = todos.value.filter(t => t.id !== id)
  }

  return {
    todos,
    addTodo,
    toggleTodo,
    deleteTodo
  }
}
