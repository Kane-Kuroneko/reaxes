export const Reaxes = new (class {
	
	obsReaction<F extends (first? : boolean , disposer? : IReactionDisposer) => any>(callback : F , dependencies) : ReturnType<F>{
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
	 * 新特性: closuredMemo()返回元组:[0]:与传入的callback签名;[1]:resetDeps将依赖重置到初始状态.
	 */
	contrastedCallback(callback , deps = () => []){
		let depList = deps();
		/*如果没有执行 则返回上次执行结果*/
		let prevReturn = null;
		return [
			(depsSetter) => {
				const tempDepsList = depsSetter(depList);
				return (...args) => {
					/*debug时打开*/
					// console.log(!utils.default.shallowEqual(depList,tempDepsList),depList,tempDepsList);
					if( !utils.shallowEqual(depList , tempDepsList) ) {
						prevReturn = callback(...args);
						depList = tempDepsList;
						return prevReturn;
					}else {
						return prevReturn;
					}
				};
			} , () => {
				depList = deps();
			},
		];
	}
	
	
	/*手动收集依赖,使组件响应store的值变化. keys是要指定响应的属性
	 *如果不传propKeys则整个store的变化都会引起重新渲染*/
	collectDeps = (store , propKeys : ( string | number | symbol )[] = []) => {
		if( typeof store !== "object" || store == null ) return;
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
	
} as Reaxes);

type Reaxes = new () => {
	collectDeps(store : object , propKeys? : ( string | number | symbol )[]) : void;
	/*自动收集dependencies里的依赖, 当依赖变化时自动执行callback*/
	obsReaction<F extends (first : boolean , disposer? : IReactionDisposer) => any>(callback : F , dependencies) : ReturnType<F>;
	/*将其返回值存储下来 , 每次调用其时传入依赖数组,当与上次浅比较不匹配时才会执行,否则忽略*/
	contrastedCallback<C extends (...args:E[]) => any,F extends () => any[] , E = any>
	(callback : C , deps : F) : [(depsSetter : (prevDeps : any[]) => any[]) => C , () => void];
};

import {
	reaction ,
	IReactionDisposer ,
} from 'mobx';
