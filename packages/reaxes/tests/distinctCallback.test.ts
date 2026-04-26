import { describe, it } from 'node:test';
import * as assert from 'assert';
import { distinctCallback } from '../src/Reaxes';

describe('distinctCallback', () => {
	it('should call callback when dependencies change', () => {
		const callback = () => { callCount++; };
		let callCount = 0;
		let depA = 1;
		let depB = 2;
		
		const invoker = distinctCallback(callback, () => [depA, depB]);
		
		// First call with same deps - returns a handler function
		const handler = invoker(() => [depA, depB]);
		assert.strictEqual(typeof handler, 'function');
		
		// Change deps and get new handler
		depA = 2;
		const handler2 = invoker(() => [depA, depB]);
		
		// Calling the handler should execute the callback
		handler2();
		assert.strictEqual(callCount, 1);
		
		// Calling handler again should NOT execute callback since deps haven't changed
		handler2();
		assert.strictEqual(callCount, 1);
	});

	it('should return cached result when dependencies unchanged', () => {
		let calcCount = 0;
		const callback = (x: number, y: number) => {
			calcCount++;
			return x + y;
		};
		let depA = 1;
		
		const invoker = distinctCallback(callback, () => [depA]);
		const handler = invoker(() => [depA]);
		
		// First call - should execute callback
		const result1 = handler(2, 3);
		assert.strictEqual(result1, 5);
		assert.strictEqual(calcCount, 1);
		
		// Second call with same deps - should return cached result
		const result2 = handler(10, 20); // Different args, but deps unchanged
		assert.strictEqual(result2, 5); // Should return cached result, not 30
		assert.strictEqual(calcCount, 1); // Callback should not be called again
	});

	it('should recalculate and return new result when dependencies change', () => {
		let calcCount = 0;
		const callback = (x: number, y: number) => {
			calcCount++;
			return x * y;
		};
		let depA = 1;
		
		const invoker = distinctCallback(callback, () => [depA]);
		let handler = invoker(() => [depA]);
		
		// First call
		const result1 = handler(3, 4);
		assert.strictEqual(result1, 12);
		assert.strictEqual(calcCount, 1);
		
		// Change deps and call again
		depA = 2;
		handler = invoker(() => [depA]);
		const result2 = handler(5, 6);
		assert.strictEqual(result2, 30);
		assert.strictEqual(calcCount, 2);
		
		// Call again with same deps - should return cached
		const result3 = handler(100, 200);
		assert.strictEqual(result3, 30);
		assert.strictEqual(calcCount, 2);
	});

	it('should provide resetDeps function', () => {
		const callback = () => { callCount++; };
		let callCount = 0;
		let depA = 1;
		
		const invoker = distinctCallback(callback, () => [depA]);
		
		// First call - should execute (first call always executes)
		const handler = invoker(() => [depA]);
		handler();
		assert.strictEqual(callCount, 1);
		
		// Calling handler again should NOT execute since deps haven't changed
		handler();
		assert.strictEqual(callCount, 1);
		
		// Change deps and execute
		depA = 2;
		const handler2 = invoker(() => [depA]);
		handler2();
		assert.strictEqual(callCount, 2);
		
		// Reset deps to current value
		invoker.resetDeps();
		
		// After reset, first call should execute again
		const handler3 = invoker(() => [depA]);
		handler3();
		assert.strictEqual(callCount, 3);
		
		// Change deps again
		depA = 3;
		const handler4 = invoker(() => [depA]);
		handler4();
		assert.strictEqual(callCount, 4);
	});

	it('should clear cached result after resetDeps', () => {
		let calcCount = 0;
		const callback = (x: number) => {
			calcCount++;
			return x * 10;
		};
		let depA = 1;
		
		const invoker = distinctCallback(callback, () => [depA]);
		let handler = invoker(() => [depA]);
		
		// First call
		const result1 = handler(5);
		assert.strictEqual(result1, 50);
		assert.strictEqual(calcCount, 1);
		
		// Reset deps
		invoker.resetDeps();
		handler = invoker(() => [depA]);
		
		// After reset, should recalculate even with same deps
		const result2 = handler(5);
		assert.strictEqual(result2, 50);
		assert.strictEqual(calcCount, 2); // Should recalculate
	});

	it('should handle object dependencies', () => {
		const callback = () => { callCount++; };
		let callCount = 0;
		let depObj = { name: 'test' };
		
		const invoker = distinctCallback(callback, () => [depObj]);
		
		// Change object reference
		depObj = { name: 'updated' };
		const handler = invoker(() => [depObj]);
		handler();
		assert.strictEqual(callCount, 1);
		
		// Calling handler again should NOT execute callback since deps haven't changed
		const handler2 = invoker(() => [depObj]);
		handler2();
		assert.strictEqual(callCount, 1);
	});

	it('should handle array dependencies', () => {
		const callback = () => { callCount++; };
		let callCount = 0;
		let depArr = [1, 2, 3];
		
		const invoker = distinctCallback(callback, () => [depArr]);
		
		// Change array reference
		depArr = [4, 5, 6];
		const handler = invoker(() => [depArr]);
		handler();
		assert.strictEqual(callCount, 1);
		
		// Calling handler again should NOT execute callback since deps haven't changed
		const handler2 = invoker(() => [depArr]);
		handler2();
		assert.strictEqual(callCount, 1);
	});

	describe('with initialValue parameter', () => {
		it('should return initialValue when deps unchanged on first call', () => {
			let callCount = 0;
			const callback = (x: number) => {
				callCount++;
				return x * 10;
			};
			let depA = 1;
			
			// 传入初始值 100
			const invoker = distinctCallback(callback, () => [depA], 100);
			const handler = invoker(() => [depA]);
			
			// 首次调用,依赖未变化(与初始依赖相同),应返回初始值,不执行回调
			const result1 = handler(5);
			assert.strictEqual(result1, 100);
			assert.strictEqual(callCount, 0); // callback 不应被执行
			
			// 再次调用,依赖仍未变化,继续返回初始值
			const result2 = handler(10);
			assert.strictEqual(result2, 100);
			assert.strictEqual(callCount, 0);
		});

		it('should execute callback when deps change from initial', () => {
			let callCount = 0;
			const callback = (x: number) => {
				callCount++;
				return x * 10;
			};
			let depA = 1;
			
			const invoker = distinctCallback(callback, () => [depA], 100);
			
			// 改变依赖
			depA = 2;
			const handler = invoker(() => [depA]);
			
			// 依赖变化,应执行回调
			const result = handler(5);
			assert.strictEqual(result, 50);
			assert.strictEqual(callCount, 1);
			
			// 依赖未变化,返回缓存结果
			const result2 = handler(10);
			assert.strictEqual(result2, 50);
			assert.strictEqual(callCount, 1);
		});

		it('should reset to initialValue after resetDeps', () => {
			let callCount = 0;
			const callback = (x: number) => {
				callCount++;
				return x * 10;
			};
			let depA = 1;
			
			const invoker = distinctCallback(callback, () => [depA], 100);
			let handler = invoker(() => [depA]);
			
			// 首次返回初始值
			assert.strictEqual(handler(5), 100);
			assert.strictEqual(callCount, 0);
			
			// 改变依赖,执行回调
			depA = 2;
			handler = invoker(() => [depA]);
			assert.strictEqual(handler(5), 50);
			assert.strictEqual(callCount, 1);
			
			// 重置依赖到初始值[2](当前depA的值)
			// 注意:resetDeps会重新执行() => [depA],此时depA=2
			invoker.resetDeps();
			
			// 再次调用,依赖仍是[2],与重置后的初始依赖相同,返回初始值100
			handler = invoker(() => [depA]);
			assert.strictEqual(handler(5), 100);
			assert.strictEqual(callCount, 1); // 不执行回调
		});

		it('should handle undefined initialValue correctly', () => {
			let callCount = 0;
			const callback = () => {
				callCount++;
				return 'computed';
			};
			let depA = 1;
			
			// 不传 initialValue(默认为 UNINITIALIZED)
			const invoker = distinctCallback(callback, () => [depA]);
			const handler = invoker(() => [depA]);
			
			// 首次调用,因为未初始化,应执行回调
			const result = handler();
			assert.strictEqual(result, 'computed');
			assert.strictEqual(callCount, 1);
			
			// 依赖未变化,返回缓存
			const result2 = handler();
			assert.strictEqual(result2, 'computed');
			assert.strictEqual(callCount, 1);
		});

		it('should support complex initialValue objects', () => {
			const callback = (id: number) => ({
				id,
				name: `User ${id}`,
				timestamp: Date.now()
			});
			let userId = 1;
			
			const initialProfile = { id: 0, name: 'Cached User', timestamp: 0 };
			const invoker = distinctCallback(callback, () => [userId], initialProfile);
			const handler = invoker(() => [userId]);
			
			// 返回初始对象
			const result1 = handler(1);
			assert.strictEqual(result1, initialProfile);
			
			// 改变依赖
			userId = 2;
			const handler2 = invoker(() => [userId]);
			const result2 = handler2(2);
			
			// 应执行回调,返回新对象
			assert.strictEqual(result2.id, 2);
			assert.strictEqual(result2.name, 'User 2');
			assert.notStrictEqual(result2, initialProfile);
		});
	});
});
