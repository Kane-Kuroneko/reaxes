/**
 * 在reaxel而不是组件中调用,否则每次组件执行都会生成全新的machine
 * @param initialState
 */
export const orzTimeMachine = <S extends {}>(initialState:S) => {
	const initial = {...initialState};
	const travelMap = new WeakMap();
	/*存储时间线,栈结构*/
	const timeline = [];
	/*不信任js的数组length,改由自己统计数组内元素个数*/
	let timelineMemberCount = 0;
	let pointer = -1;
	
	function addBackTime(state:partialState,desc?:string) {
		const travelSymbol:timeNodeSymbol = {desc};
		travelMap.set(travelSymbol,state);
		timeline[++pointer] = travelSymbol;
		timelineMemberCount++;
		return travelSymbol;
		
	}
	
	/*将当前位置之后的timeline全部切掉*/
	function cutOff(){
		
	}
	
	function replaceTimelineItem(){
		
	}
	
	/*传入指针要移动到的位置,-1代表倒数第二个,0代表最后一个*/
	function getTMNode(offset:number = 0){
		if(offset > 0) throw "Error05ae6ae1:pointer必须<=0!";
		pointer = pointer + offset;
		
		return timeline[pointer];
	}
	/*传入指针偏移量,如果当前已经是第一个添加的状态,则会指向initial*/
	function travelBackInTime(offset:number = 0) {
		if(offset < 0){
			switch( pointer ){
				case 0 :{
					return pointer = -1 ,initial;
				};
				case -1 : {
					return initial;
				};
			}	
		}
		if(pointer === 0 && offset < 0){
			return pointer = -1 ,initial;
		}
		return travelMap.get( getTMNode(offset) );
	}
	
	function debugPrintTimeline(){
		const _timeline = utils.logProxy(timeline.map((symbol) => {
			return travelMap.get(symbol);
		}));
		crayon.green("timeline:",_timeline,"pointer:",pointer);
		return _timeline;
	}
	
	return {
		addBackTime,
		travelBackInTime,
		getTMNode,
		get timeline(){
			return [pointer,timeline.length-1];
		},
	};
	type partialState = Partial<S>;
};

type timeNodeSymbol = {desc?:string};
import {produce} from 'immer';
