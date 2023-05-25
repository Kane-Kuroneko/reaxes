/**
 * 与远端交互以及初始化本地数据
 */
export const reaxel_relay = reaxel(() => {
	const { setUserList,setUserTodoList } = reaxel_user();
	const { store , setState } = orzMobx( {
		user_list : [] ,
		/*structure like {"$user_id":Array<todo_list>,...}*/
		user_id_todo_list_mapping : null ,
	} );
	//将远端数据读取并转换为本地格式,分发给其他reaxel
	//还没确定远端数据存在哪,先用mock	
	async function syncFromRemote(){
		const res = Promise.resolve(mock_database);
		
		res.then((data) => {
			const user_list = data.user_list;
			/*it's like {"$list_id":Array<tasks>,...}*/
			const todo_list_task_mapping = data.all_tasks.reduce((accu,task) => {
				const todo_list = accu[task.belongs_to_list_id];
				const processed = _.cloneDeep(_.omit(task,"belongs_to_list_id"));
				if(Array.isArray(todo_list)){
					todo_list.push(processed);
				}else {
					accu[task.belongs_to_list_id] = [processed];
				}
				return accu;
			},{});
			const user_id_todo_list_mapping = data.todo_lists.reduce((accu,todo_list_item) => {
				const processed = {
					..._.cloneDeep(_.omit(todo_list_item,"belongs_to_user_id")),
					tasks : todo_list_task_mapping[todo_list_item.list_id],
				};
				accu[todo_list_item.belongs_to_user_id].push(processed);
				return accu;
			},user_list.reduce((accu,{user_id}) => {
				accu[user_id] = [];
				return accu;
			} ,{})/*this initial value like {"$user_id":[],...}*/);
			
			setState({
				user_list,
				user_id_todo_list_mapping
			});
			setUserList(user_list);
		});
		return res;
	};
	
	window.addEventListener('load',async () => {
		syncFromRemote();
	});
	
	Reaxes.obsReaction(() => {
		const { user_id } = reaxel_user();
		if(user_id && store.user_id_todo_list_mapping.hasOwnProperty(user_id)){
			console.log(_.cloneDeep(store.user_id_todo_list_mapping[user_id]));
			setUserTodoList(_.cloneDeep(store.user_id_todo_list_mapping[user_id]));
		} else if(!user_id){
			setUserTodoList([]);
		}
	},() => [reaxel_user().user_id]);
	
	const api = {
		
	};
	return () => {
		
		return api;
	}
});

import _ from 'lodash';

import { orzMobx , reaxel , Reaxes } from 'reaxes';
import { reaxel_user } from './user.reaxel';
import { mock_database } from '../mock.db';
