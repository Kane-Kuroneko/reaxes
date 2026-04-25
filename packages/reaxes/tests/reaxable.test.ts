import { describe, it } from 'node:test';
import * as assert from 'assert';
import { createReaxable } from '../src/reaxable';

describe('createReaxable', () => {
	it('should create a reactive store with initial state', () => {
		const { store } = createReaxable({
			count: 0,
			name: 'test'
		});
		
		assert.strictEqual(store.count, 0);
		assert.strictEqual(store.name, 'test');
	});

	it('should provide setState function to update state', () => {
		const { store, setState } = createReaxable({
			count: 0,
			name: 'test'
		});
		
		setState({ count: 5 });
		assert.strictEqual(store.count, 5);
		
		setState({ name: 'updated' });
		assert.strictEqual(store.name, 'updated');
	});

	it('should provide nested setState for nested objects', () => {
		const { store, setState } = createReaxable({
			profile: {
				name: 'John',
				address: {
					city: 'New York',
					country: 'USA'
				}
			}
		});
		
		setState.profile.address({ city: 'Los Angeles' });
		assert.strictEqual(store.profile.address.city, 'Los Angeles');
		assert.strictEqual(store.profile.address.country, 'USA'); // should not change
	});

	it('should provide mutate function to modify state with callback', () => {
		const { store, mutate } = createReaxable({
			count: 0,
			arr: [1, 2, 3]
		});
		
		mutate(s => {
			s.count = 10;
			s.arr.push(4);
		});
		
		assert.strictEqual(store.count, 10);
		assert.deepStrictEqual(store.arr, [1, 2, 3, 4]);
	});

	it('should provide nested mutate for nested objects', () => {
		const { store, mutate } = createReaxable({
			profile: {
				name: 'John',
				address: {
					city: 'New York',
					country: 'USA'
				}
			}
		});
		
		mutate.profile.address(addr => {
			addr.city = 'Boston';
			addr.country = 'USA';
		});
		
		assert.strictEqual(store.profile.address.city, 'Boston');
		assert.strictEqual(store.profile.address.country, 'USA');
	});

	it('should provide merge function to deeply merge state', () => {
		const { store, merge } = createReaxable({
			profile: {
				name: 'John',
				address: {
					city: 'New York',
					country: 'USA'
				}
			}
		});
		
		merge({
			profile: {
				address: {
					city: 'Boston'
				}
			}
		});
		
		assert.strictEqual(store.profile.name, 'John'); // should remain
		assert.strictEqual(store.profile.address.city, 'Boston');
		assert.strictEqual(store.profile.address.country, 'USA'); // should remain
	});

	it('should handle undefined properties gracefully', () => {
		const { setState, mutate } = createReaxable({
			count: 0
		});
		
		// Accessing non-existent property should return undefined
		assert.strictEqual((setState as any).nonExistent, undefined);
		assert.strictEqual((mutate as any).nonExistent, undefined);
	});

	it('should handle arrays in nested setState/mutate', () => {
		const { setState, mutate } = createReaxable({
			tags: ['a', 'b'],
			profile: {
				name: 'John'
			}
		});
		
		// Arrays are also objects, so they will have nested setState/mutate
		assert.strictEqual(typeof (setState as any).tags, 'function');
		assert.strictEqual(typeof (mutate as any).tags, 'function');
		
		// Objects should have nested setState/mutate
		assert.strictEqual(typeof (setState as any).profile, 'function');
		assert.strictEqual(typeof (mutate as any).profile, 'function');
	});
});
