## Context

为 Vue3 Todo 应用添加主题切换功能，支持白天模式和黑夜模式。主题状态需要持久化到 localStorage。

## Goals / Non-Goals

**Goals:**
- 实现主题切换组件
- 使用 Vue3 Composition API 管理主题状态
- 主题偏好持久化
- 白天/黑夜两种模式

**Non-Goals:**
- 多种主题主题色（只做白天/黑夜）
- 跟随系统主题
- 主题动画效果

## Decisions

### 1. 技术方案

| 决策项 | 选择 | 理由 |
|--------|------|------|
| 状态管理 | Vue3 ref + watch | 简单项目无需 Pinia |
| 主题存储 | localStorage | 纯前端，无需后端 |
| 主题实现 | CSS 变量 | Vue 官方推荐方式 |

### 2. 数据模型

```typescript
type Theme = 'light' | 'dark'

interface ThemeState {
  theme: Theme
}
```

### 3. 组件结构

```
src/
├── composables/
│   └── useTheme.ts      # 主题状态管理
├── components/
│   └── ThemeSwitch.vue  # 主题切换按钮
```

### 4. CSS 变量设计

**白天模式:**
```css
--bg-color: #ffffff
--text-color: #333333
--border-color: #dddddd
--primary-color: #42b883
```

**黑夜模式:**
```css
--bg-color: #1a1a1a
--text-color: #e0e0e0
--border-color: #444444
--primary-color: #42b883
```

## Risks / Trade-offs

- **风险**: localStorage 不可用时主题不生效
  - **缓解**: 降级到默认白天模式

- **权衡**: 不支持系统主题跟随
  - **理由**: 需求明确只做手动切换
