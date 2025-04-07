export function obsReaction<F extends ( first?: boolean , disposer?: Disposer ) => any>( callback: F , dependencies: () => Array<any> ): Disposer {
		
	let promise = utils.xPromise<() => void>();
	const disposer = () => promise.then(dis => dis());
	asapAsyncRun(() => {
		let depList = dependencies();
		const mobxReactionDisposer = reaction(dependencies , ( data , reaction ) => {
			const dataChanged = !utils.shallowEqual(data , depList);
			if( dataChanged ) {
				callback(false , disposer);
				depList = data;
			} else {
				// crayon.red( 'reaction called but data not changed' );
			}
		});
		callback(true , disposer);
		promise.resolve(mobxReactionDisposer );
	});
	
	return disposer;
};
type Disposer = () => void
/**
 * 注册时传入回调函数 和依赖组, 之后每一次调用都会比对依赖组,如果改变则会执行回调函数
 */
export function distinctCallback<T extends (...args:any[]) => any>(callback:T , deps = () => []){
	let depList = deps();
	let currentReturn ;
	return [
		(depsSetter) => {
			const tempDepsList = depsSetter(depList);
			return (...args) => {
				/*debug时打开*/
				// console.log(!utils.default.shallowEqual(depList,tempDepsList),depList,tempDepsList);
				if( !utils.shallowEqual(depList , tempDepsList) ) {
					let ret = currentReturn = callback(...args);
					depList = tempDepsList;
					return { next:(cb) => cb(currentReturn) };
				}
			};
		} , () => {
			depList = deps();
		},
	];
}
/*手动收集依赖,使组件响应store的值变化. keys是要指定响应的属性
	 *如果不传propKeys则整个store的变化都会引起重新渲染*/
export function collectDeps (store , propKeys : ( string | number | symbol )[] = [])  {
	if( ! _.isObject(store) ) throw 'the store argument must be a mobx observed object';
	if( propKeys.length ) {
		propKeys.forEach((key) => {
			store[key];
		});
	} else {
		Object.getOwnPropertyNames(store).forEach((key) => {
			store[key];
		});
	}
};

function asapAsyncRun<F extends Function>(cb: F): void {
	let asap;
	if (typeof window !== 'undefined') {
		asap = window.queueMicrotask ?? (window.Promise && window.Promise.resolve().then) ?? ((cb) => window.setTimeout(cb, 0));
	} else if (typeof process !== 'undefined' && process.nextTick) {
		asap = process.nextTick;
	} else {
		asap = (cb) => setTimeout(cb, 0);
	}
	asap(cb);
}

import {
	reaction ,
	IReactionDisposer ,
} from 'mobx';
import * as utils from 'reaxes-utils';
import _ from 'lodash';
