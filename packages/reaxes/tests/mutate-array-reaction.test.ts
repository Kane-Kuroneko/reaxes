import { describe, it } from 'node:test';
import * as assert from 'assert';
import { obsReaction } from '../src/Reaxes';
import { createReaxable } from '../src/reaxable';
import { autorun, reaction } from 'mobx';

async function waitForReaction(ms = 50) {
	await new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * 针对批评: "mutate 中数组的原地修改(push)不触发更新"
 * 验证 mutate 回调中使用 push 等原型链方法是否能正确触发 MobX reaction
 */
describe('mutate array push reaction', () => {
	
	it('mutate 内 push 应触发 MobX autorun (观察数组内容)', async () => {
		const { store, mutate } = createReaxable({
			items: [1, 2, 3],
		});
		
		let runCount = 0;
		autorun(() => {
			// 访问 items.length 建立对数组内容的依赖
			const _ = store.items.length;
			runCount++;
		});
		
		assert.strictEqual(runCount, 1);
		
		mutate(s => {
			s.items.push(4);
		});
		
		assert.strictEqual(runCount, 2, 'push 应触发 autorun');
		assert.deepStrictEqual(store.items.slice(), [1, 2, 3, 4]);
	});
	
	it('mutate 内 push 应触发 obsReaction', async () => {
		const { store, mutate } = createReaxable({
			items: ['a', 'b'],
		});
		
		let reactionCount = 0;
		obsReaction((first) => {
			if (!first) reactionCount++;
		}, () => [store.items.length]);
		
		await waitForReaction();
		
		mutate(s => {
			s.items.push('c');
		});
		
		await waitForReaction();
		assert.strictEqual(reactionCount, 1, 'push 应触发 obsReaction');
		assert.deepStrictEqual(store.items.slice(), ['a', 'b', 'c']);
	});
	
	it('mutate 内 splice/pop 应触发 reaction', async () => {
		const { store, mutate } = createReaxable({
			items: [1, 2, 3, 4, 5],
		});
		
		let runCount = 0;
		autorun(() => {
			const _ = store.items.length;
			runCount++;
		});
		
		assert.strictEqual(runCount, 1);
		
		mutate(s => { s.items.splice(1, 2); });
		assert.strictEqual(runCount, 2, 'splice 应触发 autorun');
		
		mutate(s => { s.items.pop(); });
		assert.strictEqual(runCount, 3, 'pop 应触发 autorun');
	});
	
	it('嵌套 mutate.Data 内 push 应触发 reaction (模拟 reaxel_SettingsView 场景)', async () => {
		const { store, mutate } = createReaxable({
			Data: {
				AIs: [] as { id: number; name: string; disabled?: boolean }[],
			},
		});
		
		let runCount = 0;
		autorun(() => {
			// 模拟组件 render: 遍历数组内容
			store.Data.AIs.forEach(ai => ai.name);
			runCount++;
		});
		
		assert.strictEqual(runCount, 1);
		
		// ✅ 嵌套 mutate 内 push —— 应该触发
		mutate.Data(state => {
			state.AIs.push({ id: 1, name: 'GPT' });
		});
		
		assert.strictEqual(runCount, 2, '嵌套 mutate.Data 内 push 应触发');
		assert.strictEqual(store.Data.AIs.length, 1);
	});
	
	/**
	 * 🔑 关键测试: 复现 "push 不触发 reaction" 的场景
	 *
	 * 当 reaction/observer 只观察数组引用(属性读取)而不观察数组内容(遍历/length)时,
	 * push 确实不会触发, 但引用替换会触发。
	 * 这不是 mutate 的 bug, 而是 MobX 依赖追踪的预期行为。
	 */
	it('🐛 复现: 仅观察数组引用时 push 不触发, 引用替换触发', async () => {
		const { store, mutate } = createReaxable({
			Data: {
				AIs: [] as { id: number; name: string }[],
			},
		});
		
		let runCount = 0;
		reaction(
			// ⚠️ data fn 只读取数组引用, 不读取内容
			() => store.Data.AIs,
			(ais) => {
				runCount++;
			}
		);
		
		// push 不改变属性引用 → reaction 的 data fn 返回值没变 → 不触发
		mutate.Data(state => {
			state.AIs.push({ id: 1, name: 'GPT' });
		});
		assert.strictEqual(runCount, 0, 'push 不触发仅观察引用的 reaction (MobX 预期行为)');
		// 数据确实被修改了
		assert.strictEqual(store.Data.AIs.length, 1);
		
		// 引用替换 → 属性值变了 → reaction data fn 返回新值 → 触发
		mutate.Data(state => {
			state.AIs = [...state.AIs, { id: 2, name: 'Claude' }];
		});
		assert.strictEqual(runCount, 1, '引用替换触发仅观察引用的 reaction');
	});
	
	it('🐛 复现: autorun 中只传递引用不遍历时 push 不触发', async () => {
		const { store, mutate } = createReaxable({
			Data: {
				AIs: [] as { id: number; name: string }[],
			},
		});
		
		let runCount = 0;
		let capturedRef: any = null;
		autorun(() => {
			// 模拟组件: 只读取引用传给子组件, 不遍历
			capturedRef = store.Data.AIs;
			runCount++;
		});
		
		assert.strictEqual(runCount, 1);
		
		// push: 数组引用没变, autorun 只追踪了 store.Data.AIs 属性读取
		mutate.Data(state => {
			state.AIs.push({ id: 1, name: 'GPT' });
		});
		// MobX 不会重新执行 autorun, 因为 store.Data.AIs 属性引用没变
		assert.strictEqual(runCount, 1, 'push 不触发仅读取引用的 autorun');
		
		// 但数据确实在, 因为 capturedRef 就是 observable array 本身
		assert.strictEqual(capturedRef.length, 1);
		
		// 引用替换: 触发
		mutate.Data(state => {
			state.AIs = [...state.AIs, { id: 2, name: 'Claude' }];
		});
		assert.strictEqual(runCount, 2, '引用替换触发 autorun');
	});
	
	it('✅ 正确做法: 遍历/读取 length 时 push 正常触发', async () => {
		const { store, mutate } = createReaxable({
			Data: {
				AIs: [] as { id: number; name: string }[],
			},
		});
		
		let runCount = 0;
		autorun(() => {
			// 模拟组件: render 中遍历数组 (如 .map)
			store.Data.AIs.map(ai => ai.name);
			runCount++;
		});
		
		assert.strictEqual(runCount, 1);
		
		mutate.Data(state => {
			state.AIs.push({ id: 1, name: 'GPT' });
		});
		
		assert.strictEqual(runCount, 2, '遍历数组时 push 正常触发 autorun');
	});
	
	it('MobX reaction 监听 length 时 push 正常触发', async () => {
		const { store, mutate } = createReaxable({
			items: [1, 2, 3],
		});
		
		let effectCount = 0;
		reaction(
			() => store.items.length,
			() => { effectCount++; }
		);
		
		mutate(s => { s.items.push(4); });
		assert.strictEqual(effectCount, 1, 'push 应触发监听 length 的 reaction');
	});
});
