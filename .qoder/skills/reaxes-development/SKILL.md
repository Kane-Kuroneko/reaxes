---
name: reaxes-development
description: Guide for developing with Reaxes architecture - a MobX-based reactive state management framework for multi-framework applications (React/Vue/Angular/Solid). Use when working with reaxel state modules, createReaxable stores, reaxper components, or building reactive UIs with the Reaxes ecosystem.
---

# Reaxes 开发指南

## 核心概念

Reaxes 是基于 MobX 的响应式状态管理架构，提供统一的Model层编程范式,计划支持多种UI框架（React/Vue2/Vue3(以上已实现) Angular/Solid/Svelte(暂未实现)）。

### 三大核心 API

| API              | 用途                      | 示例                                                        |
|------------------|-------------------------|-----------------------------------------------------------|
| `createReaxable` | 创建响应式状态 store           | `const {store, setState, mutate} = createReaxable({...})` |
| `reaxel`         | 构建分布式 & 响应式的业务逻辑/基础设施模块 | `export const reaxel_Core = reaxel(() => {...})`          |
| `reaxper`        | 包装响应式组件                 | `export const MyComponent = reaxper(() => {...})`         |

## Reaxel：分布式响应式业务逻辑模块

**核心理解**：`reaxel` 不是简单的“状态管理模块”，而是**分布式 & 响应式的业务逻辑或基础设施模块**。

### Reaxel 的本质特征

1. **分布式**：每个 reaxel 是独立自治的模块，可以在应用的任何位置被调用，无需通过 props 逐层传递
2. **响应式**：内部基于 MobX observable store，状态变化自动触发依赖更新
3. **业务逻辑封装**：不仅管理状态，还封装了完整的业务逻辑、数据处理和对外 API
4. **基础设施能力**：可以作为基础设施模块（如 i18n、theme、router、persist）提供服务
5. **单一实例**：每个 reaxel 在应用中是全局单例，任何地方调用都返回相同实例
6. **跨组件共享**：多个组件可以直接调用同一个 reaxel，共享状态和业务逻辑

### Reaxel 的职责范围

```typescript
export const reaxel_模块名 = reaxel(() => {
    // 1. 状态管理（基于 createReaxable）
    const { store, setState, mutate } = createReaxable({
        // 响应式状态数据
    });
    
    // 2. 业务逻辑封装（方法、算法、流程控制）
    const businessMethod = () => {
        // 复杂的业务逻辑处理
    };
    
    // 3. 基础设施能力（持久化、IPC 通信、路由、国际化等）
    rehance_BrowserPersist('key')({ store, setState });
    
    // 4. 响应式副作用（状态变化自动触发）
    obsReaction(() => {
        // 自动响应状态变化，执行副作用
    }, () => [store.xxx]);
    
    // 5. 对外 API（供组件或其他 reaxel 调用）
    const rtn = {
        // 业务方法
        businessMethod,
        // 数据操作方法
        updateData() { /* ... */ },
        // 查询方法
        getFilteredData() { /* ... */ },
    };
    
    return Object.assign(() => rtn, { store, setState, mutate });
});
```

### Reaxel 的典型应用场景

| 场景类型     | 示例                      | 说明                  |
|----------|-------------------------|---------------------|
| **业务模块** | `reaxel_HotkeyEnhancer` | 封装特定业务功能（快捷键增强）     |
| **数据管理** | `reaxel_CheatCodes`     | 管理特定领域数据（作弊码列表）     |
| **基础设施** | `reaxel_I18n`           | 提供国际化服务             |
| **基础设施** | `reaxel_Theme`          | 提供主题管理服务            |
| **基础设施** | `reaxel_GUI_Core`       | 管理路由/全局状态           |
| **跨层通信** | `reaxel_IPC`            | Electron 主进程/渲染进程通信 |
| **外部集成** | `reaxel_Lottie`         | 封装 Lottie 动画引擎      |

## 状态管理模式

### 1. 创建 Reaxable Store

```typescript
const { store, setState, mutate, merge } = createReaxable({
    count: 0,
    profile: {
        name: 'John',
        age: 30,
    },
    tags: ['developer'],
});
```

