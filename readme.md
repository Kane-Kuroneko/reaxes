# Reaxes

[English](#english) | 简体中文

**以响应式、分布式 Model 编写应用的核心逻辑，并在任何支持 ECMAScript 的宿主环境中运行。一套逻辑，各处通用。**

[![npm](https://img.shields.io/npm/v/reaxes.svg)](https://www.npmjs.com/package/reaxes)
[![license](https://img.shields.io/npm/l/reaxes.svg)](https://www.npmjs.com/package/reaxes)
[![docs](https://img.shields.io/badge/docs-gitbook-blue)](https://kane-7.gitbook.io/reaxes-document)

- 文档：[GitBook](https://kane-7.gitbook.io/reaxes-document)
- 在线示例：[井字棋 · React](https://codesandbox.io/p/sandbox/tic-tac-toe-reactjing-zi-qi-by-reaxes-41ff76)
- 仓库：[CainKane/Reaxes](https://github.com/CainKane/Reaxes)

> 发音：`reaxes` /rɪˈæksɪs/ · `reaxel` /rɪˈæksəl/ · `reaxper` /rɪˈækspər/

---

## 设计理念

Reaxes 的核心主张是：**应用逻辑应与视图、用户输入解耦**。

- 用响应式思维编写业务核心（数据、状态、副作用），而不是把逻辑散落在组件 / Hooks 里
- 一套 `reaxel` 业务模块可在 React、Vue2、Vue3，乃至 Node.js、小程序等支持 `Proxy` 的环境中复用
- 视图层只负责渲染与交互；通过 `reaxper` 等适配器自动追踪依赖并刷新 UI

```text
┌─────────────┐     ┌──────────────┐     ┌─────────────────┐
│  View Layer │ ←── │  reaxper     │ ←── │  reaxel (logic) │
│ React/Vue…  │     │  (adapter)   │     │  createReaxable │
└─────────────┘     └──────────────┘     └─────────────────┘
```

---

## 包索引

本仓库为 Yarn / npm workspaces monorepo（`packages/*`）。按职责大致分为：**核心运行时**、**视图适配器**、**工具与插件**、**示例**。

### 核心

| 包 | 路径 | 说明 | npm |
| --- | --- | --- | --- |
| **reaxes** | [`packages/reaxes`](./packages/reaxes) | 核心库：`reaxel`、`createReaxable`、`obsReaction` 等，框架无关 | [reaxes](https://www.npmjs.com/package/reaxes) |

### 视图适配器

| 包 | 路径 | 说明 | 状态 |
| --- | --- | --- | --- |
| **reaxes-react** | [`packages/reaxes-react`](./packages/reaxes-react) | React 适配：`reaxper` / `Reaxlass`，store 变化时自动刷新组件（React ≥ 16.8） | 已发布 |
| **reaxes-vue3** | [`packages/reaxes-vue3`](./packages/reaxes-vue3) | Vue 3 适配：`reaxper` 等（Vue ≥ 3.2） | 已发布 |
| **reaxes-vue2** | [`packages/reaxes-vue2`](./packages/reaxes-vue2) | Vue 2.7+ 适配；Vue2 已停止演进，仅作兼容维护 | 已发布 |
| **reaxes-angular** | [`packages/reaxes-angular`](./packages/reaxes-angular) | Angular 适配 | 实验 / WIP |
| **reaxes-preact** | [`packages/reaxes-preact`](./packages/reaxes-preact) | Preact 适配 | 占位 / WIP |

### 工具库

| 包 | 路径 | 说明 | npm |
| --- | --- | --- | --- |
| **reaxes-toolkit** | [`packages/reaxes-toolkit`](./packages/reaxes-toolkit) | 面向业务的可复用封装，例如 `rexaStatus`（pending / error） | [reaxes-toolkit](https://www.npmjs.com/package/reaxes-toolkit) |
| **reaxes-utils** | [`packages/reaxes-utils`](./packages/reaxes-utils) | 通用工具集（动态导入、Promise 辅助、浅比较等）；系列库内部也依赖它 | [reaxes-utils](https://www.npmjs.com/package/reaxes-utils) |

> **toolkit vs utils**：`reaxes-toolkit` 面向 Reaxes 使用者，封装基于 reaxes 的局部业务能力；`reaxes-utils` 更通用，也可直接用于业务代码。

### Refaxel 插件（可多实例）

[`refaxel`](./packages/refaxels) 是 **reaxel 的构造体形式**：`reaxel` 通常是全局单例模块，而 `refaxel` 可按参数实例化多份、互不影响。

| 包 / 目录 | 路径 | 说明 |
| --- | --- | --- |
| **refaxel-i18n** | [`packages/refaxels/packages/i18n`](./packages/refaxels/packages/i18n) | 国际化；可同时存在多套语言上下文（如 UI 语言与内容语言） |
| **refaxel-persist** | [`packages/refaxels/packages/persist`](./packages/refaxels/packages/persist) | Store 持久化（变化写入 storage，刷新后还原） |
| **refaxel-lottie** | [`packages/refaxels/packages/lottie`](./packages/refaxels/packages/lottie) | Lottie 动画控制的 reaxel 封装 |
| **schemes** | [`packages/refaxels/packages/schemes`](./packages/refaxels/packages/schemes) | 方案相关扩展（开发中） |

### 实验性 Reaxel 模块

[`packages/reaxels`](./packages/reaxels) 存放可复用 / 试验中的业务模块：

| 模块 | 路径 | 说明 |
| --- | --- | --- |
| persist | [`packages/reaxels/packages/persist`](./packages/reaxels/packages/persist) | 为 reaxel 提供持久化 |
| refaxel-i18n | [`packages/reaxels/packages/refaxel-i18n`](./packages/reaxels/packages/refaxel-i18n) | i18n 相关实验实现 |
| refaxel-themes | [`packages/reaxels/packages/refaxel-themes`](./packages/reaxels/packages/refaxel-themes) | 全局主题（如 dark mode） |
| reaxel-time-machine | [`packages/reaxels/packages/reaxel-time-machine`](./packages/reaxels/packages/reaxel-time-machine) | 时间旅行 / 状态回溯实验 |

### 示例与工程脚本

| 目录 | 说明 |
| --- | --- |
| [`packages/demo`](./packages/demo) | 多框架 Demo（React Next / Vue2 / Vue3），含计数器、井字棋、Todo 等 |
| [`scripts`](./scripts) | monorepo 启动、打包、发布脚本 |
| [`build-tools`](./build-tools) | 构建辅助配置 |
| [`docs`](./docs) | 仓库内补充说明 |

---

## 快速开始

### 安装

```bash
npm i -S reaxes
```

按视图库选择适配器（可选）：

```bash
npm i -S reaxes-react    # React ≥ 16.8（暂不承诺 Concurrent Mode）
npm i -S reaxes-vue3     # Vue ≥ 3.2
npm i -S reaxes-vue2     # Vue ≥ 2.7
```

### 最小示例：业务逻辑（框架无关）

```ts
// reaxels/counter.ts
import { createReaxable, reaxel } from 'reaxes';

export const reaxel_Counter = reaxel(() => {
	const { store, setState, mutate } = createReaxable({
		count: 0,
	});

	return Object.assign(
		() => ({
			get count() {
				return store.count;
			},
			setCount(count: number) {
				setState({ count });
			},
		}),
		{ store, setState, mutate },
	);
});
```

### 在 React 中使用

```tsx
import { reaxper } from 'reaxes-react';
import { reaxel_Counter } from './reaxels/counter';

export const Count = reaxper(() => {
	const { count, setCount } = reaxel_Counter();
	return <div onClick={() => setCount(count + 1)}>count: {count}</div>;
});
```

更多用法见 [完整文档](https://kane-7.gitbook.io/reaxes-document) 与各包目录下的 `publish/readme.md`。

---

## 本地开发

本仓库为 private monorepo（`mono-reaxes`），使用 workspaces 管理子包。

### 环境要求

- Node.js（建议 LTS）
- npm 或 Yarn（仓库含 `yarn.lock`）

### 安装依赖

```bash
# 在仓库根目录
npm install
# 或
yarn
```

### 运行 Demo

```bash
npm start <vm-type> <devserver-port>
```

| 参数 | 说明 |
| --- | --- |
| `<vm-type>` | `react` · `vue2` · `vue3`（另有 angular / solid / svelte 等入口预留） |
| `<devserver-port>` | `0–65535`；若被占用会自动选择临近可用端口 |

快捷脚本：

```bash
npm run start:react   # 默认端口 4399
npm run start:vue2    # 默认端口 8964
npm run start:vue3    # 默认端口 7788
```

Demo 工程位于 [`packages/demo/view-libs`](./packages/demo/view-libs)。

### 打包子包

```bash
npm run build <package-or-subpackage>
```

示例：

```bash
npm run build reaxes
npm run build refaxels/i18n
```

### 发布（维护者）

详见 [`dev.md`](./dev.md)。概要：

```bash
npm run publish <packageName> <tag> <releaseType>
# 例：预发布
npm run publish reaxes prerelease beta
```

`packageName` 可为：`reaxes`、`reaxes-react`、`reaxes-vue2`、`reaxes-vue3`、`reaxes-toolkit`、`reaxes-utils`、`refaxels/*`、`reaxels/*` 等。

---

## 目录结构（简图）

```text
reaxes/
├── packages/
│   ├── reaxes/              # 核心
│   ├── reaxes-react/        # React 适配
│   ├── reaxes-vue2/         # Vue2 适配
│   ├── reaxes-vue3/         # Vue3 适配
│   ├── reaxes-angular/      # Angular（WIP）
│   ├── reaxes-preact/       # Preact（WIP）
│   ├── reaxes-toolkit/      # 业务工具（rexaStatus 等）
│   ├── reaxes-utils/        # 通用工具
│   ├── refaxels/            # 可多实例插件（i18n / persist / lottie…）
│   ├── reaxels/             # 实验性业务模块
│   └── demo/                # 多框架演示
├── scripts/                 # start / build / publish
├── build-tools/
├── docs/
└── readme.md
```

---

## 版本说明

`1.x` 大版本仍可能调整 API：中间版本号 bump 时，接口有可能变更或删除。生产使用前请锁定版本并查阅 [更新文档](https://kane-7.gitbook.io/reaxes-document)。

视图库兼容范围以官方文档为准；超出声明范围或许能跑，但相关 issue / PR 可能不会被优先处理。

---

## 许可证

[WTFPL](http://www.wtfpl.net/)

---

## English

**Reaxes** is a distributed, reactive way to write your app’s core logic — decoupled from the view layer — and reuse it across React, Vue, Node.js, and other Proxy-capable hosts.

| Layer | Packages |
| --- | --- |
| Core | [`reaxes`](https://www.npmjs.com/package/reaxes) |
| View adapters | `reaxes-react`, `reaxes-vue3`, `reaxes-vue2` (+ Angular / Preact WIP) |
| Tooling | `reaxes-toolkit`, `reaxes-utils` |
| Plugins | `refaxel-i18n`, persist, lottie, … under `packages/refaxels` |
| Demos | `packages/demo` |

```bash
npm i -S reaxes reaxes-react
```

Docs: [GitBook](https://kane-7.gitbook.io/reaxes-document) · Playground: [Tic-Tac-Toe](https://codesandbox.io/p/sandbox/tic-tac-toe-reactjing-zi-qi-by-reaxes-41ff76)

See the Chinese sections above for monorepo layout, package index, and local `npm start` / `npm run build` workflows.
