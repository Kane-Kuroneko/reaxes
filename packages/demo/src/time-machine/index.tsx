
export const TimeMachineTest = reaxper( () => {
	const {
		machine ,
		timeM_add_to_content_list ,
		user_input_content ,
		content_list ,
		setState ,
		undo,
	} = reaxel__time_machine();
	
	const inputRef = useRef<HTMLInputElement>();
	
	return <>
		<div>
			<ul>
				{ content_list.map( ( str ) => <li key = { str + Math.random() }>{ str }</li> ) }
			</ul>
			<input
				value = {user_input_content}
				placeholder = '请输入'
				ref = {inputRef}
				onChange = { ( e ) => {
					setState( { user_input_content : e.target.value } );
				} }
				onKeyDown = { ( e ) => {
					if( e.code == 'Enter' || e.code == "NumpadEnter" ) {
						addToTimeline();
					}
				} }
			/>
			<button
				onClick = { () => {
					addToTimeline();
					inputRef.current.focus();
				} }
			>
				添加为时空碎片
			</button>
			<button
				onClick = { () => { undo(); } }
			>
				撤销
			</button>
		</div>
		<TimeTunnelFragments/>
	</>;
	
	function addToTimeline(){
		timeM_add_to_content_list();
	}
} );

import { orzTimeMachine } from './orz-time-machine';
import { reaxel__time_machine } from './reaxel-test-tm';
import { TimeTunnelFragments } from './Time-Tunnel-Fragments';
