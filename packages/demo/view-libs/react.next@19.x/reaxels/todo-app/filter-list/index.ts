export const reaxel_ListFilter = reaxel(() => {
	const { store, setState, mutate } = createReaxable({
		filterCriteria: null as FilterType,
		get filteredTodoList() {
			return reaxel_TodoList.store.todoList.filter(item => {
				switch (store.filterCriteria) {
					case null:
						return true;
					case 'active':
						return !item.checked;
					case 'completed':
						return item.checked;
					case 'starred':
						return item.important;
				}
			});
		},
	});
	
	const setFilterCriteria = (criteria: FilterType) => {
		setState({ filterCriteria: criteria });
	};
	
	return Object.assign(() => {
		return {
			setFilterCriteria,
		};
	}, {
		store,
		setState,
		mutate,
	});
});


import { reaxel_TodoList } from '../todo-list';
import type { FilterType } from '../types/exports';




import { reaxel , createReaxable } from 'reaxes';

