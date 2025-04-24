'use client';
const distinct = distinctCallback((x) => {
	
} , () => [reaxel_Auth.store.input_username]);
export default reaxper(() => {
	const { statics , setInputName , token , login } = reaxel_Auth();
	distinct(() => [])('1');
	
	if( token ) {
		return <Profile />;
	} else {
		return <Login />;
	}
});

const Login = reaxper(( props ) => {
	const { login , setInputName , statics , logout , logginStatus } = reaxel_Auth();
	if(logginStatus.pending){
		return <p>logging...</p>
	}
	
	return <div>
		<select
			onChange = { ( e ) => {
				setInputName(e.target.value);
			} }
			value = { reaxel_Auth.store.input_username }
		>
			<option
				value = ""
				disabled
				hidden
			>
				请选择要登录的用户
			</option>
			{ statics.users.map(( { userName } ) => {
				return <option
					key = { userName }
					value = { userName }
				>{ userName }</option>;
			}) }
		</select>
		<button
			onClick = { () => {
				if( !reaxel_Auth.store.input_username ) {
					confirm('必须选择一个要登录的用户!');
					return;
				}
				login();
			} }
		>
			login
		</button>
		{logginStatus.error && <p>
			{ logginStatus.error.message }
		</p>}
		{ reaxel_Auth.store.logged_in && <button
			onClick = { () => logout() }
		>
			logout
		</button> }
	</div>;
});

const Profile = reaxper(( props ) => {
	const { bio , bioStatus , clearBio } = reaxel_Profile();
	const { logout } = reaxel_Auth();
	
	if( bioStatus.error ) {
		return <div>Error Code: { bioStatus.error }</div>;
	}
	if( bioStatus.pending ) {
		return <div>requesting user profile...</div>;
	}
	
	return <div>
		<p>{ bio }</p>
		<p>
			<button
				onClick={() => {
					logout()
				}}
			>logout</button>
		</p>
	</div>;
});

import { reaxel_Auth } from './reaxels/auth';
import { reaxel_Profile } from './reaxels/user-bio';
import React from 'react';
import { reaxper } from 'reaxes-react';
import { distinctCallback } from 'reaxes';
