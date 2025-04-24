export const createReaxable  = <S extends object>(state : S) => {
	const store = observable<S>(state);

	const setMobxState = action(<S extends {}>(store , partialState : Partial<S>):S => {
		for(let k of Object.keys(partialState)){
			if(store.hasOwnProperty(k)){
				store[k] = partialState[k];
			}
		}
		return store;
	});
	
	const mergeMobxState = action(<S extends {}>(store , partialState : Partial<S>):S => {
		return _.merge(store , partialState);
	});
	
	/**
	 * 以赋值形式直接修改store内数据,免去层层partial的麻烦
	 */
	const mutate = <T extends (store:S) => void>(callback:T) => {
		action(() => callback(store))();
		return store;
	};
	
	return {
		store ,
		mutate,
		setState : (partialState : Partial<S>) => setMobxState(store , partialState) ,
		mergeState : (partialState : Partial<S>) => mergeMobxState(store , partialState) ,
	};
};

type RecursivePartial<S extends object> = {
	[p in keyof S]+? : S[p] extends object ? RecursivePartial<S[p]> : S[p];
};

import { action , observable  } from 'mobx';
import _ from 'lodash';
