---
trigger: always_on
description: 代码规范
---

## 📐 基础格式规范
- 编写代码时使用Tab缩进,但在markdown等文档中的示例则使用3空格缩进
- 行宽限制: 建议140字符,避免过长行
- 文件末尾保留一个空行

## 📦 Import 规范
ESM Import以及TS types声明一律放在模块底部,重要程度依次排序:
1. 相对路径的业务ESM Import(`import { User } from '../user.ts'`)
2. 绝对路径的业务ESM Import(`import { User } from '#src/reaxels/user.ts'`)
3. node_modules包(`import _ from 'lodash'`)
4. CSS/Less模块(`import './user.css'`)
5. Types/Interfaces声明:
	```ts
	type User = { name: string }

	interface Example {
		age: number
	}
	```

**例外情况**:
- 库核心包或工具模块(即非业务型文件)中,类型声明可放在文件顶部(如 [Reaxes.ts](file:///Z:/reaxes/packages/reaxes/src/Reaxes.ts#L1))
- 导出语句(`export`)根据情况可以放在文件顶部来使导出声明更加清晰

## 🎯 命名规范
- **变量/函数**: camelCase (`createReaxable`, `setState`)
- **类型/接口**: PascalCase (`CreateReaxable`, `NestedSetState`)
- **常量**: UPPER_SNAKE_CASE (如使用)
- **私有属性**: 下划线前缀 `_privateProp` (如需要)
- **Reaxel模块**: `reaxel_模块名` 格式 (`reaxel_TodoList`, `reaxel_AddNew`)

## 💻 代码风格规范
- 优先使用箭头函数,尤其是回调函数
- 使用模板字符串替代字符串拼接
- 使用可选链(`?.`)和空值合并(`??`)操作符
- 类型注解优先,让TypeScript推断辅助
- 使用action包装修改state的函数(MobX)

## 📝 注释规范
- 公共API必须使用JSDoc注释
- 复杂逻辑添加行内注释说明意图
- 使用中文注释,保持与项目一致
- 示例:
	```ts
	/**
	 * 创建依赖感知的缓存回调,仅在依赖变化时执行回调函数并更新缓存结果
	 *
	 * @param callback 要执行的回调函数
	 * @param deps 初始依赖数组,用于首次比较和resetDeps恢复
	 * @param initialValue 初始缓存值(可选)
	 */
	```

## 🏗️ Reaxes框架规范
- 使用`createReaxable`创建响应式store
- 使用`reaxel()`包装reaxel模块
- 状态修改使用`mutate`(函数式)或`setState`(对象式)
- 组件使用`reaxper`或框架特定的响应式组件
- 遵循reaxes的独立设计理念,不强制遵循MobX理念

## ✅ 代码质量规范
- 编写代码时优先参考其他相似的代码,确保代码风格,编程范式和使用的库与原有部分保持一致
- 新增功能时添加对应的单元测试
- 避免any类型,使用unknown或具体类型
- 错误处理使用try-catch,不吞异常

## 🔧 构建与工程化
- 使用workspace别名(`#root`, `#packages`, `reaxes`等)
- Webpack配置放在`build-tools/`目录
- 每个包的webpack配置使用`webpack.partial.ts`
- 遵循monorepo包管理规范
