/**
 * 
 */

export const Profile_reaxel = reaxel(() => {
	
	const {store,setState} = orzMobx({
		profile : null,
	});
	const { pendingState , setPending , setError } = orzPending();
	
	Reaxes.obsReaction(() => {
		if(pendingState.pending){
			return;
		}
		const { user } = UserSelect_reaxel();
		requestProfilePromise(user.name ).then((profile) =>{
			setState({profile});
		}).catch(() => {
			setError(true);
		}).finally(() => {
			setPending(false);
		});
	} , () => [
		UserSelect_reaxel().user
	]);
	
	
	const returned = {
		get profile(){
			return store.profile;
		},
	};
	
	return () => {
		return returned;
	};
});

const requestProfilePromise = (name:string) => utils.orzPromise((res) => {
	setTimeout(() => {
		res(`This is ${name}'s profile data`);
	},300);
});

import { orzPending } from 'reaxes-toolkit';
import { UserSelect_reaxel } from './user-select';
