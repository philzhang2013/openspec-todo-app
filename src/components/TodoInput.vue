<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  onAdd: (content: string) => void
}>()

const inputValue = ref('')

function handleAdd() {
  if (!inputValue.value.trim()) return
  props.onAdd(inputValue.value)
  inputValue.value = ''
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
