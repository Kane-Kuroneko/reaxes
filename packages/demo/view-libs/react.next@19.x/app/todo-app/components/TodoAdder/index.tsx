export const TodoAdder = reaxper(() => {
	const { setAddInput , addNew } = reaxel_AddNew();
	
	return <div className={style['todo-adder']}>
		<input
			type = "text"
			placeholder = "type something here.."
			value = { reaxel_AddNew.store.addInputValue }
			onInput = { ( event: React.ChangeEvent<HTMLInputElement> ) => {
				setAddInput(event.target.value);
			} }
			onKeyDown = { ( event ) => {
				if( event.key === 'Enter' ) {
					addNew();
					setAddInput('');
				}
			} }
		/>
		<button
			onClick = { () => {
				addNew();
				setAddInput('');
			} }
			disabled = { !reaxel_AddNew.store.addInputValue }
		>{ "add to ToDo" }</button>
	</div>;
});

import React from 'react';
import { reaxper } from 'reaxes-react';
import { reaxel_AddNew } from '@/reaxels/todo-app/add-new';
import style from './style.module.css';
