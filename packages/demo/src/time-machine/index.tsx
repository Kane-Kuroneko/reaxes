const reaxel__time_machine = reaxel( () => {
	const {store,setState} = orzMobx({
		content_list : [],
		user_input_content : "",
		
	});
	
	const machine = orzTimeMachine(store);
	
	const backInTime = (pointer:number) => {
		machine.travelBackInTime( machine.getTMNode(-1) );
	};
	
	return () => {
		
		return {
			get content_list(){
				return store.content_list
			},
			get user_input_content(){
				return store.user_input_content;
			},
			setState,
			machine,
			undo(){
				const travelStore = machine.travelBackInTime( -1 );
				console.log(logProxy(travelStore));
				if(travelStore){
					setState(travelStore);
				}else {
					console.log(machine.timeline);
					throw `无法时空旅行,改数据可能已被WeakMap释放`;
				}
			},
			timeM_back_in_time(){
				
			},
			timeM_add_to_content_list(){
				const tempStore = setState({
					content_list : [...store.content_list,store.user_input_content],
					user_input_content : ''
				});
				machine.addBackTime( { ...tempStore });
				// setState( {  } );
			},
		};
	};
} );


export const TimeMachineTest = reaxper( () => {
	const {
		machine ,
		timeM_add_to_content_list ,
		user_input_content ,
		content_list ,
		setState ,
		undo,
	} = reaxel__time_machine();
	return <>
		<div>
			<ul>
				{ content_list.map( ( str ) => <li key = { str }>{ str }</li> ) }
			</ul>
			<input
				value = {user_input_content}
				placeholder = '请输入'
				onChange = { ( e ) => {
					setState( { user_input_content : e.target.value } );
				} }
				onKeyDown = { ( e ) => {
					if( e.code == 'Enter' || e.code == "NumpadEnter" ) {
						timeM_add_to_content_list();
					}
				} }
			/>
			<button
				onClick = { () => {
					undo();
				} }
			>
				撤销
			</button>
		</div>
	</>;
} );

import { orzTimeMachine } from './orzTimeMachine';
