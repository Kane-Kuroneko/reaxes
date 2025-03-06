import { createReaxable } from "reaxes";

/**
 * todo 监听原生storage变化,提供实时更新的observable store;
 */
export const reaxel_storage = function(){
	const {
		store ,
		setState,
	} = createReaxable( {} );
	window.addEventListener('storage',() => {
		
	})
	
	return () => {
		
		return {
			get<ret extends any = string>( key:string ):ret {
				if ( key.length ) {
					try {
						return JSON.parse(window.localStorage.getItem( key ));
					}catch ( e ) {
						return window.localStorage.getItem( key ) as ret;
					}
				} else {
					throw `cannot find key '${ key }' in storage`;
				}
			},
			
			set( key : string , value , expiration:number|BigInt = null) {
				if ( typeof key === "string" ) {
					localStorage.setItem( key , value );
				} else {
					throw "0.7714076737885125|key must be string type";
				}
			},
			
			remove (key : string ){
				window.localStorage.removeItem( key );
			}
		};
	};
}();

/*****TEST******/
var a = (...args) => {
	console.log( ...args );
};
addEventListener('storage',(...args) => a(...args));