**返回对象说明**：
- `store`: 响应式状态对象（读取）
- `setState`: 浅层更新（支持链式路径访问）
- `mutate`: 深层可变更新（通过回调函数）
- `merge`: 深度合并更新

### 2. 更新状态的三种方式

```typescript
// 方式1: setState - 浅层赋值更新
setState({ count: store.count + 1 });
setState.profile({ name: 'Jane' });  // 链式路径

// 方式2: mutate - 深层可变更新
mutate.profile(p => {
    p.name = 'Jane';
    p.age = 25;
});
mutate.profile.address(addr => {
    addr.city = 'Los Angeles';
});

// 方式3: merge - 深度合并
merge({
    profile: {
        address: {
            city: 'New York'
        }
    }
});
```

### 3. 构建 Reaxel 模块

```typescript
// reaxels/hotkey-enhancer/index.ts
export const reaxel_HotkeyEnhancer = reaxel(() => {
    const { store, setState, mutate } = createReaxable({
        switch_main: false,
        checkbox_AutoSwitch: true,
        switch_forbidWheelsZoom: true,
    });
    
    // 可选：持久化增强器
    rehance_BrowserPersist('GUI')({ store, setState });
    
    // 响应式副作用 - 同步状态到 IPC
    obsReaction((first) => {
        if (first) return;
        IpcRendererSend('ahk').send([
            { key: 'switch_main', value: store.switch_main },
        ]);
    }, () => [store.switch_main]);
    
    // 业务方法 - 使用 mutate 修改状态
    const toggleMainSwitch = (value = !store.switch_main) => {
        if (store.checkbox_AutoSwitch) return;
        mutate(s => s.switch_main = value);
    };
    
    const toggleWheelsZoom = (value = !store.switch_forbidWheelsZoom) => {
        mutate(s => s.switch_forbidWheelsZoom = value);
    };
    
    // 返回对象：只包含业务方法
    const rtn = {
        toggleMainSwitch,
        toggleWheelsZoom,
        spawnAHK() { /* ... */ },
        shutdownAHK() { /* ... */ },
    };
    
    // 使用 Object.assign 挂载 store/setState/mutate
    return Object.assign(() => rtn, {
        store,
        setState,
        mutate,
    });
});
```

**关键约定**：
- 导出命名为 `reaxel_模块名`（大驼峰）
- `rtn` 对象只包含业务方法，不包含 store/setState/mutate
- 使用 `Object.assign(() => rtn, { store, setState, mutate })` 模式
- 组件可直接访问 `reaxel_模块名.store.xxx` 读取状态
- 组件调用 `reaxel_模块名().方法名()` 执行业务逻辑

## 组件开发

### React 函数组件（推荐）

```tsx
// components/Main-Switch/index.tsx
export const MainSwitch = reaxper(() => { //必须用reaxper包裹才会根据响应式数据变化而自动更新
    // 调用 reaxel 获取业务方法
    const { toggleMainSwitch, toggleAutoSwitch } = reaxel_HotkeyEnhancer();
    
    // 直接访问 store 读取状态（响应式）
    return (
        <div className={less.mainSwitchContainer}>
            <Switch
                value={reaxel_HotkeyEnhancer.store.switch_main}
                checkedChildren={<span>Activing <LoadingOutlined /></span>}
                unCheckedChildren={i18n("Enable")}
                onChange={() => {
                    if (reaxel_HotkeyEnhancer.store.checkbox_AutoSwitch) {
                        notification.warning({
                            message: <I18n>When automatic detection is enabled...</I18n>,
                        });
                    }
                    toggleMainSwitch();
                }}
            />
            <Checkbox 
                indeterminate={reaxel_HotkeyEnhancer.store.checkbox_AutoSwitch}
                onChange={(e) => toggleAutoSwitch(e.target.value)}
            />
        </div>
    );
});

import { reaxper } from 'reaxes-react';
import { reaxel_HotkeyEnhancer } from '#renderer/reaxels/hotkey-enhancer';
```

### React 类组件（支持 Hooks）

**重要**：`Reaxlass` 继承自 React `Component`，通过 `reaxper` 包装后，**可以在类组件的 render 方法中使用 React Hooks**！

