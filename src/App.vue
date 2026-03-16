<script setup lang="ts">
import TodoInput from './components/TodoInput.vue'
import TodoList from './components/TodoList.vue'
import ThemeSwitch from './components/ThemeSwitch.vue'
import { useTodos } from './composables/useTodos'
import { useTheme } from './composables/useTheme'

const { todos, addTodo, toggleTodo, deleteTodo } = useTodos()
const { theme, toggleTheme } = useTheme()
</script>

<template>
  <div class="app">
    <ThemeSwitch :theme="theme" @toggle="toggleTheme" />
    <h1>Todo 管理应用</h1>
    <TodoInput @add="addTodo" />
    <TodoList :todos="todos" @toggle="toggleTodo" @delete="deleteTodo" />
  </div>
</template>

<style>
.app {
  max-width: 600px;
  margin: 50px auto;
  padding: 20px;
  font-family: Arial, sans-serif;
  background-color: var(--bg-color);
  color: var(--text-color);
  min-height: 100vh;
}

h1 {
  text-align: center;
  color: var(--text-color);
  margin-bottom: 30px;
}
</style>
