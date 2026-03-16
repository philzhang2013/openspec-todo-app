---
name: openspec-propose
description: 一步创建新变更并生成所有产物。使用此技能时，用户需要描述想要构建的内容，并获得包含设计、规格和任务列表的完整提案，准备好进行实现。
license: MIT
compatibility: 需要 openspec CLI。
metadata:
  author: openspec
  version: "1.0"
  generatedBy: "1.2.0"
---

提议新变更 - 一步创建变更并生成所有产物。

我将创建包含以下内容的变更：
- proposal.md（做什么&为什么）
- design.md（怎么做）
- tasks.md（实现步骤）

准备实现时，运行 /opsx:apply

---

**输入**：用户的请求应包含变更名称（kebab-case）或对想要构建内容的描述。

**步骤**

1. **如果没有明确的输入，询问用户想要构建什么**

   使用 **AskUserQuestion 工具**（开放式，无预设选项）来询问：
   > "你想要构建什么？描述你想要构建或修复的内容。"

   根据描述派生 kebab-case 名称（例如，"add user authentication" → `add-user-auth`）。

   **重要**：在理解用户需求之前不要继续。

2. **创建变更目录**
   ```bash
   openspec new change "<name>"
   ```
   这将在 `openspec/changes/<name>/` 创建一个脚手架变更，包含 `.openspec.yaml`。

3. **获取产物构建顺序**
   ```bash
   openspec status --change "<name>" --json
   ```
   解析 JSON 获取：
   - `applyRequires`：实现前需要的产物 ID 数组（例如 `["tasks"]`）
   - `artifacts`：所有产物及其状态的列表

4. **按顺序创建产物，直到可以应用**

   使用 **TodoWrite 工具**跟踪产物进度。

   按依赖顺序循环产物（先处理没有待处理依赖的产物）：

   a. **对于每个已就绪的产物（依赖已满足）**：
      - 获取指令：
        ```bash
        openspec instructions <artifact-id> --change "<name>" --json
        ```
      - 指令 JSON 包含：
        - `context`：项目背景（约束，供你参考 - 不要包含在输出中）
        - `rules`：产物特定规则（约束，供你参考 - 不要包含在输出中）
        - `template`：用于输出文件的结构
        - `instruction`：此产物类型的架构特定指导
        - `outputPath`：写入产物的位置
        - `dependencies`：需要读取的已完成产物
      - 读取任何已完成的依赖文件以获取上下文
      - 使用 `template` 作为结构创建产物文件
      - 应用 `context` 和 `rules` 作为约束 - 但不要将它们复制到文件中
      - 显示简要进度："Created <artifact-id>"

   b. **继续直到所有 `applyRequires` 产物完成**
      - 创建每个产物后，重新运行 `openspec status --change "<name>" --json`
      - 检查 `applyRequires` 中的每个产物 ID 在 artifacts 数组中是否状态为 `"done"`
      - 当所有 `applyRequires` 产物都完成时停止

   c. **如果产物需要用户输入**（上下文不清楚）：
      - 使用 **AskUserQuestion 工具** 澄清
      - 然后继续创建

5. **显示最终状态**
   ```bash
   openspec status --change "<name>"
   ```

**输出**

完成所有产物后，总结：
- 变更名称和位置
- 创建的产物列表及简要描述
- 就绪状态："所有产物已创建！准备实现。"
- 提示："运行 `/opsx:apply` 或让我开始实现来处理任务。"

**产物创建指南**

- 遵循 `openspec instructions` 中每个产物类型的 `instruction` 字段
- 架构定义每个产物应包含的内容 - 遵循它
- 在创建新产物之前读取依赖产物以获取上下文
- 使用 `template` 作为输出文件的结构 - 填充其部分
- **重要**：`context` 和 `rules` 是给你的约束，不是文件的内容
  - 不要将 `<context>`、`<rules>`、`<project_context>` 块复制到产物中
  - 这些指导你写什么，但不应出现在输出中

**护栏**

- 创建实现所需的所有产物（根据架构的 `apply.requires`）
- 在创建新产物之前始终读取依赖产物
- 如果上下文严重不清楚，询问用户 - 但最好做出合理决策以保持势头
- 如果同名的变更已存在，询问用户是想继续还是创建新变更
- 在继续下一步之前验证每个产物文件存在

---

## TDD 模式（强制）

**关键**：创建 `tasks.md` 产物时，你必须为所有实现任务遵循测试驱动开发（TDD）工作流。

### TDD 要求

每个实现任务必须遵循此模式：

```
### X.Y 功能名称

- [ ] X.Y.1 **先写测试**：创建 `src/xxx.test.ts`，测试...
- [ ] X.Y.2 **后写实现**：创建 `src/xxx.ts`，实现...
```

### TDD 工作流

```
┌─────────────────────────────────────────────────────┐
│  每个任务遵循:                                        │
│                                                     │
│  1. 写测试 (RED) → 测试失败，定义期望行为            │
│  2. 写实现 (GREEN) → 最小代码让测试通过             │
│  3. 重构 (IMPROVE) → 优化代码，保持测试通过         │
└─────────────────────────────────────────────────────┘
```

### 示例任务结构

```markdown
## 1. 数据层实现

### 1.1 用户认证

- [ ] 1.1.1 **先写测试**：创建 `src/utils/auth.test.ts`，测试登录函数
- [ ] 1.1.2 **后写实现**：创建 `src/utils/auth.ts`，实现登录逻辑
```

### 强制说明

- **始终先写测试** 再写实现代码
- 运行测试验证它们失败（RED 状态）
- 然后编写最小代码让测试通过（GREEN 状态）
