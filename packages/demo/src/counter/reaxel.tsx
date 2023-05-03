/**
 * A simple counter using reaxes architecture
 */
export const reaxel_counter = reaxel(() => {
	let ret;
	const {
		store ,
		setState,
	} = orzMobx( {
		count : 0 ,
	} );
	
	function setCount(count:number = store.count + 1){
		// crayon.blue('count:',count);
		setState( { count } );
	}
	
	Reaxes.obsReaction( () => {
		console.log(store.count);
	} , () => [store.count] );
	
	return () => {
		return ret = {
			get count(){
				return store.count;
			},
			setCount,
			plus:setCount,
			minus(){
				setState( { count : store.count - 1 } );
			},
		}
	}
});

import {Reaxes,reaxel,orzMobx} from 'reaxes';
