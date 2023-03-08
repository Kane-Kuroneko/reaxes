
import {orzMobx} from '#reaxes';
/**
 * A simple counter using reaxes architecture
 */
export const reaxel_counter = function(){
	let ret;
	const {
		store ,
		setState,
	} = orzMobx( {
		count : 0 ,
	} );
	
	return () => {
		const setCount = (count:number = store.count + 1) => {
			setState( { count } );
		};
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
}();
