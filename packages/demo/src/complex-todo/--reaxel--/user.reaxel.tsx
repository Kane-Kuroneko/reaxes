export const reaxel_user = reaxel( () => {
	const {store,setState} = orzMobx({
		user_id : null,
		user_list : [],
		
	});
	
	
	async function login(_user_id:string){
		
	}
	
	const api = {
		get user_id() { return store.user_id;} ,
		get user_list() { return store.user_list;} ,
		setUserList(user_list){
			setState({user_list});
		},
		login,
	};
	return () => {
		
		return api;
	};
} );


import { orzMobx , reaxel , Reaxes } from 'reaxes';
import { reaxel_remote } from './remote.reaxel';
