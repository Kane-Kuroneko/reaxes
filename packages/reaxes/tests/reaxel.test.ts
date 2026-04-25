import { describe, it } from 'node:test';
import * as assert from 'assert';
import { reaxel } from '../src/reaxel';

describe('reaxel', () => {
	it('should execute callback immediately and return result', () => {
		let callCount = 0;
		const callback = () => {
			callCount++;
			return 42;
		};
		
		const result = reaxel(callback);
		
		assert.strictEqual(callCount, 1);
		assert.strictEqual(result, 42);
	});

	it('should handle callbacks returning objects', () => {
		const callback = () => ({ name: 'test', value: 123 });
		
		const result = reaxel(callback);
		
		assert.deepStrictEqual(result, { name: 'test', value: 123 });
	});

	it('should handle callbacks returning arrays', () => {
		const callback = () => [1, 2, 3];
		
		const result = reaxel(callback);
		
		assert.deepStrictEqual(result, [1, 2, 3]);
	});

	it('should handle callbacks returning undefined', () => {
		const callback = () => undefined;
		
		const result = reaxel(callback);
		
		assert.strictEqual(result, undefined);
	});

	it('should handle async callbacks', async () => {
		const callback = async () => 'async result';
		
		const result = reaxel(callback);
		
		// Result should be a promise
		assert.strictEqual(result instanceof Promise, true);
		await assert.strictEqual(await result, 'async result');
	});

	it('should handle callbacks that throw errors', () => {
		const callback = () => {
			throw new Error('test error');
		};
		
		assert.throws(() => reaxel(callback), {
			name: 'Error',
			message: 'test error'
		});
	});

	it('should handle complex factory pattern', () => {
		const factory = reaxel(() => {
			return {
				create: () => ({ id: 1 }),
				destroy: () => {}
			};
		});
		
		assert.strictEqual(typeof factory.create, 'function');
		assert.strictEqual(typeof factory.destroy, 'function');
		
		const instance = factory.create();
		assert.strictEqual(instance.id, 1);
	});
});