```tsx
export const Test_Reaxel_i18n = reaxper(class extends Reaxlass {
    // 类属性 - 调用 reaxel 获取方法（不是 Hooks）
    reaxel_i18n_instance = reaxel_i18n();
    
    render() {
        // 在 render 中调用 reaxel 获取响应式数据
        const { changeLang, I18n, language, languageList } = reaxel_i18n();
        
        // 可以使用 React Hooks！（reaxper 内部处理）
        const [localState, setLocalState] = useState('initial');
        const prevRef = useRef<string>();
        
        useEffect(() => {
            console.log('Component mounted');
            return () => console.log('Component unmounted');
        }, []);
        
        useEffect(() => {
            // 监听 language 变化
            console.log('Language changed to:', language);
        }, [language]);
        
        return (
            <div>
                <select
                    value={language}
                    onChange={(e) => changeLang(e.target.value)}
                >
                    {languageList.map(({ lang, name }) => (
                        <option value={lang} key={lang}>{name}</option>
                    ))}
                </select>
                <p><I18n>By stakeholders, for stakeholders.</I18n></p>
            </div>
        );
    }
});

import { reaxper, Reaxlass } from 'reaxes-react';
import { useState, useEffect, useRef } from 'react';
```

### 类组件特性

`Reaxlass` 提供了一些额外的生命周期管理功能：

```typescript
export const AdvancedComponent = reaxper(class extends Reaxlass {
    // 调用 reaxel
    myReaxel = reaxel_MyModule();
    
    // 生命周期栈（高级功能）
    mountedStack = [
        { callback: () => console.log('mounted'), id: 'init' },
    ];
    unmountStack = [
        { callback: () => cleanup(), id: 'cleanup' },
    ];
    
    // 自定义 render 方法
    render() {
        const { data } = reaxel_MyModule();
        
        // 可以使用所有 React Hooks
        const [count, setCount] = useState(0);
        const memoizedValue = useMemo(() => computeExpensive(data), [data]);
        
        return <div>{memoizedValue}</div>;
    }
    
    // didMount 和 didUpdate 都要执行的逻辑
    componentDidRender(stage: 'mount' | 'update', prevProps, prevState, snapshot) {
        if (stage === 'mount') {
            console.log('First render');
        } else {
            console.log('Re-rendered');
        }
    }
});
```

### 类组件 vs 函数组件

| 特性        | 函数组件       | 类组件（Reaxlass）                            |
|-----------|------------|------------------------------------------|
| Hooks 支持  | ✅ 原生支持     | ✅ reaxper 包装后支持                          |
| reaxel 调用 | render 内调用 | 类属性或 render 内调用                          |
| 状态管理      | useState   | this.state 或 useState                    |
| 生命周期      | useEffect  | componentDidMount 等 + componentDidRender |
| 推荐度       | ⭐⭐⭐⭐⭐ 推荐   | ⭐⭐⭐ 可选                                   |
| 使用场景      | 大多数场景      | 需要类特性或迁移旧代码                              |

## 去重回调（distinctCallback）

`distinctCallback` 是一个**在组件外部创建、在组件内部调用**的智能回调包装器。它通过浅比较依赖数组来避免不必要的执行，**无需使用 React Hooks**。

### 核心特性

- **创建位置**：在 reaxel 模块内部或组件外部（模块级别）
- **调用位置**：在 React 组件内直接调用（函数组件或类组件均可）
- **执行条件**：仅在依赖发生变化时才执行回调
- **无需 Hooks**：不需要 `useEffect`、`useMemo` 等 React Hooks

### 基本用法

```typescript
// 在 reaxel 模块内部创建
export const reaxel_Auth = reaxel(() => {
    const { store, setState } = createReaxable({
        input_username: '',
        token: null as string | null,
    });
    
    // 创建 distinctCallback - 监听 input_username 变化
    const distinctUsernameHandler = distinctCallback(
        (actionType: string) => {
            console.log('Username changed to:', store.input_username, 'Action:', actionType);
            // 只有当 input_username 真正改变时才执行
            // 可以执行副作用：发送请求、更新其他状态等
        },
        () => [store.input_username]  // 依赖数组
    );
    
    const rtn = {
        setInputName(name: string) {
            setState({ input_username: name });
        },
        // 暴露 invoker 给组件使用
        distinctUsernameHandler,
    };
    
    return Object.assign(() => rtn, { store, setState, mutate });
});
```

