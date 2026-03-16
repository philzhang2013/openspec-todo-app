<script setup lang="ts">
import type { Theme } from '../composables/useTheme'

defineProps<{
  theme: Theme
}>()

const emit = defineEmits<{
  (e: 'toggle'): void
}>()
</script>

<template>
  <button class="theme-switch" @click="emit('toggle')" :title="theme === 'light' ? '切换到黑夜模式' : '切换到白天模式'">
    {{ theme === 'light' ? '🌙' : '☀️' }}
  </button>
</template>

<style scoped>
.theme-switch {
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 10px;
  font-size: 20px;
  background-color: var(--bg-color);
  border: 1px solid var(--border-color);
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.3s;
}

.theme-switch:hover {
  background-color: var(--hover-bg-color);
}
</style>
