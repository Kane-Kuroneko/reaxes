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

	it('should provide resetDeps function', () => {
		const callback = () => { callCount++; };
		let callCount = 0;
		let depA = 1;
		
		const invoker = distinctCallback(callback, () => [depA]);
		
		// Change deps and execute
		depA = 2;
		const handler = invoker(() => [depA]);
		handler();
		assert.strictEqual(callCount, 1);
		
		// Reset deps to current value
		invoker.resetDeps();
		
		// Get new handler - should not execute since deps haven't changed since reset
		const handler2 = invoker(() => [depA]);
		handler2();
		assert.strictEqual(callCount, 1);
		
		// Change deps again
		depA = 3;
		const handler3 = invoker(() => [depA]);
		handler3();
		assert.strictEqual(callCount, 2);
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
});
