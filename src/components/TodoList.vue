<script setup lang="ts">
import type { Todo } from '../types/Todo'
import TodoItem from './TodoItem.vue'

defineProps<{
  todos: Todo[]
}>()

const emit = defineEmits<{
  (e: 'toggle', id: string): void
  (e: 'delete', id: string): void
}>()
</script>

<template>
  <div class="todo-list">
    <div v-if="todos.length === 0" class="empty">
      暂无任务
    </div>
    <TodoItem
      v-for="todo in todos"
      :key="todo.id"
      :todo="todo"
      @toggle="emit('toggle', $event)"
      @delete="emit('delete', $event)"
    />
  </div>
</template>

<style scoped>
.todo-list {
  border: 1px solid var(--border-color);
  border-radius: 4px;
  background-color: var(--bg-color);
}

.empty {
  padding: 20px;
  text-align: center;
  color: var(--completed-color);
  font-size: 16px;
}
</style>
