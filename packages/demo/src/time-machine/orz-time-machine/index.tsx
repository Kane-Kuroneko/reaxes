/**
 * 在reaxel而不是组件中调用,否则每次组件执行都会生成全新的machine
 * @param initialState
 */
export const orzTimeMachine = <S extends {}>(initialState:S) => {
	const initial = {...initialState};
	const travelMap = new WeakMap<TimeNodeSymbol,S>();
	/*存储时间线,栈结构*/
	let timeline = [] as Array<TimeNodeSymbol>;
	timeline.map((item) => {
		item
	})
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
		desc : string;
		constructor(desc?:string) {
			Object.assign(this,{desc:desc ?? Math.random().toString()});
		}
	};
	
	/**
	 * 将内部的timeline数组的指针更新,并通知obsTimeline;
	 */
	function replaceTimeline(callback:(origTimeline:Array<TimeNodeSymbol>) => Array<TimeNodeSymbol> ){
		timeline = callback([...timeline]) ?? timeline;
		setObsTimeline();
	}
	
	function addBackTime(state:S,desc?:string):TimeNodeSymbol {
		
		const travelSymbol = new TimeNodeSymbol(desc);
		travelMap.set(travelSymbol,state);
		const shallowTimeline = [...timeline];
		replaceTimeline((origTimeline) => {
			const {pointer,tailPointer} = store;
			/*如果处于时间线的中点而非尾端,则丢弃后面的时间线再添加节点*/
			if(pointer < tailPointer){
				const preservedTimeline = shallowTimeline.slice(0,pointer);
				preservedTimeline.push(travelSymbol);
				setState( {
					pointer : preservedTimeline.length ,
					tailPointer : preservedTimeline.length ,
				} );
				return preservedTimeline;
			}else {
				shallowTimeline.push();
				setState( {
					pointer : store.pointer + 1 ,
					tailPointer : store.tailPointer + 1 ,
				} );
				return shallowTimeline;
			}
		});
		return travelSymbol;
	}
	
	/** 
	 * 获取对应位置的store,index必须是[-1,timeline.length-1]中的合法值
	 */
	function getStoreInTimeline(index = store.pointer):S{
		if(index < 0){
			return initial;
		}
		return travelMap.get(timeline[index]);
	}
	
	/**
	 * 永久回到过去，这个节点以后的时间片段将被丢弃。
	 * 将指针指向过去的某个位置，重置片段长度为回到过去后指针位置。
	 * @deprecated sdad
	 */
	function backInTime(timeNode:TimeNodeSymbol):void;
	function backInTime(offset:number):void;
	function backInTime(offset):void{
		
		replaceTimeline( ( origTimeline ) => {
			const {pointer,tailPointer} = store;
			
			return origTimeline;
		} );
	}
	
	/**
	 * 更新时间线, 改变当前指针位置,不改变尾指针位置.
	 * @overload:timeNode:传入timeNodeSymbol
	 * @overload:offset:传入指针偏移量,如果当前已经是第一个添加的状态,则会指向initial
	 */
	function timeTravel(timeNode:TimeNodeSymbol):void;
	function timeTravel(offset:number):void;
	function timeTravel(offset) {
		
		replaceTimeline( (origTimeline) => {
			const {pointer} = store;
			const _pointer = pointer + offset;
			if(typeof offset === "number"){
				if(_pointer < 0){
					
				}
			}else {
				let timeNode = offset;
			}
			return origTimeline;
		} );
		
		/*****/
		
		
		
	}
	
	function saveTimeline(){
		
	}
	
	/*将内部timeline更新给obsTimeline*/
	function setObsTimeline(){
		setState( { timeline } );
	}
	
	function debug(){
		const _timeline = utils.logProxy(timeline.map((symbol) => {
			return travelMap.get(symbol);
		}));
		crayon.green("timeline:",_timeline,"pointer:",store.pointer);
		return _timeline;
	}
	
	return {
		debug,
		addBackTime,
		timeTravel,
		backInTime,
		/*获取当前所在时间片段的store*/
		get currentStore():S{
			return getStoreInTimeline();
		},
		/*获取当前时间线指针索引*/
		get currentTimelineIndex(){
			return store.pointer;
		},
		/*获取时间线数组长度*/
		get timelineLength(){
			return store.tailPointer + 1;
		},
		get obsTimeline(){
			const {tailPointer} = store;
			
			return store.timeline.slice(0,tailPointer + 1);
		},
		/**
		 * @readonly
		 * @desc 获取timeline数组,修改它不会改变内部数据
		 */
		get timeline():Array<TimeNodeSymbol>{
			const {tailPointer} = store;
			return timeline.slice(0,tailPointer + 1);
		},
	};
	// type partialState = Partial<S>;
};

export namespace orzTimeMachine{
	
	export type timeNodeSymbol = {desc?:string}; 
}
// import {produce} from 'immer';
