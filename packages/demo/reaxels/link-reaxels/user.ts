export const reaxel_User = reaxel(() => {
	const { store , mutate , setState } = createReaxable({
		user_id : null as string,
		token : null as string,
		user_name : null as string,
		user_avatar : null as string,
	});
	return Object.assign(() => {
		return {
			
		}
	} , {
		store,
		mutate,
		setState,
	});
});


import { obsReaction , reaxel , createReaxable } from 'reaxes';
