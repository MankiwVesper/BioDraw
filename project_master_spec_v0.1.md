# 生物动态示意图编辑器 项目主规范 v0.1

## 1. 文档目的

本文档用于作为本项目的**统一基线文档**，用于：

- 固定当前项目方向与边界
- 约束后续技术选型与实现方式
- 在长会话中校准上下文，减少版本漂移
- 在新会话中重建项目背景，避免基于旧版本误修改
- 作为本地长期保存的项目主规范

本文档优先级高于零散聊天内容。  
当后续会话中出现描述冲突时，应以本文档和**当前代码基线说明**为准。

---

## 2. 项目定位

本项目是一个**网页端、面向高中生物教学场景的动态示意图制作工具**。

它不是通用动画软件，也不是科研级建模工具，而是帮助高中生物教师以较低门槛，快速制作可用于课堂演示的动态示意图，用来展示生物过程、结构变化和机制关系。

### 核心目标

帮助老师快速制作并播放可编辑的生物动态示意图，而不是让老师学习复杂动画制作。

### 本质定义

> 一个生物学科专用的动态示意图编辑器，而不是通用动画软件。

---

## 3. 目标用户

### 核心用户
- 高中生物教师

### 次级用户
- 教研员
- 教辅内容制作人员
- 教育机构课程开发人员
- 生物师范专业学生

第一版设计优先围绕高中生物教师展开。

---

## 4. 第一版产品目标（MVP）

第一版不是做大而全平台，而是做一个可验证产品方向的最小可行版本。

### 第一版主题
**细胞膜物质运输**

### 第一版支持的过程
- 自由扩散
- 协助扩散
- 主动运输

### 第一版成功标准
如果目标用户能够做到以下几点，则视为第一版成功：

1. 能在较短时间内创建一个可播放的动态示意图
2. 能表达自由扩散、协助扩散、主动运输三类核心过程
3. 能修改对象、文字、数量、速度、方向等关键参数
4. 能在课堂中直接播放演示
5. 能保存工程并再次编辑

---

## 5. 第一版范围与边界

### 第一版必做
- 网页端编辑器
- 编辑器页面骨架
- 细胞膜物质运输主题
- 对象渲染
- 对象选中
- 属性查看与基础属性编辑
- 步骤式动画模型
- 模板机制
- 工程保存 / 加载

### 第一版可选但不强求
- 复制对象
- 删除对象
- 图层前后顺序简单调整
- 背景说明文字块
- 预设箭头样式
- 简单导出为图片

### 第一版明确不做
- 有丝分裂
- 减数分裂
- DNA复制
- 蛋白质合成
- 多场景故事板
- 高级时间轴
- 路径曲线精细编辑
- 多人协作
- 素材商城 / 公共社区
- 视频 / GIF 高质量导出
- AI 自动生成动画
- 移动端编辑适配
- 复杂权限系统

---

## 6. 产品设计原则

1. 前期功能可以少，但架构不能乱
2. 表现层与生物逻辑层必须分开
3. 优先做编辑器，而不是单个动画页面
4. 优先采用数据驱动，而不是写死流程
5. 模板优先，降低老师使用门槛
6. 第一版功能克制，但底层结构要支持未来扩展
7. 不为了短期简单而牺牲长期可演进性

---

## 7. 技术主路线（已确定）

### 前端
- React
- TypeScript
- Vite
- SVG

### 后端
- NestJS
- TypeScript
- Prisma
- PostgreSQL

### Python 的定位
Python **不是主后端语言**。  
Python 保留给后期专项能力，例如：

- 导出视频 / GIF
- 批处理
- 智能辅助生成
- 生物规则脚本
- 素材预处理

### 结论
> 主路线：React + TypeScript + NestJS + PostgreSQL + Prisma  
> Python：后期作为辅助能力，不作为主后端

---

## 8. 为什么选择 PostgreSQL

PostgreSQL 不是随便选的，而是基于以下考虑：

1. 本项目存在明显的关系型数据  
   - 用户
   - 工程
   - 模板
   - 场景
   - 对象
   - 动作
   - 版本

2. 本项目同时存在半结构化数据  
   - 工程内容 JSON
   - 模板内容 JSON
   - 配置数据

3. PostgreSQL 同时适合：
   - 关系型数据管理
   - JSONB 存储与查询
   - 中长期扩展

4. 与 NestJS + Prisma 组合成熟、稳健、资料多

