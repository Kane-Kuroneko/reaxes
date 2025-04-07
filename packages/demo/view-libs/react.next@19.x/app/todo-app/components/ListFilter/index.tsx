export const ListFilter = reaxper(() => {
	const { setFilterCriteria } = reaxel_ListFilter();
	const { filterCriteria } = reaxel_ListFilter.store;
	const onChange = ( event: React.ChangeEvent<HTMLInputElement> ) => {
		switch( event.target.value ) {
			case "all": {
				setFilterCriteria(null);
				return;
			}
			case "active": {
				setFilterCriteria('active');
				return;
			}
			case "starred": {
				setFilterCriteria('starred');
				return;
			}
			case "completed": {
				setFilterCriteria('completed');
				return;
			}
		}
	};
	
	return <div className = { style['list-filter'] }>
		<label>
			<input
				checked = { filterCriteria === null }
				onChange = { onChange }
				type = "radio"
				name = "filter"
				value = "all"
			/>
			all
		</label>
		<label>
			<input
				checked = { filterCriteria === 'active' }
				onChange = { onChange }
				type = "radio"
				name = "filter"
				value = "active"
			/>
			active
		</label>
		<label>
			<input
				checked = { filterCriteria === 'starred' }
				onChange = { onChange }
				type = "radio"
				name = "filter"
				value = "starred"
			/>
			starred
		</label>
		<label>
			<input
				checked = { filterCriteria === 'completed' }
				onChange = { onChange }
				type = "radio"
				name = "filter"
				value = "completed"
			/>
			completed
		</label>
	</div>;
});

import React from 'react';
import { reaxper } from 'reaxes-react';
import { reaxel_ListFilter } from '@/reaxels/todo-app/filter-list';
import { FilterType  } from '@/reaxels/todo-app/types/exports';
import style from './style.module.css';
