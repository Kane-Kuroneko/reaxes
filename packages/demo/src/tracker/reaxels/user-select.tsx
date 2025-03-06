/**
 * 
 */
export const UserSelect_reaxel = reaxel(() => {
	
	const {store,setState,} = createReaxable({
		user : null,
		options : [
			{
				name : "Jack",
				id : 1,
			},
			{
				name : "William",
				id : 2,
			},
			{
				name : "Min",
				id : 3,
			},
		],
	});
	
	return () => {
		
		
		return {
			get user(){
				return store.options.find(({id}) => id === store.user);
			},
		}
	}
});


import { computed ,observable} from 'mobx';
