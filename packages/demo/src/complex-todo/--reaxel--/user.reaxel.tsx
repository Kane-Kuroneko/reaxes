export const reaxel_user = reaxel( () => {
	const initialState = {
		select_user_id : undefined,
		user_id : null,
		user_list : [],
		todo_list : [],
	};
	const {store,setState} = createReaxable(initialState);
	
	async function login(){
		if(!store.select_user_id){
			return console.warn('选择一个有效的用户!');
		}
		setState( { user_id:store.select_user_id } );
	}
	
	function logout(){
		setState(_.omit(initialState,'user_list'));
	}
	
	const api = {
		get user_id() { return store.user_id;} ,
		get todo_list() { return store.todo_list;} ,
		get select_user_id() { return store.select_user_id;} ,
		get user_list() { return store.user_list;} ,
		/*将所有的用户表传入进来,无论来源*/
		setUserList(user_list){
			setState({user_list});
		},
		/*将当前用户名下的代办列表传进来,无论来源*/
		setUserTodoList(todo_list){
			setState({todo_list});
		},
		setUserState:setState,
		login,
		logout,
	};
	
	
	return () => {
		
		return api;
	};
} );


import { createReaxable , reaxel , Reaxes } from 'reaxes';
import { reaxel_relay } from './remote.reaxel';
