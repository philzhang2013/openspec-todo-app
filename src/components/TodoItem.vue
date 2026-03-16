<script setup lang="ts">
import type { Todo, Priority } from '../types/Todo'

defineProps<{
  todo: Todo
}>()

const emit = defineEmits<{
  (e: 'toggle', id: string): void
  (e: 'delete', id: string): void
}>()

const priorityLabels: Record<Priority, string> = {
  high: '高',
  medium: '中',
  low: '低'
}
</script>

<template>
  <div class="todo-item" :class="{ completed: todo.completed }">
    <input
      type="checkbox"
      :checked="todo.completed"
      @change="emit('toggle', todo.id)"
    />
    <span class="content">{{ todo.content }}</span>
    <span class="priority-label" :class="`priority-${todo.priority}`">
      {{ priorityLabels[todo.priority] }}
    </span>
    <button class="delete-btn" @click="emit('delete', todo.id)">删除</button>
  </div>
</template>

<style scoped>
.todo-item {
  display: flex;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid var(--border-color);
  gap: 10px;
  background-color: var(--bg-color);
}

.todo-item:hover {
  background-color: var(--hover-bg-color);
}

.todo-item.completed .content {
  text-decoration: line-through;
  color: var(--completed-color);
}

input[type="checkbox"] {
  width: 18px;
  height: 18px;
  cursor: pointer;
}

.content {
  flex: 1;
  font-size: 16px;
  color: var(--text-color);
}

.delete-btn {
  padding: 5px 10px;
  font-size: 14px;
  background-color: var(--delete-bg-color);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.delete-btn:hover {
  background-color: var(--delete-hover-color);
}

.priority-label {
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
}

.priority-high {
  background-color: #fee2e2;
  color: #dc2626;
}

.priority-medium {
  background-color: #fef3c7;
  color: #d97706;
}

.priority-low {
  background-color: #d1fae5;
  color: #059669;
}
</style>
