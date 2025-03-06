/*从远端读入转换后的运行时数据结构*/
const store = {
	user_id : "",
	user_name : "",
	user_list : [],
	lists : [
		{
			/*是否正在编辑列表名,正在列表内编辑还是task任务区顶部编辑*/
			// false/"list"/"task"
			editing : "",
			title : "今日待办",
			list_id : "58a68284",
			tasks : [
				{
					status : "todo",
					task_id : "159e",
					title : "来一发吧",
					detail : "biubiubiu",
				}
			],
		}
	],
	
};


export * from './user.reaxel';
export * from './remote.reaxel';
import { reaxel , Reaxes , createReaxable } from 'reaxes';
