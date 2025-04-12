export const reaxel_Auth = reaxel(() => {
	
	const { store , setState , mutate } = createReaxable({
		logged_in : false as false | {
			token: string | null;
			userName: string | null;
		} ,
		input_username : '' ,
		
	});
	
	obsReaction(() => {
		console.log(`store.input_username: ${ store.input_username }`);
	} , () => [ store.input_username ]);
	
	const tokenSymbol = Symbol('token');
	const delaySymbol = Symbol('delay');
	const statics = {
		users : [
			{
				userName : 'John Doe' ,
				[tokenSymbol] : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMjM0NTYiLCJyb2xlIjoiYWRtaW4iLCJleHAiOjE3MDAwMDAwMDB9.dBjftJeZ4CVP-mB92K27uhbUJU1p1r_wW1gFWFOEjXk' ,
				[delaySymbol] : Math.random() * 1000 ,
			} ,
			{
				userName : 'Sarah Connor' ,
				[tokenSymbol] : 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjU2Nzg5MCIsImVtYWlsIjoidGVzdEBleGFtcGxlLmNvbSIsImlhdCI6MTcwMDAwMDAwMCwiZXhwIjoxNzAwMDA4MDAwfQ.dummy-signature-part-2' ,
				[delaySymbol] : Math.random() * 1000 ,
			} ,
		] ,
	};
	
	const { setStatus , status } = rexaStatus();
	const login = async() => {
		if(status.pending){
			return;
		}
		setStatus({
			pending : xPromise() ,
			error : null ,
		});
		const user = statics.users.find(( user ) => user.userName === store.input_username);
		const dataPromise = fetch(`/api/deelay?delay=${ user[delaySymbol] }&target=${ encodeURIComponent('https://httpbin.org/anything') }` , {
			method : 'POST' ,
			headers : {
				'Content-Type' : 'application/json' ,
			} ,
			body : JSON.stringify({
				token : user[tokenSymbol] ,
				userName : store.input_username ,
			}) ,
		}).
		then(async r => (await r.json()).json).
		then((data:{token:string,userName:string}) => {
			console.log(data);
			setState({
				logged_in : data ,
				input_username : '' ,
			});
			setStatus({
				pending : false ,
				error : null ,
			});
			return data;
		});
		dataPromise.catch(e => {
			setStatus({
				pending : false ,
				error : e ,
			});
		});
		return dataPromise;
	};
	
	const logout = () => {
		setState({
			logged_in : false ,
		});
	};
	
	const setInputName = ( name: string ) => {
		setState({
			input_username : name ,
		});
	};
	
	return Object.assign(() => {
		return {
			statics ,
			get token(){
				if( _.isObject(store.logged_in) ) {
					return store.logged_in.token;
				} else {
					return null;
				}
			} ,
			setInputName ,
			login ,
			logout ,
			logginStatus : status ,
		};
	} , {
		store ,
		setState ,
		mutate ,
	});
});

import { xPromise } from 'reaxes-utils';
import { rexaStatus } from 'reaxes-toolkit';
import { reaxel , createReaxable , obsReaction } from 'reaxes';
import _ from 'lodash';
