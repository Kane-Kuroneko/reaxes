export const TodoList = reaxper(() => {
	const { ListFilter_Store , setFilterCriteria } = reaxel_ListFilter();
	
	return <div className={style['todo-list']}>
		<ul>
			{ ListFilter_Store.filteredTodoList.map(( item,index,arr ) => <React.Fragment key = { item.id }>
				<TodoListItem
					todoItem = { item }
				/>
				{(index !== arr.length - 1) && <hr/> }
			</React.Fragment>) }
		</ul>
	</div>;
});

import React from 'react';
import { reaxper } from 'reaxes-react';
import { ListFilter } from '../ListFilter';
import { TodoListItem } from '../TodoListItem';
import { reaxel_ListFilter } from 'reaxels/todo-app/filter-list';
import style from './style.module.css';
