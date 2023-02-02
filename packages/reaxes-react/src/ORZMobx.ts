/**
 * 创建一个mobx的observable对象
 */
export const orzMobx = <S extends object>(state : S) => {
	const store = observable<S>(state);
	/**
	 * 可变地修改store内数据, 不使用不可变从外部替换.
	 * @param partialState 深度递归部分合并state ,
	 */
	const mutatePartialState = <T extends object = S>(partialState : Partial<T> , deepStore : any = store) => {
		for( const key in partialState ) {
			const value = partialState[key];
			if( _.isPlainObject(value) ) {
				if( _.isPlainObject(deepStore[key]) ) {
					mutatePartialState(value as any , deepStore[key]);
				}
			} else if( isBasicType(value) ) {
				action(() => {
					
					deepStore[key] = value;
				})();
			}
		}
		
	};
	
	
	return {
		store ,
		setState : (partialState : Partial<S>) => setMobxState(store , partialState) ,
		mutatePartialState ,
	};
};


type isBasicType<V> = V extends basicType ? true : false;

type basicType = ( number | boolean | string | symbol | bigint | null | undefined );

const setMobxState = action(<S extends {}>(store , partialState : Partial<S>) => {
	Object.assign(store , partialState);
});

const isBasicType = <V>(value : V) : isBasicType<V> => {
	
	if( [ "boolean" , "string" , "undefined" , "number" , "symbol" , "bigint" ].
	includes(typeof value) ) {
		return true as any;
	} else if( value === null ) {
		return true as any;
	} else {
		return false as any;
	}
};
type RecursivePartial<S extends object> = {
	[p in keyof S]+? : S[p] extends object ? RecursivePartial<S[p]> : S[p];
};

import {
	observable ,
	action ,
} from 'mobx';
