import {
	observable ,
	action,
} from 'mobx';

export const orzMobx = <S extends object>( state : S ) => {
	const store : Omit<S , "hasOwnProperty"> = observable<S>( state);
	
	return {
		store ,
		setState : <PS extends Partial<S>>( partialState : PS ) => setMobxState( store , partialState ) ,
		/**
		 * todo
		 * 递归地自动合并进行setState
		 * @example 
		      setPartialState({
		         shopInfo : {
		            其他属性会被自动 ...xxx合并入当前对象
		            shopName : "new Name"
		         }
		      })
		 */
		setPartialState : ( partialState : RecursivePartial<S> ) => {} ,
	};
};


const makePartialState = state => {};

const setMobxState = action( <S extends {}>( store , partialState : Partial<S> ) => {
	Object.assign( store , partialState );
} );

/*手动收集依赖,使组件响应store的值变化. keys是要指定响应的属性
 *如果不传propKeys则整个store的变化都会引起重新渲染*/
export const collectDeps = (store , propKeys : (string|number|symbol)[] = []) => {
	if(propKeys.length){
		propKeys.forEach( ( key ) => {
			store[ key ];
		} );
	}else {
		Object.getOwnPropertyNames( store ).forEach( ( key ) => {
			store[ key ];
		} );
	}
};

type RecursivePartial<S extends object> = {
	[p in keyof S]+? : S[p] extends object ? RecursivePartial<S[p]> : S[p];
};

