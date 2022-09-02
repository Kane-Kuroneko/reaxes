import {
	Reaxlass ,
	Reaxper ,
	orzMobx ,
	Reaxes ,
} from 'reaxes';

import { reaxel__user } from './reaxel--user';

export const User = Reaxper( ( props ) => {
	const {
		userInfo ,
		pending ,
	} = reaxel__user();
	
	return <>
		{ pending && <Loading /> }
		{ userInfo ? <UserInfo /> : <Empty /> }
	</>;
} );

const Empty = Reaxper( () => {
	const {
		pending ,
		fetchUserInfo ,
	} = reaxel__user();
	if( pending ) return null;
	return <div>
		当前用户没登陆~
		<p>
			<button
				onClick = { () => fetchUserInfo() }
			>登陆
			</button>
		</p>
	</div>;
} );

const Loading = Reaxper( () => {
	return <p>
		正在请求用户信息,请稍候
	</p>;
} );

const UserInfo = Reaxper( () => {
	const {
		userInfo ,
		logout ,
	} = reaxel__user();
	
	return <div>
		<p>用户已登陆</p>
		<p>用户名: { userInfo.name }</p>
		<p>年龄: { userInfo.age }</p>
		<button onClick = { () => {logout();} }>注销</button>
	</div>;
} );
