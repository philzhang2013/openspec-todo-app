## 1. 主题状态管理 TDD

### 1.1 useTheme Composable

- [x] 1.1.1 **先写测试**：创建 `src/composables/useTheme.test.ts`，测试主题状态和切换
- [x] 1.1.2 **后写实现**：创建 `src/composables/useTheme.ts`，实现主题状态管理

### 1.2 CSS 变量

- [x] 1.2.1 **先写测试**：创建 `src/styles/theme.test.ts`，测试主题 CSS 变量
- [x] 1.2.2 **后写实现**：创建 `src/styles/theme.css`，定义主题 CSS 变量

## 2. 主题切换组件 TDD

### 2.1 ThemeSwitch 组件

- [x] 2.1.1 **先写测试**：创建 `src/components/ThemeSwitch.test.ts`，测试切换按钮
- [x] 2.1.2 **后写实现**：创建 `src/components/ThemeSwitch.vue`，实现切换按钮

## 3. 集成

### 3.1 App 集成

- [x] 3.1.1 修改 `src/App.vue`，引入主题切换组件
- [x] 3.1.2 修改 `src/main.ts`，应用全局主题样式
- [x] 3.1.3 更新 `src/style.css`，使用 CSS 变量

## 4. 测试验证

- [x] 4.1 运行所有单元测试
- [x] 4.2 手动测试主题切换功能

---

**TDD 流程说明**：
- 每个实现任务前，先写测试（RED）
- 运行测试，确保失败
- 编写最小实现代码使测试通过（GREEN）
- 如有需要，重构代码（IMPROVE）
