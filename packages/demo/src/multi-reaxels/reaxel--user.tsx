import {
	orzMobx ,
	Reaxlass ,
	reaxper ,
	Reaxes,
} from '@@packages/reaxes/src/index';


export const reaxel__user = function () {
	const {
		store ,
		setState ,
	} = orzMobx( {
		userInfo : null ,
		pending : false,
	} );
	
	return () => {
		
		return {
			get userInfo() {
				return store.userInfo;
			} ,
			get pending() {
				return store.pending;
			} ,
			fetchUserInfo() {
				setState( { pending : true } );
				const result = fetchUserInfo();
				result.then( ( info ) => setState( {
					userInfo : info ,
					pending : false ,
				} ) );
				return result;
			} ,
			logout() {
				setState( { userInfo : null } );
			} ,
		};
	};
}();

const fetchUserInfo = () => new Promise( ( resolve ) => {
	setTimeout( () => {
		resolve( {
			name : "路人甲" ,
			age : 23 ,
		} );
	} , 2500 );
} );
