type Disposer = () => void;

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
/**
 * 注册时传入回调函数 和依赖组, 之后每一次调用都会比对依赖组,如果改变则会执行回调函数
 * @example
 * ```ts
 * const [distinctInvoker,resetDeps] = distinctCallback((name,age) => {
 * 	console.log(name,age);
 * }, () => [varA , varB]);
 * ```
 */
export function distinctCallback<T extends (...args) => any>(callback:T , deps : () => any[]){
	let depList = deps();
	return Object.assign((depsSetter:() => any[]) => {
		const tempDepsList = depsSetter();
		
		return (...args:Parameters<T>) => {
			/*debug时打开*/
			// console.log(!utils.default.shallowEqual(depList,tempDepsList),depList,tempDepsList);
			if( !utils.shallowEqual(depList , tempDepsList) ) {
				return callback(...args);
				depList = tempDepsList;
			}
		};
	},{
		resetDeps (){
			depList = deps();
		}
	});
}

/** 手动收集依赖,使组件响应store的值变化. keys是要指定响应的属性
 * 如果不传propKeys则整个store的变化都会引起重新渲染
 */
export function collectDeps <T>(store : T , propKeys? : (keyof T)[] )  {
	if( ! _.isObject(store) ) throw 'the store argument must be a Mobx observed object';
	if(!propKeys){
		Object.getOwnPropertyNames(store).forEach((k) => store[k]);
		return;
	}
	if(_.isArray(propKeys) && propKeys.length ) {
		propKeys.forEach((k) => store[k]);
	} else {
		Object.getOwnPropertyNames(store).forEach((k) => store[k]);
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

const devtime = {
	trace,
	getDependencyTree,
	getObserverTree,
};
import { trace , getDependencyTree , getObserverTree } from 'mobx';
export { untracked , toJS } from 'mobx';

import {
	reaction ,
	IReactionDisposer ,
} from 'mobx';
import * as utils from 'reaxes-utils';
import _ from 'lodash';
