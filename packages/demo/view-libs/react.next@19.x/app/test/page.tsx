'use client';

export const rexaStatus = () => {
	const {store,setState,mutate} = createReaxable({
		pending: false as boolean|string|number ,
		error : false as boolean|string|number,
	});
	return {
		status:store,
		setStatus(status:Partial<typeof store>){
			setState(status);
		}
	}
};

export const reaxel_UserBio = reaxel(() => {
	const { status,setStatus } = rexaStatus();
	const { store , setState , mutate } = createReaxable({
		bio : null as string ,
		status ,
	});
	
	const fetchBio = () => {
		if( store.status.pending ) {
			return;
		}
		new Promise<string>(( resolve , reject ) => {
			setStatus({pending : true});
			setTimeout(() => {
				//Choose which code to comment out to switch different promise results.
				resolve(`I'm an software engineer.`);
				// reject('403 Forbidden');
			} , 2000);
		}).
		then(( bio ) => {
			setState({ bio });
			setStatus({ pending : false , error : false });
		}).catch(e => {
			setStatus({error : e,pending : false})
		});
	};
	const rtn = {
		UserBio_Store : store ,
		UserBio_SetState : setState ,
		UserBio_Mutate : mutate ,
		fetchBio ,
	};
	return () => rtn;
});




export default reaxper(() => {
	const {fetchBio,UserBio_Store} = reaxel_UserBio();
	
	React.useEffect(() => {
		fetchBio();
	} , []);
	
	if(UserBio_Store.status.error){
		return <div>Error Code: {UserBio_Store.status.error}</div>
	}
	if(UserBio_Store.status.pending){
		return <div>pending...</div>
	}
	
	return <div>{ UserBio_Store.bio }</div>;
});


import { createReaxable } from 'reaxes';
import * as utils from 'reaxes-utils';
import React from 'react';
import { reaxel , reaxper } from 'reaxes-react';
