export const reaxel_Profile = reaxel(() => {
	const {store,setState,mutate} = createReaxable({
		bio : null as string,
	});
	
	const {status,setStatus} = rexaStatus();
	let rqstId = 0;
	obsReaction(async( first , disposer ) => {
		if( !reaxel_Auth.store.logged_in ) {
			setState({ bio : null });
			return;
		}
		
		if( reaxel_Auth.store.logged_in && reaxel_Auth.store.logged_in.token ) {
			const currentRqstId = ++rqstId;
			setStatus({
				pending:xPromise(),
				error:null,
			});
						
			try {
				const profile = await fetch(`/api/deelay?delay=${Math.random() * 1000}&target=${ encodeURIComponent('https://httpbin.org/anything') }`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						bio : `这是${reaxel_Auth.store.logged_in.userName}的bio`
					}),
				}).
				then(
					res => res.json().
					then(r => r.json as { bio : string } )
				);
				
				if(currentRqstId !== rqstId) {
					return;
				}
				
				setState({
					bio : profile.bio,
				});
				status.pending.resolve();
				setStatus({ error : null , pending:false });
			}catch ( e ) {
				status.pending.reject();
				setStatus({ error : e , pending:false });
			}
		}
		
	} , () => [
		reaxel_Auth.store.logged_in ,
		(_.isObject(reaxel_Auth.store.logged_in) && reaxel_Auth.store.logged_in.token) ,
	]);
	
	return Object.assign(() => {
		return {
			get bio(){
				return store.bio;
			},
			get bioStatus(){
				return status;
			},
			clearBio(){
				setState({ bio : null });
			},
		};
	},{
		store,
		setState,
		mutate
	});
});

import _ from 'lodash';
import { reaxel_Auth } from './auth';
import { rexaStatus } from 'reaxes-toolkit';
import { xPromise } from 'reaxes-utils';
import { createReaxable , obsReaction , reaxel } from 'reaxes';