### 数据库存储策略
采用：

> 关系表 + JSONB 工程内容

而不是一开始把所有内容拆成大量细表。

---

## 9. 整体系统架构

采用：

> 前后端分离架构

### 前端职责
- 编辑器界面
- 画布渲染
- 对象编辑
- 属性面板
- 步骤与动作编辑
- 播放控制
- 本地状态管理
- 调用后端接口保存 / 加载工程

### 后端职责
- 用户与认证（第一版可弱化）
- 工程保存 / 读取
- 模板存储与读取
- 素材配置读取
- 后续扩展所需的数据管理能力

### 数据库职责
- 用户数据
- 工程元数据
- 模板元数据
- 工程 JSON 内容
- 模板 JSON 内容
- 后续版本与操作记录

---

## 10. 前端核心架构原则

前端必须按“编辑器型产品”设计，而不是普通展示页面。

### 核心原则

1. 编辑器优先，不做专题死页面
2. 数据驱动优先
3. 表现层与业务模型分离
4. 先做步骤式动画，不急着做高级时间轴
5. 功能克制，结构清晰

---

## 11. 前端总体模块划分

建议模块分层如下：

### app 层
负责：
- 应用入口
- 路由装配
- 全局 providers
- 全局样式初始化

### editor 核心层
负责：
- 编辑器全局状态
- 当前工程加载
- 当前选中对象
- 当前步骤
- 当前播放状态
- 命令调度
- 画布与属性面板之间的数据联动

### canvas 画布层
负责：
- 根据场景数据渲染对象
- 点击、拖拽、选择等交互
- 播放时根据动作更新显示

### object schema / domain 层
负责：
- 对象类型定义
- 默认值
- 校验逻辑
- 工程与模板核心结构

### animation 动画层
负责：
- 动作定义
- 步骤定义
- 动作调度
- 步骤切换
- 播放状态控制

### template 模板层
负责：
- 模板定义
- 模板加载
- 模板转工程

### ui 面板层
负责：
- 顶部工具栏
- 左侧素材区
- 右侧属性面板
- 底部步骤栏
- 对话框与表单

### services 接口层
负责：
- 调用后端 API
- 工程保存
- 工程读取
- 模板读取
- 素材配置读取

---

## 12. 前端推荐目录结构

```text
src/
  main.tsx
  App.tsx

  app/
    routes.tsx

  pages/
    editor/
      EditorPage.tsx

  components/
    layout/
      EditorLayout.tsx
    toolbar/
      TopToolbar.tsx
    sidebar/
      LeftSidebar.tsx
    inspector/
      RightInspector.tsx
    stepbar/
      BottomStepBar.tsx
    canvas/
      CanvasPanel.tsx

  canvas/
    CanvasRoot.tsx
    renderSceneObject.tsx
    renderers/
      MembraneRenderer.tsx
      RegionRenderer.tsx
      ParticleRenderer.tsx
      ProteinRenderer.tsx
      MarkerRenderer.tsx
      TextRenderer.tsx
      ArrowRenderer.tsx

  domain/
    project/
      projectTypes.ts
      createEmptyProject.ts
      mockProject.ts
    objects/
      objectTypes.ts
      objectFactories.ts
    animation/
      animationTypes.ts
    templates/
      templateTypes.ts

  editor/
    store/
      editorStore.ts
    selectors/
      projectSelectors.ts
    mutations/
      objectMutations.ts
      stepMutations.ts
      actionMutations.ts

  services/
    apiClient.ts
    projectService.ts
    templateService.ts

  utils/
    id.ts
    deepClone.ts

  styles/
    global.css
```

---

## 13. 后端总体模块划分

建议后端模块如下：

- auth
- users
- projects
- templates
- assets
- health / system

### projects 模块
负责：
- 工程创建
- 工程保存
- 工程读取
- 工程更新

### templates 模块
负责：
- 模板列表
- 模板详情
- 模板管理

### assets 模块
负责：
- 素材定义
- 素材分类
- 素材配置

---

## 14. 后端推荐目录结构

```text
src/
  main.ts
  app.module.ts

  common/
    dto/
    guards/
    interceptors/
    filters/
    utils/

  modules/
    auth/
    users/
    projects/
      projects.module.ts
      projects.controller.ts
      projects.service.ts
      dto/
    templates/
      templates.module.ts
      templates.controller.ts
      templates.service.ts
      dto/
    assets/
      assets.module.ts
      assets.controller.ts
      assets.service.ts

  prisma/
    prisma.module.ts
    prisma.service.ts
```

