const {store,setState} = createReaxable({
	userinfo : {
		username:"",
		
	},
	userlist : [
		{
			
		},
	],
	selected : ["58a68284","159e"],
	lists : [
		{
			title : "今日待办",
			id : "58a68284",
			tasks : [
				{
					status : "todo",
					id : "159e",
					title : "来一发吧",
					detail : "biubiubiu",
				},
			],
		}
	],
});

export const RC_Complex_Todo = reaxper(() => {
	
	const { user_list , user_id } = reaxel_user();
	const {} = reaxel_relay();
	
	console.log(user_id);
	return <div>
		{ user_id && <List /> }
		<Auth />
	</div>; 
}); 

const List = reaxper(() => {
	const {todo_list} = reaxel_user();
	console.log(logProxy(todo_list));
	const JSX_todo_list = todo_list.map(({title,list_id}) => {
		return <li
			key={list_id}
		>
			{title}
		</li>;
	});
	
	return <aside>
		<ul>
			{JSX_todo_list}
		</ul>
	</aside>;
});

const Auth = () => {
	const { login , user_list , setUserState , select_user_id , user_id,logout } = reaxel_user();
	
	const JSX_user_options = [{name:"无",user_id:""},...user_list].map(({name,user_id}) => {
		return <option
			key = { user_id }
			value = { user_id }
		>{ name }</option>;
	});
	
	return <div>
		{!user_id && <>
			<select
				value = { select_user_id }
				onChange = { ( e ) => (console.log(e),setUserState( {
					select_user_id : e.target.value ,
				} )) }
			>
				{ JSX_user_options }
			</select>
			<button
				onClick = { () => login() }
			>login
			</button>
		</>}
		{user_id && <button
			onClick = { () => logout() }
		>logout
		</button>}
	</div>;
};

const Register = () => {
	return <div>
	
	</div>;
};
	
import {reaxper} from 'reaxes-react';
import { reaxel_user , reaxel_relay } from '../--reaxel--';
import less from './index.module.less';
