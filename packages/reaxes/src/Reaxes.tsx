export function obsReaction<F extends (first? : boolean , disposer? : IReactionDisposer) => any>(callback : F , dependencies:() => Array<any>) : ReturnType<F>{
	let depList = dependencies();
	const disposer = reaction(dependencies , (data , reaction) => {
		const dataChanged = !utils.shallowEqual(data , depList);
		if( dataChanged ) {
			callback(false , disposer);
			depList = data;
		} else {
			// crayon.red( 'reaction called but data not changed' );
		}
	});
	return callback(true , disposer);
};

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


import {
	reaction ,
	IReactionDisposer ,
} from 'mobx';
import * as utils from 'reaxes-utils';
import _ from 'lodash';