### 在组件中使用

```tsx
// 函数组件中使用
export default reaxper(() => {
    const { setInputName, distinctUsernameHandler } = reaxel_Auth();
    
    // 直接调用 - 只有 input_username 改变时才执行回调
    distinctUsernameHandler(() => [reaxel_Auth.store.input_username])('login');
    
    return (
        <div>
            <input
                value={reaxel_Auth.store.input_username}
                onChange={(e) => {
                    setInputName(e.target.value);
                    // 每次 input 变化都调用，但回调只在值真正改变时执行
                    distinctUsernameHandler(() => [reaxel_Auth.store.input_username])('input');
                }}
            />
        </div>
    );
});
```

### 高级模式：配合 resetDeps

```tsx
// 创建时返回 [invoker, resetDeps]
const [distinctInvoker, resetDeps] = distinctCallback(
    (name: string, age: number) => {
        console.log('User info changed:', name, age);
    },
    () => [store.name, store.age]
);

// 在 reaxel 中暴露
const rtn = {
    distinctInvoker,
    resetDeps,  // 重置依赖缓存，强制下次执行
    updateUserInfo(name: string, age: number) {
        setState({ name, age });
    },
};

// 组件中使用
export const UserProfile = reaxper(() => {
    const { distinctInvoker, resetDeps, updateUserInfo } = reaxel_User();
    
    // 调用时传入最新的依赖获取函数和参数
    distinctInvoker(() => [reaxel_User.store.name, reaxel_User.store.age])
        (reaxel_User.store.name, reaxel_User.store.age);
    
    // 需要时重置依赖缓存
    const handleReset = () => {
        resetDeps();
    };
    
    return <button onClick={handleReset}>Reset Deps</button>;
});
```

### 与 obsReaction 的对比

| 特性       | `distinctCallback` | `obsReaction`    |
|----------|--------------------|------------------|
| 创建位置     | 组件外部（reaxel 内）     | reaxel 内或组件内     |
| 调用方式     | 手动调用 invoker       | 自动监听依赖变化         |
| 执行时机     | 调用时检查依赖            | 依赖变化时自动执行        |
| 使用场景     | 事件处理、用户交互          | 副作用、状态同步         |
| 需要 Hooks | ❌ 不需要              | ❌ 不需要            |
| 首次执行     | 不调用不执行             | 立即执行（first=true） |

### 实际应用场景

**场景 1：表单输入防抖处理**
```tsx
// reaxel 内创建
export const reaxel_Search = reaxel(() => {
    const { store, setState } = createReaxable({
        query: '',
        results: [],
    });
    
    // 只在 query 真正改变时才发起搜索请求
    const distinctSearch = distinctCallback(
        async () => {
            if (store.query.trim()) {
                const results = await fetchSearchResults(store.query);
                setState({ results });
            }
        },
        () => [store.query]
    );
    
    return Object.assign(() => ({ distinctSearch }), { store, setState });
});

// 组件中使用
export const SearchBox = reaxper(() => {
    const { distinctSearch } = reaxel_Search();
    
    return (
        <input
            onChange={(e) => {
                reaxel_Search.setState({ query: e.target.value });
                // 安全调用 - 只有 query 真正改变时才发起请求
                distinctSearch(() => [reaxel_Search.store.query])();
            }}
        />
    );
});
```

**场景 2：多依赖条件执行**
```typescript
// 监听多个状态，任一改变才执行
export const distinctProfileUpdate = distinctCallback(
    () => {
        console.log('Profile updated:', {
            name: store.name,
            age: store.age,
            email: store.email,
        });
        updateProfileAPI(store);
    },
    () => [store.name, store.age, store.email]
);
```

## 响应式副作用

### obsReaction - 依赖追踪反应

