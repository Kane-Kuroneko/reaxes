import { describe, it } from 'node:test';
import * as assert from 'assert';
import { collectDeps } from '../src/Reaxes';
import { observable } from 'mobx';

describe('collectDeps', () => {
	it('should access all properties when propKeys not provided', () => {
		const store = observable({
			a: 1,
			b: 2,
			c: 3
		});
		
		// Should not throw
		collectDeps(store);
		
		// All properties should have been accessed
		assert.strictEqual(store.a, 1);
		assert.strictEqual(store.b, 2);
		assert.strictEqual(store.c, 3);
	});

	it('should access specific properties when propKeys provided', () => {
		const store = observable({
			a: 1,
			b: 2,
			c: 3
		});
		
		// Should not throw
		collectDeps(store, ['a', 'b']);
		
		// Specified properties should have been accessed
		assert.strictEqual(store.a, 1);
		assert.strictEqual(store.b, 2);
	});

	it('should access all properties when propKeys is empty array', () => {
		const store = observable({
			a: 1,
			b: 2,
			c: 3
		});
		
		// Should not throw
		collectDeps(store, []);
		
		// All properties should have been accessed
		assert.strictEqual(store.a, 1);
		assert.strictEqual(store.b, 2);
		assert.strictEqual(store.c, 3);
	});

	it('should throw if store is not an object', () => {
		assert.throws(() => collectDeps(null as any));
		assert.throws(() => collectDeps(undefined as any));
		assert.throws(() => collectDeps(123 as any));
		assert.throws(() => collectDeps('string' as any));
	});

	it('should handle stores with getter properties', () => {
		const store = observable({
			firstName: 'John',
			lastName: 'Doe',
			get fullName() {
				return this.firstName + ' ' + this.lastName;
			}
		});
		
		// Should not throw
		collectDeps(store);
		assert.strictEqual(store.fullName, 'John Doe');
	});

	it('should handle non-existent propKeys gracefully', () => {
		const store = observable({
			a: 1,
			b: 2
		});
		
		// Should not throw even with non-existent keys
		collectDeps(store, ['c' as any]);
	});

	it('should handle array-type stores', () => {
		const store = observable([1, 2, 3]);
		
		// Should not throw for arrays
		collectDeps(store);
		assert.strictEqual(store.length, 3);
	});

	it('should handle nested object properties', () => {
		const store = observable({
			user: {
				name: 'John',
				age: 30
			}
		});
		
		collectDeps(store, ['user']);
		assert.deepStrictEqual(store.user, { name: 'John', age: 30 });
	});
});
