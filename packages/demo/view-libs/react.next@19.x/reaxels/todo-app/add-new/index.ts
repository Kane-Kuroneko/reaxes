export const reaxel_AddNew = reaxel(() => {
	const {store,setState,mutate} = createReaxable({
		addInputValue : '',
	});
	
	let todoItemId = 0;
	
	const addNew = () => {
		const { TodoList_Mutate } = reaxel_TodoList();
		TodoList_Mutate(s => {
			s.todoList.push({
				id : ++todoItemId ,
				checked : false ,
				content : store.addInputValue ,
				important : false ,
			});
			
			console.log(JSON.stringify(s.todoList , null , 3));
		});
	};
	const setAddInput = (value:string) => {
		setState({ addInputValue : value });
	}
	
	const rtn = {
		AddNew_Store:store,
		AddNew_SetState:setState,
		AddNew_Mutate:mutate,
		addNew,
		setAddInput,
	};
	return () => rtn;
})


import { reaxel_TodoList } from '../todo-list';
import { reaxel , createReaxable } from 'reaxes';
