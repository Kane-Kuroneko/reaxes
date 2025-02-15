/*持久化数据库表结构*/
export const mock_database = {
	/*数据库中所有的用户列表*/
	user_list : [
		{
			name : "兔小舟",
			user_id : "fff97597",
			/*当前选中的[列表id,任务id]*/
			selected : ["fff97597","58a68284"],
		},
	],
	/*所有的任务列表,无论是哪个用户的*/
	todo_lists : [
		{
			belongs_to_user_id : "fff97597",
			title : "今日待办",
			list_id : "58a68284",
		},
	],
	/*所有列表内的所有任务,扁平化存储*/
	all_tasks : [
		{
			belongs_to_list_id : "58a68284",
			status : "todo",
			task_id : "159e",
			title : "来一发吧",
			detail : "biubiubiu",
		}
	],
};
