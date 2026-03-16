## Why

为 Todo 应用增加主题切换功能，支持白天模式和黑夜模式切换，提升用户体验。

## What Changes

- 新增主题切换组件
- 实现主题状态管理（使用 Vue3 Composition API）
- 白天模式：白色背景，深色文字
- 黑夜模式：深色背景，浅色文字
- 主题偏好保存到 localStorage，刷新后保持

## Capabilities

### New Capabilities
- `theme-switch`: 主题切换功能，支持白天/黑夜模式切换，主题偏好持久化

### Modified Capabilities
- `todo-management`: 无变化（仅样式适配）

## Impact

- 新增 `src/components/ThemeSwitch.vue` 组件
- 新增 `src/composables/useTheme.ts` 主题管理逻辑
- 修改现有组件样式以支持主题适配
- 无新增依赖