---

## 15. 核心数据模型

### 根模型：ProjectDocument

```ts
export interface ProjectDocument {
  metadata: ProjectMetadata
  canvas: CanvasState
  objects: SceneObject[]
  steps: StepDefinition[]
  actions: ActionDefinition[]
  playback: PlaybackConfig
  templateInfo?: TemplateInfo
}
```

---

## 16. 工程基础信息模型

```ts
export interface ProjectMetadata {
  id: string
  title: string
  description?: string
  themeType: ThemeType
  contentVersion: number
  createdAt?: string
  updatedAt?: string
  ownerId?: string
}
```

### ThemeType

```ts
export type ThemeType =
  | 'membrane_transport'
  | 'mitosis'
  | 'meiosis'
  | 'dna_replication'
  | 'protein_synthesis'
```

第一版只实现 `membrane_transport`，但预留扩展位。

---

## 17. 画布模型

```ts
export interface CanvasState {
  width: number
  height: number
  background: string
  zoom: number
  panX: number
  panY: number
  showGrid?: boolean
}
```

---

## 18. 对象模型

### 基础对象

```ts
export interface BaseObject {
  id: string
  type: ObjectType
  name?: string
  x: number
  y: number
  width?: number
  height?: number
  rotation?: number
  visible: boolean
  locked?: boolean
  zIndex?: number
}
```

### ObjectType

```ts
export type ObjectType =
  | 'membrane'
  | 'region'
  | 'particle'
  | 'protein'
  | 'marker'
  | 'text'
  | 'arrow'
```

### SceneObject 联合类型

```ts
export type SceneObject =
  | MembraneObject
  | RegionObject
  | ParticleObject
  | ProteinObject
  | MarkerObject
  | TextObject
  | ArrowObject
```

### 各对象接口

```ts
export interface MembraneObject extends BaseObject {
  type: 'membrane'
  label?: string
  showBilayerDetail: boolean
  styleVariant?: 'basic' | 'detailed'
}

export interface RegionObject extends BaseObject {
  type: 'region'
  label: string
  regionRole: 'inside' | 'outside' | 'custom'
  backgroundStyle?: string
}

export interface ParticleObject extends BaseObject {
  type: 'particle'
  label?: string
  particleName: string
  color: string
  size: number
  count: number
  shape?: 'circle' | 'square' | 'triangle'
  sourceRegionId?: string
  targetRegionId?: string
  movable: boolean
}

export interface ProteinObject extends BaseObject {
  type: 'protein'
  label?: string
  proteinType: 'channel' | 'carrier'
  active?: boolean
  requiresATP?: boolean
}

export interface MarkerObject extends BaseObject {
  type: 'marker'
  markerType: 'atp' | 'gradient' | 'energy' | 'custom'
  text?: string
  color?: string
}

export interface TextObject extends BaseObject {
  type: 'text'
  text: string
  fontSize: number
  color: string
  align?: 'left' | 'center' | 'right'
  fontWeight?: 'normal' | 'bold'
}

export interface ArrowObject extends BaseObject {
  type: 'arrow'
  x2: number
  y2: number
  color: string
  lineWidth?: number
  arrowStyle?: 'solid' | 'dashed'
  label?: string
}
```

---

## 19. 步骤与动作模型

### 步骤模型

```ts
export interface StepDefinition {
  id: string
  name: string
  description?: string
  actionIds: string[]
  order: number
}
```

### 动作基础类型

```ts
export interface BaseAction {
  id: string
  type: ActionType
  targetId: string
  stepId: string
  duration?: number
  delay?: number
}
```

### ActionType

```ts
export type ActionType =
  | 'show'
  | 'hide'
  | 'move'
  | 'change_property'
```

### Point

```ts
export interface Point {
  x: number
  y: number
}
```

### 各动作类型

```ts
export interface ShowAction extends BaseAction {
  type: 'show'
}

export interface HideAction extends BaseAction {
  type: 'hide'
}

export interface MoveAction extends BaseAction {
  type: 'move'
  from: Point
  to: Point
  easing?: 'linear' | 'ease-in' | 'ease-out' | 'ease-in-out'
}

export interface ChangePropertyAction extends BaseAction {
  type: 'change_property'
  changes: Record<string, unknown>
}

export type ActionDefinition =
  | ShowAction
  | HideAction
  | MoveAction
  | ChangePropertyAction
```

