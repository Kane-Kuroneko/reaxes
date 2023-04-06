/**
 * 在reaxel而不是组件中调用,否则每次组件执行都会生成全新的machine
 * @param initialState
 */
export const orzTimeMachine = <S extends {}>(initialState:S) => {
	const initial = {...initialState};
	const travelMap = new WeakMap<timeNodeSymbol,Partial<S>>();
	/*存储时间线,栈结构*/
	let timeline = [];
	const {store,setState} = orzMobx({
		timeline:timeline,
		/*尾指针,永远指向timeline的最后一个元素的索引*/
		tailPointer : -1,
		/*表示当前timeline移动到哪里的指针*/
		pointer:-1,
	});
	
	
	Reaxes.obsReaction((first,dispose) => {
		setObsTimeline();
	},() => [store.pointer,store.tailPointer]);
	
	/*使用类来构造symbol,普通对象会被mobx深层代理,view层拿不到原始对象。*/
	class TimeNodeSymbol {
		constructor(desc?:string) {
			Object.assign(this,{desc:desc ?? Math.random().toString()});
		}
	};
	
	/**
	 * 将内部的timeline数组的指针更新,并通知obsTimeline;
	 */
	function replaceTimeline(callback:(origTimeline:Array<timeNodeSymbol>) => Array<timeNodeSymbol> ){
		timeline = callback([...timeline]) ?? timeline;
		setObsTimeline();
	}
	
	function addBackTime(state:partialState,desc?:string) {
		const travelSymbol:timeNodeSymbol = new TimeNodeSymbol(desc);
		travelMap.set(travelSymbol,state);
		// timeline[++pointer] = travelSymbol;
		replaceTimeline((origTimeline) => {
			const index = store.tailPointer + 1;
			origTimeline[index] = travelSymbol;
			setState( { tailPointer : index } );
			return origTimeline;
		});
		return travelSymbol;
	}
	
	/*将当前位置之后的timeline全部切掉*/
	// function cutOff(positon:number){
	// 	if(positon === -1){
	// 		return timeline = [];
	// 	}
	// 	return timeline = timeline.slice(positon);
	// }
	
	function replaceTimelineItem(){
		
	}
	
	/*依据偏移量获取对应位置的timeNodeSymbol*/
	function getTimeNodeSymbol(offset:number = 0){
		const {pointer,tailPointer} = store;
		const _pointer = pointer + offset;
		if(_pointer > pointer){
			return timeline[pointer];
		}
		if(_pointer < -1){
			return null;
		}
		return timeline[_pointer];
	}
	
	/**
	 * 永久回到过去，这个节点以后的时间片段将被丢弃。
	 * 将指针指向过去的某个位置，重置片段长度为回到过去后指针位置。
	 */
	function backInTime(timeNode:timeNodeSymbol):Partial<S>;
	function backInTime(offset:number):Partial<S>;
	function backInTime(offset){
		const {pointer} = store;
		crayon.orange(`before pointer`,pointer);
		if(typeof offset === "number"){
			const _pointer = offset + pointer;
			if(_pointer <= -1){
				replaceTimeline( ( origTimeline ) => {
					setState({pointer:-1});
					return origTimeline;
				} );
				return initial;
			}
			if(offset > 0){
				throw `error@765b:backInTime函数不允许正数offset,当前传入${offset}`;
			}
			replaceTimeline( ( origTimeline ) => {
				setState( { pointer : _pointer } );
				return origTimeline;
			} );
			return travelMap.get( getTimeNodeSymbol(_pointer) );
		}else {
			const {pointer} = store;
			let timeNode = offset;
			const index = timeline.findIndex(({desc}) => {return timeNode.desc === desc });
			
			replaceTimeline( ( origTimeline ) => {
				/*回滚失败,什么都不做*/
				if(index === -1){
					return ;
				}
				/*回滚成功*/
				setState( { pointer : index } );
				return origTimeline.slice( 0 , index );
			} );
			if(index === -1){
				return undefined;
			}
			// timeline = timeline.slice(0,pointer);
			return travelMap.get(timeNode);
		}
	}
	
	/**
	 * 获取时间线中任意一个时间片段，不会改变当前指针位置。
	 * @overload:timeNode:传入timeNodeSymbol
	 * @overload:offset:传入指针偏移量,如果当前已经是第一个添加的状态,则会指向initial
	 */
	function timeTravel(timeNode:timeNodeSymbol):Partial<S>;
	function timeTravel(offset:number):Partial<S>;
	function timeTravel(offset):Partial<S> {
		const {pointer} = store;
		if(typeof offset === "number"){
			if(offset < 0){
				if(pointer < 1) return initial; 
			}
			return travelMap.get( getTimeNodeSymbol(offset) );
		}else {
			let timeNode = offset;
			return travelMap.get(timeNode);
		}
		
	}
	
	function setObsTimeline(){
		setState( { timeline } );
	}
	
	function debug(){
		const _timeline = utils.logProxy(timeline.map((symbol) => {
			return travelMap.get(symbol);
		}));
		crayon.green("timeline:",_timeline,"pointer:",pointer);
		return _timeline;
	}
	
	return {
		debug,
		addBackTime,
		timeTravel,
		backInTime,
		getTimeNodeSymbol,
		get obsTimeline(){
			return store.timeline;
		},
		/**
		 * @readonly
		 * @desc 获取timeline数组,修改它不会改变内部数据
		 */
		get timeline():Array<timeNodeSymbol>{
			if(pointer === -1){
				return [];
			}
			return timeline.slice(0,pointer + 1);
		},
	};
	type partialState = Partial<S>;
};

export namespace orzTimeMachine{
	
	export type timeNodeSymbol = {desc?:string}; 
}
export type timeNodeSymbol = {desc?:string};
import {produce} from 'immer';
