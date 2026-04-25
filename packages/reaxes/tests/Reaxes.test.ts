import { describe, it } from 'node:test';
import * as assert from 'assert';
import { obsReaction } from '../src/Reaxes';
import { createReaxable } from '../src/reaxable';

// Helper function to wait for async reactions
async function waitForReaction(ms = 50) {
	await new Promise(resolve => setTimeout(resolve, ms));
}

describe('obsReaction', () => {
	it('should call callback initially with first=true', async () => {
		const { store, setState } = createReaxable({ count: 0 });
		let callCount = 0;
		let firstParam: any = null;
		
		obsReaction((first, disposer) => {
			callCount++;
			firstParam = first;
		}, () => [store.count]);
		
		// Wait for async execution
		await waitForReaction();
		
		assert.strictEqual(callCount, 1);
		assert.strictEqual(firstParam, true);
	});

	it('should call callback when dependencies change', async () => {
		const { store, setState } = createReaxable({ count: 0 });
		let callCount = 0;
		
		obsReaction((first, disposer) => {
			callCount++;
		}, () => [store.count]);
		
		// Wait for initial call
		await waitForReaction();
		callCount = 0;
		
		// Change dependency
		setState({ count: 1 });
		
		// Wait for reaction
		await waitForReaction();
		
		assert.strictEqual(callCount, 1);
	});

	it('should not call callback when dependencies do not change', async () => {
		const { store, setState } = createReaxable({ count: 0 });
		let callCount = 0;
		
		obsReaction((first, disposer) => {
			callCount++;
		}, () => [store.count]);
		
		// Wait for initial call
		await waitForReaction();
		callCount = 0;
		
		// Set same value
		setState({ count: 0 });
		
		// Wait for reaction
		await waitForReaction();
		
		assert.strictEqual(callCount, 0);
	});

	it('should return a disposer function', async () => {
		const { store, setState } = createReaxable({ count: 0 });
		let callCount = 0;
		
		const disposer = obsReaction((first, d) => {
			callCount++;
		}, () => [store.count]);
		
		assert.strictEqual(typeof disposer, 'function');
		
		// Wait for initial call
		await waitForReaction();
		
		// Dispose
		await disposer();
		
		// Wait a bit
		await waitForReaction();
		callCount = 0;
		
		// Change dependency after dispose
		setState({ count: 1 });
		
		// Wait for potential reaction
		await waitForReaction();
		
		// Should not be called after dispose
		assert.strictEqual(callCount, 0);
	});

	it('should track multiple dependencies', async () => {
		const { store, setState } = createReaxable({ count: 0, name: 'test' });
		let callCount = 0;
		
		obsReaction((first, disposer) => {
			callCount++;
		}, () => [store.count, store.name]);
		
		// Wait for initial call
		await waitForReaction();
		callCount = 0;
		
		// Change one dependency
		setState({ count: 1 });
		
		// Wait for reaction
		await waitForReaction();
		
		assert.strictEqual(callCount, 1);
		callCount = 0;
		
		// Change another dependency
		setState({ name: 'updated' });
		
		// Wait for reaction
		await waitForReaction();
		
		assert.strictEqual(callCount, 1);
	});
});
