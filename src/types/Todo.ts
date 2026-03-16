export type Priority = 'high' | 'medium' | 'low'

export interface Todo {
  id: string
  content: string
  completed: boolean
  createdAt: number
  priority: Priority
}
