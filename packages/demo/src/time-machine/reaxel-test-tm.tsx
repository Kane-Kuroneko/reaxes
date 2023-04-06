export const reaxel__time_machine = reaxel( () => {
	const {store,setState} = orzMobx({
		content_list : [],
		user_input_content : "",
	});
	
	const machine = orzTimeMachine(store);
	
	const invalidTimeTravel = (timeNodeStore):never => {
		console.log(logProxy(machine.timeline),timeNodeStore);
		throw `无法时空旅行,改数据可能已被WeakMap释放`;
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
				const timeNodeStore = machine.backInTime( -1 );
				if(timeNodeStore){
					setState(timeNodeStore);
				}else {
					invalidTimeTravel(timeNodeStore);
				}
			},
			travel(timeNode:orzTimeMachine.timeNodeSymbol){
				const timeNodeStore = machine.timeTravel(timeNode);
				if(timeNodeStore) {
					setState(timeNodeStore);
				}else {
					invalidTimeTravel(timeNodeStore);
				}
			},
			get timeline(){
				return machine.obsTimeline;
			},
			timeM_add_to_content_list(){
				const tempStore = setState({
					content_list : [...store.content_list,store.user_input_content],
					user_input_content : ''
				});
				machine.addBackTime( { ...tempStore },Math.random().toString());
			},
		};
	};
} );

import { orzTimeMachine } from './orz-time-machine';