---

## 20. 播放配置模型

```ts
export interface PlaybackConfig {
  loop: boolean
  speed: number
  autoPlay?: boolean
}
```

---

## 21. 模板来源信息

```ts
export interface TemplateInfo {
  sourceTemplateId?: string
  sourceTemplateName?: string
}
```

---

## 22. 动画组织方式

第一版采用：

> 步骤式动画模型

也就是：

- 一个完整过程拆成若干步骤
- 每个步骤包含一组动作
- 播放时按步骤推进

### 例：主动运输步骤
1. 初始状态
2. 粒子接近载体
3. 执行运输
4. 到达目标区域
5. 循环或结束

### 采用步骤式动画的原因
- 更符合教学节奏
- 便于播放 / 暂停 / 单步
- 实现更稳
- 后续仍可升级为完整时间轴系统

---

## 23. 模板机制

模板的本质不是视频，而是：

> 一份可编辑的工程初始数据

### 第一版模板
- 自由扩散模板
- 协助扩散模板
- 主动运输模板

### 模板应包含
- 默认场景对象
- 默认布局
- 默认步骤
- 默认动作
- 默认说明文字
- 默认播放参数

### 模板转工程
从模板创建工程，本质上是：
1. 读取模板内容
2. 深拷贝模板内容
3. 替换 metadata 中的 id、标题、时间信息
4. 生成新的工程实例

---

## 24. 工程 JSON 结构草图

```json
{
  "metadata": {
    "title": "主动运输示意图",
    "themeType": "membrane_transport",
    "contentVersion": 1
  },
  "canvas": {
    "width": 1200,
    "height": 800,
    "background": "#ffffff"
  },
  "objects": [
    {
      "id": "membrane-1",
      "type": "membrane",
      "x": 420,
      "y": 250,
      "width": 360,
      "height": 120,
      "showBilayerDetail": true,
      "label": "细胞膜"
    },
    {
      "id": "particle-1",
      "type": "particle",
      "particleName": "Na+",
      "color": "#4A90E2",
      "size": 14,
      "count": 6,
      "sourceRegionId": "outside",
      "targetRegionId": "inside",
      "movable": true,
      "x": 300,
      "y": 300,
      "visible": true
    }
  ],
  "steps": [
    {
      "id": "step-1",
      "name": "初始状态",
      "actionIds": ["action-1", "action-2"],
      "order": 1
    },
    {
      "id": "step-2",
      "name": "穿膜过程",
      "actionIds": ["action-3"],
      "order": 2
    }
  ],
  "actions": [
    {
      "id": "action-1",
      "type": "show",
      "targetId": "membrane-1",
      "stepId": "step-1"
    },
    {
      "id": "action-3",
      "type": "move",
      "targetId": "particle-1",
      "stepId": "step-2",
      "from": { "x": 300, "y": 300 },
      "to": { "x": 900, "y": 300 },
      "duration": 1200
    }
  ],
  "playback": {
    "loop": true,
    "speed": 1
  },
  "templateInfo": {
    "sourceTemplateId": "tpl-active-transport-001"
  }
}
```

---

## 25. 前端状态设计

前端状态分为 4 类：

1. 工程状态
2. UI 状态
3. 播放状态
4. 历史状态（预留）

### 工程状态

```ts
export interface EditorDocumentState {
  project: ProjectDocument | null
  isDirty: boolean
}
```

### UI 状态

```ts
export interface EditorUIState {
  selectedObjectId: string | null
  hoveredObjectId: string | null
  activeTool: ToolType
  leftSidebarTab: LeftSidebarTab
  rightInspectorTab: RightInspectorTab
}
```

#### ToolType

```ts
export type ToolType =
  | 'select'
  | 'pan'
  | 'add-particle'
  | 'add-protein'
  | 'add-text'
  | 'add-arrow'
```

#### LeftSidebarTab

```ts
export type LeftSidebarTab =
  | 'templates'
  | 'materials'
  | 'objects'
```

#### RightInspectorTab

```ts
export type RightInspectorTab =
  | 'properties'
  | 'animation'
  | 'project'
```

### 播放状态

```ts
export interface PlaybackRuntimeState {
  isPlaying: boolean
  currentStepIndex: number
  progress: number
  startedAt?: number
}
```

### 历史状态（预留）