```typescript
obsReaction(
    (first, disposer) => {
        if (first) {
            // 首次执行
            console.log('Initial:', store.count);
            return;
        }
        // 依赖变化时执行
        console.log('Changed:', store.count);
    },
    () => [store.count, store.profile.name]  // 依赖数组
);
```

**特点**：
- 自动浅比较依赖数组
- `first` 参数标识首次调用
- `disposer` 用于清理副作用
- 类似 MobX reaction 但优化了重复触发

### collectDeps - 手动收集依赖

```typescript
// 在组件中手动指定监听的属性
collectDeps(store, ['count', 'profile']);
// 不传第二个参数则监听整个 store
collectDeps(store);
```

## 项目架构规范

### 目录结构

```
src/
├── reaxels/              # 状态管理模块
│   ├── core/
│   │   └── index.tsx     # reaxel_Core
│   ├── user/
│   │   └── index.tsx     # reaxel_User
│   └── settings/
│       └── index.tsx     # reaxel_Settings
├── components/           # UI 组件
│   ├── SporeList/
│   │   └── index.tsx
│   └── UserCard/
│       └── index.tsx
└── views/                # 页面视图
    └── Dashboard/
        └── index.tsx
```

### 命名约定（最新范式）

| 类型          | 命名模式                  | 示例                                           |
|-------------|-----------------------|----------------------------------------------|
| Reaxel 模块   | `reaxel_模块名`（大驼峰）     | `reaxel_HotkeyEnhancer`, `reaxel_CheatCodes` |
| Store 访问    | `reaxel_模块名.store`    | `reaxel_HotkeyEnhancer.store.switch_main`    |
| SetState 访问 | `reaxel_模块名.setState` | `reaxel_HotkeyEnhancer.setState({...})`      |
| Mutate 访问   | `reaxel_模块名.mutate`   | `reaxel_HotkeyEnhancer.mutate(s => ...)`     |
| 业务方法        | 放在 `rtn` 对象中          | `toggleMainSwitch()`, `dragToSort()`         |
| 响应式组件       | 大驼峰                   | `MainSwitch`, `HotkeyEnhancer`               |

### 导入顺序

```typescript
// 1. 本地 reaxel 导入
import { reaxel_Core, Spore } from '#reaxels/core';

// 2. reaxes 框架导入
import { reaxper } from 'reaxes-react';
import { createReaxable, obsReaction } from 'reaxes';

// 3. 第三方库
import Button from 'antd/lib/button';

// 4. 样式文件
import * as less from './index.module.less';
```

## 构建与运行

### 开发环境

```bash
# 启动 React 开发服务器
npm start react 4399

# 启动 Vue3 开发服务器
npm start vue3 7788

# 启动 Vue2 开发服务器
npm start vue2 8964
```

### 构建打包

```bash
# 构建 reaxes 核心库
npm run build reaxes

# 构建子包
npm run build refaxels/i18n
```

### 发布

```bash
# 发布 patch 版本
npm run publish reaxes patch

# 发布 alpha 版本
npm run publish reaxes patch alpha
```

## 常见模式

### 模式 1: 多 Reaxel 协作（最新范式）

```tsx
export const HotkeyEnhancer = reaxper(() => {
    // 直接访问 store 读取响应式状态
    const { language } = reaxel_I18n();
    
    // 调用业务方法（如果需要）
    const { toggleMainSwitch } = reaxel_HotkeyEnhancer();
    
    return (
        <MainConententAreaContainer>
            <div style={{ width: languageWidthMap[language] }}>
                <AltInventory />
                <ForbidMouseWheels />
                <ReplaceF6 />
                <MainSwitch />
            </div>
        </MainConententAreaContainer>
    );
});
```

### 模式 2: 直接访问 Store（推荐）

```tsx
export const Cheats = reaxper(() => {
    // 获取业务方法
    const { dragToSort } = reaxel_CheatCodes();
    
    // 直接访问 store 获取数据（响应式）
    const onDragEnd = ({ active, over }: DragEndEvent) => {
        if (active.id !== over?.id) {
            const originalCopy = [...reaxel_CheatCodes.store.cheatCodesData];
            const activeIndex = originalCopy.findIndex(i => i.key === active.id);
            const overIndex = originalCopy.findIndex(i => i.key === over?.id);
            dragToSort(arrayMove(originalCopy, activeIndex, overIndex));
        }
    };
    
    return (
        <DndContext onDragEnd={onDragEnd}>
            <SortableContext items={reaxel_CheatCodes.store.cheatCodesData.map(i => i.key)}>
                <Table dataSource={reaxel_CheatCodes.store.cheatCodesData} />
            </SortableContext>
        </DndContext>
    );
});
```

