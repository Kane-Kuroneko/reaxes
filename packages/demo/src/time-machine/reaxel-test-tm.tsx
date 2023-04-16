export const reaxel__time_machine = reaxel( () => {
	const {store,setState} = orzMobx({
		content_list : [],
		user_input_content : "",
	});
	
	const machine = orzTimeMachine(store);
	
	const invalidTimeTravel = (timeNodeStore):never => {
		console.log(logProxy(machine.timeline),timeNodeStore);
		throw `无法时空旅行,该数据可能已被WeakMap释放`;
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
			revoke(){
				const timeNodeStore = machine.backInTime( -1 );
				if(machine.currentStore){
					setState(machine.currentStore);
				}else {
					invalidTimeTravel(machine.currentStore);
				}
			},
			travel(timeNode:TimeNodeSymbol|number){
				const timeNodeStore = machine.timeTravel(timeNode);
				if(machine.currentStore) {
					setState(machine.currentStore);
				}else {
					invalidTimeTravel(timeNodeStore);
				}
			},
			get timeline(){
				return machine.obsTimeline;
			},
			addToTimeline(){
				const user_input_content = store.user_input_content;
				const tempStore = setState({
					content_list : [...store.content_list,user_input_content],
					user_input_content : ''
				});
				machine.addBackTime( { ...tempStore },`backTimeID:${user_input_content}`);
			},
		};
	};
} );

import { orzTimeMachine,TimeNodeSymbol } from './orz-time-machine';
