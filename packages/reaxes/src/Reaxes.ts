type Disposer = () => void;

export function obsReaction<F extends ( first?: boolean , disposer?: Disposer ) => any>( callback: F , dependencies: () => Array<any> ): Disposer {
	
	let promise = utils.xPromise<() => void>();
	const disposer = () => promise.then( dis => dis() );
	asapAsyncRun( () => {
		let depList = dependencies();
		const mobxReactionDisposer = reaction( dependencies , ( data , reaction ) => {
			const dataChanged = !utils.shallowEqual( data , depList );
			if( dataChanged ) {
				callback( false , disposer );
				depList = data;
			} else {
				// crayon.red( 'reaction called but data not changed' );
			}
		} );
		callback( true , disposer );
		promise.resolve( mobxReactionDisposer );
	} );
	
	return disposer;
};
/**
 * 创建依赖感知的缓存回调,仅在依赖变化时执行回调函数并更新缓存结果
 *
 * @param callback 要执行的回调函数
 * @param deps 初始依赖数组,用于首次比较和resetDeps恢复
 * @param initialValue 初始缓存值,首次调用时若依赖未变化则返回此值(可选)
 *
 * @example
 * ```ts
 * // 基础用法:首次调用依赖未变化时会执行回调(因为还未初始化)
 * const distinct = distinctCallback(
 *     (x, y) => x + y,
 *     () => [initialA, initialB]
 * );
 * const handler = distinct(() => [currentA, currentB]);
 * const result = handler(1, 2); // 依赖变化则执行,否则返回缓存
 *
 * // 带初始值:避免首次计算,直接返回缓存的初始值
 * const distinctWithCache = distinctCallback(
 *     (userId) => fetchUserProfile(userId),
 *     () => [cachedUserId],
 *     cachedProfile  // 已有缓存数据,首次依赖未变化时直接返回
 * );
 * ```
 */
const UNINITIALIZED = Symbol( 'UNINITIALIZED' );

type DistinctCallbackInvoker<T extends ( ...args: any[] ) => any> = {
	( depsSetter: () => any[] ): ( ...args: Parameters<T> ) => ReturnType<T>;
	resetDeps(): void;
};

export function distinctCallback<T extends ( ...args: any[] ) => any>(
	callback: T ,
	deps: () => any[] ,
	initialValue?: ReturnType<T>,
): DistinctCallbackInvoker<T> {
	let depList = deps();
	let lastResult: ReturnType<T> | typeof UNINITIALIZED = initialValue ?? UNINITIALIZED;
	
	const invoker = ( depsSetter: () => any[] ) => {
		const tempDepsList = depsSetter();
		
		return ( ...args: Parameters<T> ): ReturnType<T> => {
			const depsChanged = !utils.shallowEqual( depList , tempDepsList );
			
			// 依赖变化 或 还未初始化过时,执行回调并更新缓存
			if( depsChanged || lastResult === UNINITIALIZED ) {
				depList = tempDepsList;
				lastResult = callback( ...args );
			}
			// 依赖未变化且已初始化,直接返回缓存值(可能是 initialValue 或上次计算结果)
			// 类型断言: 此处在逻辑上保证 lastResult 不会是 UNINITIALIZED
			// 因为如果是 UNINITIALIZED,上面的 if 条件必然为真,会执行 callback 并赋值
			return lastResult as ReturnType<T>;
		};
	};
	
	return Object.assign( invoker , {
		resetDeps() {
			depList = deps();
			lastResult = initialValue ?? UNINITIALIZED;
		},
	} );
}

/** 手动收集依赖,使组件响应store的值变化. keys是要指定响应的属性
 * 如果不传propKeys则整个store的变化都会引起重新渲染
 */
export function collectDeps<T>( store: T , propKeys?: ( keyof T )[] ) {
	if( !_.isObject( store ) ) throw 'the store argument must be a Mobx observed object';
	if( !propKeys ) {
		Object.getOwnPropertyNames( store ).forEach( ( k ) => store[k] );
		return;
	}
	if( _.isArray( propKeys ) && propKeys.length ) {
		propKeys.forEach( ( k ) => store[k] );
	} else {
		Object.getOwnPropertyNames( store ).forEach( ( k ) => store[k] );
	}
};

function asapAsyncRun<F extends Function>( cb: F ): void {
	let asap;
	if( typeof window !== 'undefined' ) {
		asap = window.queueMicrotask ?? (
			window.Promise && window.Promise.resolve().then
		) ?? (
			( cb ) => window.setTimeout( cb , 0 )
		);
	} else if( typeof process !== 'undefined' && process.nextTick ) {
		asap = process.nextTick;
	} else {
		asap = ( cb ) => setTimeout( cb , 0 );
	}
	asap( cb );
}

const devtime = {
	trace ,
	getDependencyTree ,
	getObserverTree ,
};
import {
	trace ,
	getDependencyTree ,
	getObserverTree,
} from 'mobx';

export {
	untracked ,
	toJS,
} from 'mobx';

import {
	reaction ,
	IReactionDisposer ,
} from 'mobx';
import * as utils from 'reaxes-utils';
import _ from 'lodash';
