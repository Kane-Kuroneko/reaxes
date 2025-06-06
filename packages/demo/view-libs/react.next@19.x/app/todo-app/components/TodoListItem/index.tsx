export const TodoListItem = reaxper(( props: {
	todoItem: TodoItem,
	
} ) => {
	const { id , checked , important , content } = props.todoItem;
	
	const { toggleImportant , toggleChecked , editTodoItem , deleteItem } = reaxel_TodoList();
	
	const [ editing , setEditing ] = useState(false);
	const [ editingContent , setEditingContent ] = useState(props.todoItem.content);
	const editRef = useRef<HTMLTextAreaElement>(null);
	
	
	useEffect(() => {
		if( editRef.current ) {
			const { length } = editRef.current.value;
			editRef.current.setSelectionRange(length , length);
			editRef.current.focus();
		}
	} , [ editing ]);
	
	return <li
		className = { style['todo-list-item'] }
	>
		{ editing ?
			<textarea
				ref = { editRef }
				value = { editingContent }
				onChange = { ( event ) => {
					setEditingContent(event.target.value);
				} }
				onBlur = { () => {
					editTodoItem(id , editingContent);
					setEditing(false);
				} }
			/>
			:
			<>
				<input
					type = "checkbox"
					checked = { checked }
					onChange = { ( event ) => toggleChecked(id , event.target.checked) }
				/>
				<span
					onDoubleClick = { () => setEditing(true) }
				>{ content }</span>
				<span
					className = { important ? "star" : 'gray-star' }
					onClick = { () => {
						toggleImportant(id);
					} }
				>⭐
				</span>
				<svg
					onClick = { () => deleteItem(id) }
					style = { {
						textDecoration : 'underline red' ,
						cursor : 'pointer' ,
						width : '18px' ,
						height : '18px' ,
						verticalAlign : '-3px' ,
					} }
					className = "icon"
					viewBox = "0 0 1024 1024"
					version = "1.1"
					xmlns = "http://www.w3.org/2000/svg"
					p-id = "2039"
				>
					<path
						d = "M768 384c-19.2 0-32 12.8-32 32l0 377.6c0 25.6-19.2 38.4-38.4 38.4L326.4 832c-25.6 0-38.4-19.2-38.4-38.4L288 416C288 396.8 275.2 384 256 384S224 396.8 224 416l0 377.6c0 57.6 44.8 102.4 102.4 102.4l364.8 0c57.6 0 102.4-44.8 102.4-102.4L793.6 416C800 396.8 787.2 384 768 384z"
						fill = "#272636"
						p-id = "2040"
					></path>
					<path
						d = "M460.8 736l0-320C460.8 396.8 448 384 435.2 384S396.8 396.8 396.8 416l0 320c0 19.2 12.8 32 32 32S460.8 755.2 460.8 736z"
						fill = "#272636"
						p-id = "2041"
					></path>
					<path
						d = "M627.2 736l0-320C627.2 396.8 608 384 588.8 384S563.2 396.8 563.2 416l0 320C563.2 755.2 576 768 588.8 768S627.2 755.2 627.2 736z"
						fill = "#272636"
						p-id = "2042"
					></path>
					<path
						d = "M832 256l-160 0L672 211.2C672 166.4 633.6 128 588.8 128L435.2 128C390.4 128 352 166.4 352 211.2L352 256 192 256C172.8 256 160 268.8 160 288S172.8 320 192 320l640 0c19.2 0 32-12.8 32-32S851.2 256 832 256zM416 211.2C416 198.4 422.4 192 435.2 192l153.6 0c12.8 0 19.2 6.4 19.2 19.2L608 256l-192 0L416 211.2z"
						fill = "#272636"
						p-id = "2043"
					></path>
				</svg>
			</>
		}
	</li>;
});


import React , { useEffect , useRef , useState } from 'react';
import { reaxper } from 'reaxes-react';
import { TodoItem } from '@/reaxels/todo-app/types/exports';
import { reaxel_TodoList } from '@/reaxels/todo-app/todo-list';
import style from './style.module.css';
