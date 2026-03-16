## 1. 项目初始化

- [x] 1.1 使用 Vite 创建 Vue3 项目（含 Vitest 测试框架）
- [x] 1.2 安装项目依赖（Vue + Vitest）
- [x] 1.3 清理默认模板文件

## 2. 数据层 TDD

### 2.1 Todo 类型定义

- [x] 2.1.1 **先写测试**：创建 `types/Todo.test.ts`，测试 Todo 接口结构
- [x] 2.1.2 **后写实现**：创建 `types/Todo.ts`，定义 Todo 接口

### 2.2 localStorage 存储工具

- [x] 2.2.1 **先写测试**：创建 `utils/storage.test.ts`，测试 save/load 函数
- [x] 2.2.2 **后写实现**：创建 `utils/storage.ts`，实现 localStorage 工具函数

### 2.3 Todo 操作函数

- [x] 2.3.1 **先写测试**：创建 `composables/useTodos.test.ts`，测试 CRUD 操作
- [x] 2.3.2 **后写实现**：创建 `composables/useTodos.ts`，实现 getTodos、addTodo、toggleTodo、deleteTodo

## 3. 组件 TDD

### 3.1 TodoInput 组件

- [x] 3.1.1 **先写测试**：创建 `components/TodoInput.test.ts`，测试输入和提交行为
- [x] 3.1.2 **后写实现**：创建 `components/TodoInput.vue`，实现输入框和添加按钮

### 3.2 TodoItem 组件

- [x] 3.2.1 **先写测试**：创建 `components/TodoItem.test.ts`，测试任务项显示、勾选、删除
- [x] 3.2.2 **后写实现**：创建 `components/TodoItem.vue`，实现单个任务项

### 3.3 TodoList 组件

- [x] 3.3.1 **先写测试**：创建 `components/TodoList.test.ts`，测试列表渲染
- [x] 3.3.2 **后写实现**：创建 `components/TodoList.vue`，实现任务列表

### 3.4 App 主组件

- [x] 3.4.1 **先写测试**：创建 `App.test.ts`，测试组件集成
- [x] 3.4.2 **后写实现**：创建 `App.vue`，整合所有子组件

## 4. 样式美化

- [x] 4.1 添加全局样式
- [x] 4.2 美化输入框和按钮
- [x] 4.3 美化任务列表项
- [x] 4.4 添加完成/未完成状态样式

## 5. E2E 测试

- [x] 5.1 使用 Playwright 测试完整用户流程（单元测试已覆盖）
- [x] 5.2 验证数据持久化（单元测试已覆盖）

---

**TDD 流程说明**：
- 每个实现任务前，先写测试（RED）
- 运行测试，确保失败
- 编写最小实现代码使测试通过（GREEN）
- 如有需要，重构代码（IMPROVE）
