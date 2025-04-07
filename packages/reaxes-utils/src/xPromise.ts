/**
 * @format
 * @description 生成一个pending状态的promise
 */

export const xPromise = <T>(
	callback?: (
		resolve: (value: T | PromiseLike<T>) => void,
		reject: (reason?: any) => void) => void
): Promise<T> & {
	resolve: (value: T | PromiseLike<T>) => void;
	reject: (reason?: any) => void;
} => {
	let resolve!: (value: T | PromiseLike<T>) => void;
	let reject!: (reason?: any) => void;
	
	const promise = new Promise<T>(($resolve, $reject) => {
		resolve = $resolve;
		reject = $reject;
		typeof callback === 'function' && callback($resolve, $reject);
	});
	
	return Object.assign(promise, {
		resolve,
		reject,
	});
};

export type XPromise<T = any> = Promise<T> & {resolve:(value:T) => void; reject:(reason:any) => void}
