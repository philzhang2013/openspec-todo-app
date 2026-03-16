import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import App from './App.vue'

describe('App', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('should render title', () => {
    const wrapper = mount(App)

    expect(wrapper.find('h1').text()).toBe('Todo 管理应用')
  })

  it('should render TodoInput component', () => {
    const wrapper = mount(App)

    expect(wrapper.findComponent({ name: 'TodoInput' }).exists()).toBe(true)
  })

  it('should render TodoList component', () => {
    const wrapper = mount(App)

    expect(wrapper.findComponent({ name: 'TodoList' }).exists()).toBe(true)
  })

  it('should add new todo when input emits add event', async () => {
    const wrapper = mount(App)

    const inputComponent = wrapper.findComponent({ name: 'TodoInput' })
    await inputComponent.vm.$emit('add', 'New task')

    const listComponent = wrapper.findComponent({ name: 'TodoList' })
    expect(listComponent.props('todos')).toHaveLength(1)
    expect(listComponent.props('todos')[0].content).toBe('New task')
  })

  it('should toggle todo when list emits toggle event', async () => {
    const wrapper = mount(App)

    // Add a task first
    const inputComponent = wrapper.findComponent({ name: 'TodoInput' })
    await inputComponent.vm.$emit('add', 'Task to toggle')

    // Get the todo id
    const listComponent = wrapper.findComponent({ name: 'TodoList' })
    const todoId = listComponent.props('todos')[0].id

    // Toggle the task
    await listComponent.vm.$emit('toggle', todoId)

    expect(listComponent.props('todos')[0].completed).toBe(true)
  })

  it('should delete todo when list emits delete event', async () => {
    const wrapper = mount(App)

    // Add a task first
    const inputComponent = wrapper.findComponent({ name: 'TodoInput' })
    await inputComponent.vm.$emit('add', 'Task to delete')

    // Get the todo id
    const listComponent = wrapper.findComponent({ name: 'TodoList' })
    const todoId = listComponent.props('todos')[0].id

    // Delete the task
    await listComponent.vm.$emit('delete', todoId)

    expect(listComponent.props('todos')).toHaveLength(0)
  })
})
