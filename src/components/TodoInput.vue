<script setup lang="ts">
import { ref } from 'vue'
import type { Priority } from '../types/Todo'

const props = defineProps<{
  onAdd: (content: string, priority?: Priority) => void
}>()

const inputValue = ref('')
const priority = ref<Priority>('medium')

function handleAdd() {
  if (!inputValue.value.trim()) return
  props.onAdd(inputValue.value, priority.value)
  inputValue.value = ''
  priority.value = 'medium'
}
</script>

<template>
  <div class="todo-input">
    <input
      v-model="inputValue"
      type="text"
      placeholder="添加新任务..."
      @keyup.enter="handleAdd"
    />
    <select v-model="priority">
      <option value="high">高</option>
      <option value="medium">中</option>
      <option value="low">低</option>
    </select>
    <button @click="handleAdd">添加</button>
  </div>
</template>

<style scoped>
.todo-input {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

input {
  flex: 1;
  padding: 10px;
  font-size: 16px;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  background-color: var(--input-bg-color);
  color: var(--text-color);
}

input:focus {
  outline: none;
  border-color: var(--primary-color);
}

select {
  padding: 10px;
  font-size: 14px;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  background-color: var(--input-bg-color);
  color: var(--text-color);
  cursor: pointer;
}

button {
  padding: 10px 20px;
  font-size: 16px;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: var(--button-hover-color);
}
</style>
