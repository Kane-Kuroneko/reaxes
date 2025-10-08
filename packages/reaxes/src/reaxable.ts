export const createReaxable  = <S extends object>(state : S) => {
	const store = observable<S>(state);

	const mergeMobxState = action(<S extends {}>(store:S , partialState:ResurivePartial<S>):S => {
		return _.merge(store , partialState);
	});
	
	/**
	 * 以赋值形式直接修改store内数据
	 * 支持以下调用方式:
	 * ```ts
	 * //只想改adreess内部
	 * mutate.profile.address( address => {
	 * 	address.city = 'Los Angeles'; 
	 *    address.country = 'USA'; 
	 * }
	 * ```
	 * 但要更加优越:
	 */
	const mutateMobxState = <S extends object>(s:S) => action(<CB extends (s:S) => void>(cb:CB) => (cb(s),s));
	const getMutateHandler = <CurrentState extends object>( currentState: CurrentState ): ProxyHandler<any> => (
		{
			get( _target , propKey , _receiver ) {
				const prop = propKey as keyof CurrentState;
				
				if( !Object.prototype.hasOwnProperty.call( currentState , prop ) ) {
					return undefined;
				}
				
				const subStore = currentState[prop];
				
				if( typeof subStore !== 'object' || subStore === null ) {
					return undefined;
				}
				
				return new Proxy( mutateMobxState( subStore ) , getMutateHandler( subStore ) );
			},
		}
	);
	const mutate = new Proxy(mutateMobxState(store),getMutateHandler(store)) as NestedMutate<S>;
	

	/**
	 * 将支持以下调用方式:
	 * ```ts
	 * setState.profile.address({
	 * 	city : 'Los Angeles' , //只想改city
	 * })
	 * ```
	 * 但要更加优越:
	 * 1.不需要每次都展开原对象
	 * 2.不会覆盖getter,使getter,setter失效
	 * 
	 */
	const setMobxState = <S extends object>(s:S) => action((partial : Partial<S>):S => {
		for(let k of Object.keys(partial)){
			if(s.hasOwnProperty(k)){
				s[k] = partial[k];
			}
		}
		return s;
	});
	const getHandler = <CurrentState extends object , SetState extends Function>(currentState: CurrentState): ProxyHandler<SetState> => {
		return {
			get(_target:SetState, propKey, _receiver) {
				const prop = propKey as keyof CurrentState;
				
				type SubStore = CurrentState[keyof CurrentState];
				
				if (!Object.prototype.hasOwnProperty.call(currentState, prop)) {
					return undefined;
				}
				
				const subStore = currentState[prop];
				
				if (typeof subStore !== 'object' || subStore === null) {
					return undefined;
				}
				
				return new Proxy(setMobxState(subStore),getHandler(subStore));
			}
		};
	};
	const setState = new Proxy(setMobxState(store), getHandler(store)) as NestedSetState<S>;
	
	return {
		store ,
		mutate,
		setState,
		merge: (partialState : ResurivePartial<S>) => mergeMobxState(store , partialState) ,
	};
};

export type ResurivePartial<T extends object>  = {
	[K in keyof T]? : T[K] extends object ? ResurivePartial<T[K]> : T[K];
}

export type HideFunctionProps = {
	[K in keyof Function as never]?: never;
};

export type NestedSetState<S extends object> =
	((partial: Partial<S>) => S)
	& HideFunctionProps
	& {[K in keyof S as IsArray<S[K]> extends true ? never : S[K] extends object ? K : never]: S[K] extends object ? NestedSetState<S[K]> : never};

export type NestedMutate<S extends object> =
	((cb: (s: S) => void) => S)
	& HideFunctionProps
	& {[K in keyof S as IsArray<S[K]> extends true ? never : S[K] extends object ? K : never]: S[K] extends object ? NestedMutate<S[K]> : never};

export type IsArray<T> = T extends any[] ? true : false;
export type IsObject<T> = T extends object
	? T extends any[]
		? false
		: true
	: false;

// =======test========
if(false){
	const {store,setState,mutate} = createReaxable({
		count : 0 ,
		profile : {
			name : 'John' ,
			age : 30 ,
			address : {
				city : 'New York' ,
				country : 'USA' ,
			} ,
		} ,
		tags : ['developer' , 'blogger'] ,
		
	});
	
	mutate.profile.address(address => {
		address.city = 'Los Angeles';
	})
	
}

export type CreateReaxable = typeof createReaxable;


import { action , observable  } from 'mobx';
import _ from 'lodash';
