export const Reaxes = new (class {
	
	obsReaction<F extends (first? : boolean , disposer? : IReactionDisposer) => any>(callback : F , dependencies:() => Array<any>) : ReturnType<F>{
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
	contrastedCallback<T extends (...args:any[]) => any>(callback:T , deps = () => []){
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
		
		// function next(_callback: (ret:ReturnType<T>) => void){
		// 	return () => _callback(currentReturn);
		// }
	}
	
	/**
	 * 替代老版本的contrastedCallback
	 */
	_UNSTABLE_EXPIMENTAL_consistentCallback = <T extends (...args:any[]) => any>(callback:T , deps = () => []) => {
		let depList = deps();
		/*上一次callback的返回值*/
		let prevRet ;
		return [
			(depsSetter) => {
				const tempDepsList = depsSetter(depList);
				return (...args:Parameters<T>):ReturnType<T> => {
					/*debug时打开*/
					// console.log(!utils.default.shallowEqual(depList,tempDepsList),depList,tempDepsList);
					if( !utils.shallowEqual(depList , tempDepsList) ) {
						depList = tempDepsList;
						return prevRet = callback(...args);
					}else {
						return prevRet;
					}
				};
			} , 
			() => {
				depList = deps();
			},
		];
	};
	
	/*手动收集依赖,使组件响应store的值变化. keys是要指定响应的属性
	 *如果不传propKeys则整个store的变化都会引起重新渲染*/
	collectDeps = (store , propKeys : ( string | number | symbol )[] = []) => {
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
	
});

// export type Reaxes = new () => {
// 	collectDeps(store : object , propKeys? : ( string | number | symbol )[]) : void;
// 	/*自动收集dependencies里的依赖, 当依赖变化时自动执行callback*/
// 	obsReaction(callback : (first : boolean , disposer? : IReactionDisposer) => any , dependencies:() => Array<any>) : void;
// 	/*将其返回值存储下来 , 每次调用其时传入依赖数组,当与上次浅比较不匹配时才会执行,否则忽略*/
// 	contrastedCallback<C extends (...args:E[]) => any,F extends () => any[] , E = any>
// 	(callback : C , deps : F) : [(depsSetter : (prevDeps : any[]) => any[]) => C , () => void];
// };

import {
	reaction ,
	IReactionDisposer ,
} from 'mobx';
