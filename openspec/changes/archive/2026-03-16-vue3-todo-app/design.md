## Context

本项目是一个纯前端的 Todo 管理应用，用于学习 Vue3 Composition API 和 openspec 工作流。无需后端服务，数据存储在浏览器 localStorage 中。

## Goals / Non-Goals

**Goals:**
- 实现待办任务的创建、查看、标记完成、删除功能
- 使用 Vue3 Composition API 构建前端应用
- 数据持久化到 localStorage
- 简洁美观的用户界面

**Non-Goals:**
- 用户登录/注册功能
- 多设备数据同步
- 任务分类/标签功能
- 任务编辑功能

## Decisions

### 1. 技术选型

| 决策项 | 选择 | 理由 |
|--------|------|------|
| 前端框架 | Vue 3 | 用户指定，用于学习 |
| 构建工具 | Vite | Vue 官方推荐，启动快 |
| 状态管理 | Vue3 Composition API (ref/reactive) | 简单项目无需 Vuex/Pinia |
| 样式方案 | CSS Scoped | Vue 单文件组件内置支持 |
| 存储方案 | localStorage | 纯前端，无需后端 |

### 2. 组件结构

```
App.vue
├── Header (应用标题)
├── TodoInput (输入框 + 添加按钮)
└── TodoList (任务列表)
    └── TodoItem (单个任务项) × N
```

### 3. 数据模型

```typescript
interface Todo {
  id: string;        // 唯一标识
  content: string;   // 任务内容
  completed: boolean; // 完成状态
  createdAt: number;  // 创建时间戳
}
```

### 4. API 设计

| 方法 | 功能 |
|------|------|
| getTodos() | 获取所有任务 |
| addTodo(content) | 添加新任务 |
| toggleTodo(id) | 切换任务完成状态 |
| deleteTodo(id) | 删除任务 |
| saveToStorage() | 保存到 localStorage |

## Risks / Trade-offs

- **风险**: localStorage 有容量限制（通常 5-10MB）
  - **缓解**: 这是一个简单的 Todo 应用，数据量很小，风险可忽略

- **风险**: 浏览器隐私模式可能导致数据丢失
  - **缓解**: 在实现中不做特殊处理，用户需知悉此限制

- **权衡**: 选择纯前端方案 vs 前后端分离
  - **理由**: 学习目的，纯前端更简单专注
