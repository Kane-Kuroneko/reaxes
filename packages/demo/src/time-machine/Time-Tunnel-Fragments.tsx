/**
 * 这个组件存渲染出存储过的时空片段
 */
export const TimeTunnelFragments = reaxper( () => {
	const {
		machine,
		travel,
		timeline,
	} = reaxel__time_machine();
	
	useEffect(() => {
		crayon.blue( 'TimeTunnelFragments rendered' ,timeline);
	})
	return <div>
		{timeline.map((timeNode) => {
			return <button
				key = { timeNode.desc }
				onClick = { () => {
					travel(timeNode);
				} }
			>
				{ timeNode.desc }
			</button>;
		})}
	</div>;
} );

import { orzTimeMachine } from './orz-time-machine';
import { reaxel__time_machine } from './reaxel-test-tm';