### 模式 2: 条件渲染

```tsx
export const AuthGuard = reaxper(() => {
    const { User_Store } = reaxel_User();
    
    if (!User_Store.isAuthenticated) {
        return <LoginPage />;
    }
    
    return <Dashboard />;
});
```

### 模式 3: 列表操作

```tsx
const addItem = (item: Item) => {
    setState({
        items: [...store.items, item]
    });
};

const removeItem = (id: string) => {
    setState({
        items: store.items.filter(i => i.id !== id)
    });
};

const updateItem = (id: string, updates: Partial<Item>) => {
    mutate.items(items => {
        const item = items.find(i => i.id === id);
        if (item) {
            Object.assign(item, updates);
        }
    });
};
```

## 高级模式与最佳实践

### 模式 3: 列表操作与拖拽排序

```typescript
export const reaxel_CheatCodes = reaxel(() => {
    const { store, setState, mutate } = createReaxable({
        cheatCodesData: [...originalCheatCodesData] as DataType[],
    });
    
    // 持久化
    rehance_BrowserPersist('|cheat-codes|')({ store, setState });
    
    const rtn = {
        // 拖拽排序 - 替换整个数组
        dragToSort(cheatCodesData: DataType[]) {
            setState({ cheatCodesData });
        },
        // 重置数据
        resetCheatCodes() {
            setState({ cheatCodesData: originalCheatCodesData });
        },
        // 添加单项（使用 setState）
        addCheatCode(code: DataType) {
            setState({
                cheatCodesData: [...store.cheatCodesData, code],
            });
        },
        // 更新单项（使用 mutate）
        updateCheatCode(key: string, updates: Partial<DataType>) {
            mutate.cheatCodesData(data => {
                const item = data.find(i => i.key === key);
                if (item) {
                    Object.assign(item, updates);
                }
            });
        },
        // 删除单项（使用 setState + filter）
        removeCheatCode(key: string) {
            setState({
                cheatCodesData: store.cheatCodesData.filter(i => i.key !== key),
            });
        },
    };
    
    return Object.assign(() => rtn, { store, setState, mutate });
});
```

### 模式 4: IPC 通信与状态同步

```typescript
export const reaxel_HotkeyEnhancer = reaxel(() => {
    const { store, setState, mutate } = createReaxable({
        switch_main: false,
        switch_forbidWheelsZoom: true,
    });
    
    // 监听 IPC 事件 - 更新本地状态
    IpcRendererOn('ahk-cp-status').on((e, data) => {
        setState({ switch_main: data });
    });
    
    // 初始化时发送当前状态到主进程
    IpcRendererSend('ahk').send([
        { key: 'switch_main', value: store.switch_main },
        { key: 'switch_forbidWheelsZoom', value: store.switch_forbidWheelsZoom },
    ]);
    
    // 状态变化时自动同步到主进程
    obsReaction((first) => {
        if (first) return;
        IpcRendererSend('ahk').send([
            { key: 'switch_main', value: store.switch_main },
        ]);
    }, () => [store.switch_main]);
    
    obsReaction((first) => {
        if (first) return;
        IpcRendererSend('ahk').send([
            { key: 'switch_forbidWheelsZoom', value: store.switch_forbidWheelsZoom },
        ]);
    }, () => [store.switch_forbidWheelsZoom]);
    
    const rtn = {
        toggleMainSwitch(value = !store.switch_main) {
            mutate(s => s.switch_main = value);
        },
    };
    
    return Object.assign(() => rtn, { store, setState, mutate });
});
```

### 模式 5: Hash 路由管理

