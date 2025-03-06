export const reaxel_ListFilter = reaxel(() => {
	const { store , setState , mutate } = createReaxable({
		filterCriteria : null as FilterType ,
		get filteredTodoList(){
			const { TodoList_Store } = reaxel_TodoList();
			return TodoList_Store.todoList.filter(( item ) => {
				switch( store.filterCriteria ) {
					case null :
						return true;
					case "active" :
						return !item.checked;
					case "completed" :
						return item.checked;
					case "starred" :
						return item.important;
				}
			});
		} ,
	});
	
	const setFilterCriteria = ( criteria: FilterType ) => {
		setState({ filterCriteria : criteria });
	};
	
	const rtn = {
		ListFilter_Store : store ,
		ListFilter_SetState : setState ,
		ListFilter_Mutate : mutate ,
		setFilterCriteria ,
	};
	return () => rtn;
});


import { reaxel_TodoList } from '../todo-list';
import type { FilterType } from '../types/exports';




import { reaxel , createReaxable } from 'reaxes';

