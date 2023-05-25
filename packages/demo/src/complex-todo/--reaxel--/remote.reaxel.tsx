/**
 * 与远端交互以及初始化本地数据
 */
export const reaxel_remote = reaxel(() => {
	const { setUserList } = reaxel_user();
	const {store,setState} = orzMobx({
		database : null,
	});
	//将远端数据读取并转换为本地格式,分发给其他reaxel
	//还没确定远端数据存在哪,先用mock	
	async function syncFromRemote(){
		const res = Promise.resolve(mock_database);
		res.then((data) => {
			const lists = data.todo_lists.reduce((accu,item) => {
				
			},[]);
		});
		return res;
	}
	
	const api = {};
	return () => {
		
		return api;
	}
});

import { orzMobx , reaxel , Reaxes } from 'reaxes';
import { reaxel_user } from './user.reaxel';
import { mock_database } from '../mock.db';
