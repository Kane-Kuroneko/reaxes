
export const reaxel_user_login = function () {
	
	const {store ,setState} = createReaxable( {
		user_account : null ,
		user_token : null ,
		user_info : null,
	} );
	
	const login = () => {
		return new Promise<any>( ( resolve ) => {
			setTimeout( () => resolve( {
				user_account : "xxx@gmail.com" ,
				user_token : "9d8as9vasd" ,
				user_info : {
					name : "papa" ,
					age : 19,
				} ,
			} ) );
		} ).then( ( res ) => {
			setState( { ...res } );
		} );
	}
	
	return () => {
		
		return {
			get user_store() {
				return store;
			},
			login,
		};
	};
}();
