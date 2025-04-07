export const reaxel_Chat = reaxel(() => {
	
	const { store , setState , mutate } = createReaxable({
		modal_visible : true,
		new_msg_queue : [],
		
	});
	
	obsReaction(() => {
		const {token} = reaxel_User.store;
		if(!token){
			location.pathname = '/login';
		}
		
	},() => [
		reaxel_User.store.token,
		reaxel_User.store.user_id,
		reaxel_User.store.user_name,
		reaxel_User.store.user_avatar,
	])
	
	return Object.assign(() => {
		return {
			
		};
	} , {
		store , setState , mutate ,
	});
})

import { reaxel_User } from './user';
import { reaxel , createReaxable , obsReaction } from 'reaxes';

