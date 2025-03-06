export const reaxel_TodoList = reaxel(() => {
	const { store , setState , mutate } = createReaxable({
		todoList : [] as TodoItem[] ,
	});
	const getItemById = (id:number):TodoItem|null => {
		return store.todoList.find(item => item.id === id);
	}
	const toggleImportant = (
		id:number,
		important= !getItemById(id)?.important
	) => {
		mutate(s => {
			const item = s.todoList.find(item => item.id === id);
			if( item ) {
				item.important = important;
			}
		});
	}
	const toggleChecked = ( id: number , checked = !getItemById(id)?.checked ) => {
		const item = getItemById(id);
		if( item ) {
			mutate(s => {
				item.checked = !item.checked;
			});
		}
	};
	const editTodoItem = (id:number,content:string) => {
		const item = getItemById(id);
		mutate(s => {
			item.content = content;
		});
	}
	const deleteItem = (id:number) => {
		mutate(s => {
			s.todoList = s.todoList.filter(item => item.id !== id);
		});
	}
	const rtn = {
		TodoList_Store:store,
		TodoList_SetState:setState,
		TodoList_Mutate:mutate,
		toggleImportant,
		toggleChecked,
		editTodoItem,
		deleteItem,
	};
	return () => rtn;
});


import type { TodoItem } from '../types/exports';
import { reaxel , createReaxable } from 'reaxes';