```ts
export interface HistoryState<T> {
  past: T[]
  present: T
  future: T[]
}
```

---

## 26. 状态更新原则

1. 修改工程对象，必须走统一更新入口
2. UI 状态与工程状态分开更新
3. 播放时不要永久污染工程静态数据
4. 工程数据是单一真实来源
5. 组件不要各自私自维护核心工程真值

---

## 27. 渲染态对象模型

为了支持播放，建议引入：

> RenderedObjectState（渲染态对象）

它是运行时视图状态，而不是持久化工程数据。

```ts
export interface RenderedObjectState {
  id: string
  x: number
  y: number
  width?: number
  height?: number
  rotation?: number
  visible: boolean
  extra?: Record<string, unknown>
}
```

### 作用
- 支持播放时的中间状态
- 便于重置
- 便于暂停 / 单步
- 避免直接改坏原始工程对象

---

## 28. 画布渲染分发机制

第一版建议采用简单直接的 switch 分发方式：

```tsx
function renderSceneObject(object: SceneObject) {
  switch (object.type) {
    case 'membrane':
      return <MembraneRenderer object={object} />
    case 'region':
      return <RegionRenderer object={object} />
    case 'particle':
      return <ParticleRenderer object={object} />
    case 'protein':
      return <ProteinRenderer object={object} />
    case 'marker':
      return <MarkerRenderer object={object} />
    case 'text':
      return <TextRenderer object={object} />
    case 'arrow':
      return <ArrowRenderer object={object} />
    default:
      return null
  }
}
```

### 原因
- 直观
- 易调试
- 适合第一版
- 方便后续增加对象类型

---

## 29. API 草图

### 模板相关
- `GET /templates`
- `GET /templates/:id`

### 工程相关
- `POST /projects`
- `GET /projects/:id`
- `PUT /projects/:id`
- `GET /projects`

### 素材相关
- `GET /assets`

### 原则
播放动画主要在前端完成，不依赖后端实时控制。

---

## 30. 前端工程初始化方案

### 初始化技术
- Vite
- React
- TypeScript

### 推荐初始化命令

```bash
npm create vite@latest bio-dynamic-diagram-editor -- --template react-ts
```

或：

```bash
pnpm create vite bio-dynamic-diagram-editor --template react-ts
```

### 第一批建议依赖
- `clsx`
- `prettier`

第一阶段不要急着装太多重库。

---

## 31. 前端首批代码落地目标

第一阶段最小里程碑：

> M0：静态编辑器骨架 + mockProject 驱动的对象渲染 + 对象选中 + 属性查看

### 主链路
类型定义 → 示例工程数据 → 页面骨架 → 画布渲染 → 选中链路 → 属性面板显示

---

## 32. 前端首批核心文件清单

```text
src/
  main.tsx
  App.tsx

  pages/
    editor/
      EditorPage.tsx

  components/
    layout/
      EditorLayout.tsx
    toolbar/
      TopToolbar.tsx
    sidebar/
      LeftSidebar.tsx
    inspector/
      RightInspector.tsx
    stepbar/
      BottomStepBar.tsx
    canvas/
      CanvasPanel.tsx

  canvas/
    CanvasRoot.tsx
    renderSceneObject.tsx
    renderers/
      MembraneRenderer.tsx
      RegionRenderer.tsx
      ParticleRenderer.tsx
      ProteinRenderer.tsx
      MarkerRenderer.tsx
      TextRenderer.tsx
      ArrowRenderer.tsx

  domain/
    project/
      projectTypes.ts
      createEmptyProject.ts
      mockProject.ts
    objects/
      objectTypes.ts
      objectFactories.ts
    animation/
      animationTypes.ts

  editor/
    store/
      editorStore.ts
    selectors/
      projectSelectors.ts

  styles/
    global.css
```

---

## 33. 首批实现顺序

最推荐的顺序：

1. `main.tsx` / `App.tsx`
2. 类型文件：`projectTypes.ts` / `objectTypes.ts` / `animationTypes.ts`
3. `mockProject.ts`
4. `EditorPage.tsx`
5. `EditorLayout.tsx` + 各区域占位组件
6. `editorStore.ts` + `projectSelectors.ts`
7. `CanvasRoot.tsx`
8. `renderSceneObject.tsx`
9. 核心 renderer
10. `RightInspector.tsx`
11. 属性修改
12. `BottomStepBar.tsx`
13. `createEmptyProject.ts` / `objectFactories.ts`

