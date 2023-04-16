
export const TimeMachineTest = reaxper( () => {
	const {
		machine ,
		addToTimeline ,
		travel,
		user_input_content ,
		content_list ,
		setState ,
		revoke,
	} = reaxel__time_machine();
	
	const inputRef = useRef<HTMLInputElement>();
	
	return <>
		<div>
			<ul>
				{ content_list.map( ( str ) => <li key = { str + Math.random() }>{ str }</li> ) }
			</ul>
			<input
				value = { user_input_content }
				placeholder = '请输入'
				ref = { inputRef }
				onChange = { ( e ) => {
					setState( { user_input_content : e.target.value } );
				} }
				onKeyDown = { ( e ) => {
					if( e.code == 'Enter' || e.code == 'NumpadEnter' ) {
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
			<div>
				<button
					style = { machine.currentTimelineIndex < 0 && { display : 'none' } || {} }
					onClick = { () => {
						travel(-1);
					} }
				>
					后退
				</button>
				<button
					style = { machine.currentTimelineIndex + 1 >= machine.obsTimeline.length && { display : 'none' } || {} }
					onClick = { () => {
						travel(1);
					} }
				>
					前进
				</button>
			</div>
			<button
				onClick = { () => { revoke(); } }
			>
				撤销
			</button>
		</div>
		<TimeTunnelFragments />
	</>;
	
} );

import { orzTimeMachine } from './orz-time-machine';
import { reaxel__time_machine } from './reaxel-test-tm';
import { TimeTunnelFragments } from './Time-Tunnel-Fragments';
