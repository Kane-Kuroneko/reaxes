/**
 * A simple counter using reaxes architecture
 */
export const reaxel_counter = reaxel(() => {
	let ret;
	const {
		store ,
		setState,
	} = createReaxable( {
		count : 0 ,
	} );
	
	function setCount(count:number = 1){
		// crayon.blue('count:',count);
		setState( { count : store.count + count } );
	}
	
	obsReaction( () => {
		console.log(store.count);
	} , () => [store.count] );
	
	return () => {
		return ret = {
			get count(){
				return store.count;
			},
			setCount,
			plus:setCount,
			minus(count:number = 1){
				setState( { count : store.count - count } );
			},
		}
	}
});

import { reaxel , createReaxable , obsReaction } from 'reaxes';