---

## 34. 第一轮开发阶段验收

### 阶段 1：启动成功
- 页面能打开
- 没有 TS 报错

### 阶段 2：类型落地
- 核心类型文件存在
- mockProject 受类型约束

### 阶段 3：布局落地
- 页面有五大区块

### 阶段 4：静态渲染
- SVG 画布中出现膜运输示意图

### 阶段 5：对象选中
- 点击对象可选中
- 右侧能显示对象信息

### 阶段 6：属性查看 / 修改
- 面板能显示并修改基础属性
- 画布更新正确

### 阶段 7：步骤显示
- 底部出现步骤栏

---

## 35. 当前阶段不建议过早做的事情

- 高级动画引擎
- 复杂拖拽系统
- 完整后端联调
- 高级时间轴
- 撤销 / 重做完整系统
- 模板注册系统复杂化
- 快捷键系统
- 框选系统
- 复杂 UI 皮肤
- 多人协作
- AI 能力

---

## 36. 开发者约束

当前开发者背景：

- 有一定 Python 基础
- 前端经验较弱

因此本项目需要满足：

1. 技术方案尽量主流
2. 架构要清晰
3. 第一版复杂度可控
4. 设计文档先行
5. 代码分层明确
6. 不依赖前端黑魔法技术

---

## 37. 风险点提醒

1. 把编辑器做成单个动画页
2. 状态管理混乱
3. 过早追求高级时间轴
4. 对象模型设计过于临时
5. 后端过早做太重
6. 长会话中基于旧版本继续改代码
7. 修改需求描述没有绑定明确基线

---

## 38. 防止“基于旧版本误修改”的协作规范

这是本项目非常重要的一节。

### 原则
以后不要只说“基于最新版本修改”，而要把“最新版本”明确外显。

### 推荐做法
每次重要迭代，都维护一份**当前代码基线说明**。

#### 建议格式

```md
当前基线版本：v0.1.3

已完成：
- 编辑器页面骨架
- mockProject 静态渲染
- 对象选中
- 右侧属性查看

未完成：
- 属性编辑
- 步骤播放
- 工程保存

注意：
- 所有修改必须基于 v0.1.3
- 不允许删除已有的对象选中高亮功能
- 不允许改动当前对象类型定义结构
```

---

## 39. 每次改需求时的推荐格式

建议以后每次提需求，都附带一份小型“变更请求单”。

### 模板

```md
本次变更请求

- 基于版本：v0.1.3
- 修改目标：增加粒子颜色编辑
- 不允许影响：
  - 对象选中逻辑
  - 右侧属性查看
  - mockProject 当前可渲染状态
- 修改完成后应满足：
  - 右侧面板可改 color
  - 画布粒子颜色实时更新
- 不在本次范围内：
  - 动画播放
  - 后端保存
```

---

## 40. 新会话继续项目的推荐启动方式

如果以后要开新会话继续项目，推荐一次性提供：

1. 项目目标摘要
2. 当前技术栈
3. 当前代码基线版本
4. 当前已完成功能
5. 当前未完成功能
6. 本次任务目标
7. 绝不能回退的功能
8. 当前最新代码或关键文件
9. 当前最新 spec / baseline / changelog

### 推荐开场语
> 以下内容是当前有效基线，请以此为唯一准绳，忽略更早版本的实现与旧描述。

这句话非常有用。

---

## 41. 当前阶段的总体结论

本项目当前已经明确：

- 产品方向
- 第一版范围
- 技术主路线
- 数据模型
- 前端状态模型
- 前后端基础架构
- 前端目录落地方式
- 首批代码实现顺序
- 防止上下文漂移的协作规范

### 当前总目标
> 先做出一个网页端的、可编辑的、可保存的、聚焦细胞膜物质运输主题的动态示意图编辑器 MVP。

只要这一目标跑通，后面即可沿同一编辑器框架，逐步扩展到更多高中生物主题。

---

## 42. 建议的后续文件体系

为了长期合作稳定，建议后续本地维护这些文档：

1. `project_master_spec.md`  
   项目主规范（本文档）

2. `current_baseline.md`  
   当前代码基线说明

3. `change_request_xxx.md`  
   单次变更请求单

4. `changelog.md`  
   变更日志 / 决策记录

这样以后无论是在长会话还是新会话中继续项目，都能显著降低误解与版本漂移风险。
