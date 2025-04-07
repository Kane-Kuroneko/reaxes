export const reaxel_AddNew = reaxel(() => {
	const { store, setState, mutate } = createReaxable({
		addInputValue: '',
	});
	
	let todoItemId = 0;
	
	const addNew = () => {
		reaxel_TodoList.mutate(s => {
			s.todoList.push({
				id: ++todoItemId,
				checked: false,
				content: store.addInputValue,
				important: false,
			});
			
			console.log(JSON.stringify(s.todoList, null, 3));
		});
	};
	
	const setAddInput = (value: string) => {
		setState({ addInputValue: value });
	};
	
	return Object.assign(() => {
		return {
			addNew,
			setAddInput,
		};
	}, {
		store,
		setState,
		mutate,
	});
});


import { reaxel_TodoList } from '../todo-list';
import { reaxel , createReaxable } from 'reaxes';
