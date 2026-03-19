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
  <button
    class="theme-switch"
    :class="{ dark: theme === 'dark' }"
    @click="emit('toggle')"
    :title="theme === 'light' ? '切换到黑夜模式' : '切换到白天模式'"
  >
    <span class="icon sun">☀️</span>
    <span class="icon moon">🌙</span>
    <span class="slider"></span>
  </button>
</template>

<style scoped>
.theme-switch {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 80px;
  height: 40px;
  margin: 0 auto 30px auto;
  padding: 4px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
}

.theme-switch:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.5);
}

.theme-switch:active {
  transform: scale(0.98);
}

.theme-switch.dark {
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.4);
}

.theme-switch.dark:hover {
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.5);
}

.icon {
  position: relative;
  z-index: 1;
  font-size: 18px;
  transition: all 0.3s ease;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon.sun {
  opacity: 1;
  transform: rotate(0deg);
}

.icon.moon {
  opacity: 0.3;
  transform: rotate(-180deg);
}

.theme-switch.dark .icon.sun {
  opacity: 0.3;
  transform: rotate(180deg);
}

.theme-switch.dark .icon.moon {
  opacity: 1;
  transform: rotate(0deg);
}

.slider {
  position: absolute;
  left: 4px;
  width: 32px;
  height: 32px;
  background: linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%);
  border-radius: 50%;
  transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.theme-switch.dark .slider {
  left: calc(100% - 36px);
  background: linear-gradient(135deg, #434343 0%, #000000 100%);
}
</style>
