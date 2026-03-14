# 当前代码基线说明

## 1. 基线信息

- 当前基线版本：v0.1.0
- 基线日期：2026-03-14
- 项目名称：生物动态示意图编辑器
- 当前主规范版本：project_master_spec_v0.1.md

---

## 2. 当前技术栈

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

### 备注
- Python 不作为主后端
- Python 预留给后期专项能力，例如导出、批处理、智能辅助等

---

## 3. 当前产品范围

### 当前第一版主题
- 细胞膜物质运输

### 当前第一版支持目标
- 自由扩散
- 协助扩散
- 主动运输

---

## 4. 当前已明确但尚未代码实现的设计基线

以下内容已在规范层面明确，应视为当前有效设计基线：

- 项目是网页端编辑器，不是通用动画软件
- 前后端分离
- 数据驱动
- 步骤式动画模型
- 模板机制
- 对象模型采用联合类型设计
- 前端状态分为 document / ui / playback / history（history 预留）
- 工程根模型为 ProjectDocument
- 数据库存储采用关系表 + JSONB 工程内容

---

## 5. 当前代码完成情况

### 已完成
- 项目主规范文档已建立
- 产品草案已整理
- 技术架构草案已整理
- 数据模型与前端状态设计草案已整理
- 前端工程初始化与目录落地草案已整理
- 前端首批代码文件清单与实现顺序已整理

### 尚未开始或尚未落地
- 前端工程初始化
- 类型文件落地
- mockProject 落地
- 编辑器页面骨架
- 画布渲染
- 对象选中
- 属性面板
- 步骤栏
- 后端工程初始化

---

## 6. 当前首要开发目标

当前最小里程碑：

> M0：静态编辑器骨架 + mockProject 驱动的对象渲染 + 对象选中 + 属性查看

---

## 7. 当前禁止回退或禁止偏移的点

后续开发必须遵守以下约束：

1. 不允许把项目改成桌面端优先
2. 不允许把项目改成通用动画软件路线
3. 不允许将 Python 改为主后端
4. 不允许绕过既定对象模型和工程根模型随意硬编码专题页面
5. 不允许把第一版动画系统改成“纯 setTimeout 硬拼”方案
6. 不允许在没有明确基线更新的前提下删除既定功能或改回旧方案

---

## 8. 当前推荐的首批代码落地顺序

1. main.tsx / App.tsx
2. projectTypes.ts / objectTypes.ts / animationTypes.ts
3. mockProject.ts
4. EditorPage.tsx
5. EditorLayout.tsx + 各区域占位组件
6. editorStore.ts + projectSelectors.ts
7. CanvasRoot.tsx
8. renderSceneObject.tsx
9. 核心 renderer
10. RightInspector.tsx
11. 属性修改
12. BottomStepBar.tsx
13. createEmptyProject.ts / objectFactories.ts

---

## 9. 使用说明

以后每次准备让我修改代码前，建议先更新本文件中的：

- 当前基线版本
- 当前已完成功能
- 当前未完成功能
- 本次禁止回退的内容

然后在会话里明确说明：

> 请基于 current_baseline.md 的当前版本进行修改，并忽略更早版本描述。

