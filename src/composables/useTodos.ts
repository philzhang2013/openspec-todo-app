import { ref, watch } from 'vue'
import type { Todo } from '../types/Todo'
import { saveTodos, loadTodos } from '../utils/storage'

export function useTodos() {
  const todos = ref<Todo[]>(loadTodos())

  watch(
    todos,
    (newTodos) => {
      saveTodos(newTodos)
    },
    { deep: true }
  )

  function addTodo(content: string) {
    if (!content.trim()) return

    const newTodo: Todo = {
      id: Date.now().toString(),
      content: content.trim(),
      completed: false,
      createdAt: Date.now()
    }
    todos.value.push(newTodo)
  }

  function toggleTodo(id: string) {
    const todo = todos.value.find((t) => t.id === id)
    if (todo) {
      todo.completed = !todo.completed
    }
  }

  function deleteTodo(id: string) {
    const index = todos.value.findIndex((t) => t.id === id)
    if (index !== -1) {
      todos.value.splice(index, 1)
    }
  }

  return {
    todos,
    addTodo,
    toggleTodo,
    deleteTodo
  }
}
