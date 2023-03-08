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
		return ret = {
			get count(){
				return store.count;
			},
			setCount(count:number = store.count + 1){
				setState( { count } );
			},
			plus:ret.setCount,
			minus(){
				setState( { count : store.count - 1 } );
			},
		}
	}
}(); 
