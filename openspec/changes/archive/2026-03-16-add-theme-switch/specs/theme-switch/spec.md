## ADDED Requirements

### Requirement: 用户可以切换主题
用户可以通过点击按钮在白天模式和黑夜模式之间切换。

#### Scenario: 切换到黑夜模式
- **WHEN** 用户点击主题切换按钮（当前为白天模式）
- **THEN** 页面主题变为黑夜模式

#### Scenario: 切换回白天模式
- **WHEN** 用户点击主题切换按钮（当前为黑夜模式）
- **THEN** 页面主题变为白天模式

### Requirement: 主题偏好持久化
用户设置的主题偏好应该保存到 localStorage，页面刷新后保持。

#### Scenario: 刷新页面后主题保持
- **WHEN** 用户设置主题为黑夜模式后刷新页面
- **THEN** 页面仍然显示黑夜模式

#### Scenario: 首次访问使用默认主题
- **WHEN** 用户首次访问应用（无 localStorage 数据）
- **THEN** 页面显示白天模式

### Requirement: 主题影响所有 UI 元素
主题切换应该影响整个应用的视觉样式。

#### Scenario: 背景色变化
- **WHEN** 用户切换主题
- **THEN** 页面背景色随之变化

#### Scenario: 文字颜色变化
- **WHEN** 用户切换主题
- **THEN** 文字颜色随之变化（保证可读性）
