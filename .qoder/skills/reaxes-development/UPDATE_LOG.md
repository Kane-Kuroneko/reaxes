# Reaxes SKILL 更新日志

## 2026-04-24 - 第二次更新（重要补充）

### 新增内容

#### 1. distinctCallback 完整说明（重要修正）

**核心理解**：
- `distinctCallback` 是**在组件外部创建、在组件内部调用**的智能回调包装器
- 通过浅比较依赖数组来避免不必要的执行
- **无需使用 React Hooks**

**新增章节**：
- 核心特性说明（创建位置、调用位置、执行条件）
- 基本用法示例（在 reaxel 内创建，组件内调用）
- 高级模式：配合 resetDeps
- 与 obsReaction 的对比表格
- 实际应用场景：
  - 场景 1：表单输入防抖处理
  - 场景 2：多依赖条件执行

**关键示例**：
```typescript
// reaxel 内创建
const distinctSearch = distinctCallback(
    async () => { /* 只在 query 改变时执行 */ },
    () => [store.query]
);

// 组件内调用
distinctSearch(() => [reaxel_Search.store.query])();
```

#### 2. Reaxlass 类组件 Hooks 支持

**重要说明**：
- `Reaxlass` 继承自 React `Component`
- 通过 `reaxper` 包装后，**可以在类组件的 render 方法中使用 React Hooks**
- 这是很多开发者不知道的特性！

**新增内容**：
- 类组件中使用 Hooks 的完整示例
- 类组件特性说明（mountedStack、unmountStack、componentDidRender）
- 类组件 vs 函数组件对比表格
- 实际项目示例（Test_Reaxel_i18n）

**关键示例**：
```typescript
export const TestComponent = reaxper(class extends Reaxlass {
    render() {
        // 可以使用 React Hooks！
        const [localState, setLocalState] = useState('initial');
        const prevRef = useRef<string>();
        
        useEffect(() => {
            console.log('Component mounted');
            return () => console.log('Component unmounted');
        }, []);
        
        return <div>...</div>;
    }
});
```

### 修正内容

- 移除了过时的“类组件（可选）”简单示例
- 替换为完整的类组件 Hooks 支持说明
- 新增“去重回调（distinctCallback）”独立章节（位于“响应式副作用”之前）

---

## 2026-04-24 - 基于最新范式更新

### 更新来源
参考项目：`Z:\electron-reaxes-react\projects\Autohotkey-GUI\projects\War3\src\Renderer\reaxels`

### 主要变更

#### 1. Reaxel 模块构建模式（重大更新）

**旧范式**（已过时）：
```typescript
const rtn = {
    Core_Store: store,      // ❌ 不再将 store 放在 rtn 中
    Core_SetState: setState,
    Core_Mutate: mutate,
    addSpore,
};
return () => rtn;  // ❌ 简单返回工厂函数
```

**新范式**（最新实践）：
```typescript
const rtn = {
    toggleMainSwitch,  // ✅ 只包含业务方法
    toggleWheelsZoom,
};
return Object.assign(() => rtn, {  // ✅ 使用 Object.assign 挂载
    store,
    setState,
    mutate,
});
```

#### 2. 组件访问模式更新

**旧范式**：
```typescript
const { Core_Store, addSpore } = reaxel_Core();
<>{Core_Store.spores.length}</>
```

**新范式**：
```typescript
const { toggleMainSwitch } = reaxel_HotkeyEnhancer();
<>{reaxel_HotkeyEnhancer.store.switch_main}</>  // 直接访问 .store
```

#### 3. 命名约定更新

| 项目 | 旧命名 | 新命名 |
|------|--------|--------|
| Reaxel 模块 | `reaxel_Core` | `reaxel_HotkeyEnhancer`（大驼峰） |
| Store 访问 | `Core_Store`（在 rtn 中） | `reaxel_模块名.store`（直接访问） |
| SetState 访问 | `Core_SetState`（在 rtn 中） | `reaxel_模块名.setState`（直接访问） |
| Mutate 访问 | `Core_Mutate`（在 rtn 中） | `reaxel_模块名.mutate`（直接访问） |

#### 4. 新增内容

##### 增强器模式（Enhancers）
- 浏览器持久化增强器：`rehance_BrowserPersist`
- 国际化增强器：`rehance_I18n_Persist`
- 主题增强器：结合 `Refaxel_Lottie`

##### 高级模式
- 模式 3：列表操作与拖拽排序
- 模式 4：IPC 通信与状态同步
- 模式 5：Hash 路由管理
- 模式 6：嵌套 Refaxel 组合
- 模式 7：统一导出（Exports）

##### 目录结构
基于 War3 项目的实际结构更新了完整的目录组织：
```
src/Renderer/
├── reaxels/           # 状态管理模块
├── components/        # 可复用 UI 组件
├── pages/             # 页面级组件（路由视图）
├── pure-components/   # 纯展示组件（无状态）
└── routes/            # 路由配置
```

#### 5. 关键改进点

1. **分离关注点**：`rtn` 只包含业务方法，基础设施（store/setState/mutate）挂载到函数上
2. **更直观的访问**：组件可以直接 `reaxel_模块名.store.xxx` 读取状态
3. **增强器支持**：完善的持久化、国际化、主题管理能力
4. **IPC 集成**：Electron 主进程/渲染进程状态同步模式
5. **路由管理**：Hash 路由与状态管理的集成

### 参考文件
- `Z:\electron-reaxes-react\projects\Autohotkey-GUI\projects\War3\src\Renderer\reaxels\core\index.ts`
- `Z:\electron-reaxes-react\projects\Autohotkey-GUI\projects\War3\src\Renderer\reaxels\hotkey-enhancer\index.ts`
- `Z:\electron-reaxes-react\projects\Autohotkey-GUI\projects\War3\src\Renderer\reaxels\cheats\index.ts`
- `Z:\electron-reaxes-react\projects\Autohotkey-GUI\projects\War3\src\Renderer\reaxels\i18n\index.ts`
- `Z:\electron-reaxes-react\projects\Autohotkey-GUI\projects\War3\src\Renderer\reaxels\theme\index.ts`

### SKILL 文件位置
`.qoder/skills/reaxes-development/SKILL.md`（643 行）