```typescript
export const reaxel_GUI_Core = reaxel(() => {
    const { store, setState, mutate } = createReaxable({
        hash: '#/hotkey-enhancer',
    });
    
    // 持久化路由状态
    rehance_BrowserPersist('GUI_Core')({ store, setState });
    
    // 初始化：如果 URL 有 hash 则同步到 store，否则设置 URL
    obsReaction((first) => {
        const hash = location.hash;
        if (first && hash.replace('#/', '')) {
            setState({ hash });
            return;
        } else {
            location.hash = store.hash;
        }
    }, () => [store.hash]);
    
    // 监听 hashchange 事件
    window.addEventListener('hashchange', () => {
        setState({ hash: location.hash });
    });
    
    return Object.assign(() => ({}), { store, setState, mutate });
});
```

### 模式 6: 嵌套 Refaxel 组合

```typescript
export const reaxel_Theme = reaxel(() => {
    const { store, setState, mutate } = createReaxable({});
    
    // 嵌套使用 Refaxel_Lottie
    const reaxel_Lottie = Refaxel_Lottie({
        schemes: [
            { name: "dark" as const, segments: [19, 80] },
            { name: "light" as const, segments: [100, 173] },
        ] as const,
        defaultScheme: 'dark',
        animationData: lottieJSON,
    });
    
    // 响应式副作用 - 监听内部 reaxel 的状态变化
    obsReaction(() => {
        document.documentElement.setAttribute(
            'theme', 
            reaxel_Lottie.store.currentScheme
        );
    }, () => [reaxel_Lottie.store.currentScheme]);
    
    const rtn = {
        get theme() {
            return reaxel_Lottie.store.currentScheme;
        },
        toggleTheme(theme) {
            reaxel_Lottie().toggleTo(theme);
        },
    };
    
    return Object.assign(() => rtn, {
        store,
        setState,
        mutate,
        reaxel_Lottie,  // 暴露内部 reaxel 供外部使用
    });
});
```

### 模式 7: 统一导出（Exports）

```typescript
// reaxels/exports.ts
// 从 reaxel_I18n 提取常用导出，方便其他模块使用
export const { i18n } = reaxel_I18n();
export const I18n = createI18nReactComponent(reaxel_I18n);

// 使用方：
// import { i18n, I18n } from '#renderer/reaxels/exports';
```

## 注意事项（重要）

1. **最新范式 - Object.assign 模式**: 
   ```typescript
   return Object.assign(() => rtn, { store, setState, mutate });
   ```
   - `rtn` 只包含业务方法
   - `store/setState/mutate` 挂载到工厂函数上供直接访问

2. **组件读取状态**: 直接访问 `reaxel_模块名.store.xxx`（在 reaxper 内自动响应）
3. **组件调用方法**: 使用 `reaxel_模块名().方法名()`
4. **避免直接修改 store**: 始终使用 `setState`/`mutate`/`merge`
5. **obsReaction 依赖数组**: 确保列出所有依赖的属性，使用 `if (first) return` 跳过首次执行
6. **TypeScript 类型**: 为 store 定义明确的接口类型，使用 `as Type[]` 初始化数组

## 与 MobX 的关系

Reaxes 底层使用 MobX，但提供了更简洁的 API：

| MobX         | Reaxes              | 说明           |
|--------------|---------------------|--------------|
| `observable` | `createReaxable`    | 创建响应式状态      |
| `action`     | 内置于 setState/mutate | 自动包装         |
| `reaction`   | `obsReaction`       | 优化版 reaction |
| `observer`   | `reaxper`           | 组件包装器        |
| `toJS`       | 从 reaxes 导出         | 相同功能         |

## 扩展包 (Refaxels)

Reaxes 提供官方扩展包：

- **refaxel-i18n**: 国际化支持
- **refaxel-persist**: 状态持久化
- **refaxel-themes**: 主题管理
- **reaxel-time-machine**: 时间旅行调试

```typescript
// 使用持久化扩展
import Persist from 'refaxel-persist';

export const reaxel_User = reaxel(() => {
    const { store, setState } = createReaxable({
        profile: { name: '', email: '' }
    });
    
    // 自动持久化到 localStorage
    new Persist(store, 'user');
    
    return () => ({ User_Store: store });
});
```
