"use client";

export default reaxper(() => {
	return <div className = { style['todo-app-root'] }>
		<TodoAdder />
		<ListFilter/>
		<TodoList />
	</div>;
});

import { ListFilter } from './components/ListFilter';
import { TodoAdder } from './components/TodoAdder';
import { TodoList } from './components/TodoList';
import { reaxper } from 'reaxes-react';
import style from './style.module.css';
