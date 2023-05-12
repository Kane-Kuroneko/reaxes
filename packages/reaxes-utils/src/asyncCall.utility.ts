/**
 * 延迟执行回调函数,在同步任务执行后尽快异步执行
 * 用于延后初始化函数,调整代码顺序等.
 */
export const asyncCall = function<T extends Function>(callback:T) {
	let retarder;
	switch( true ) {
		case typeof queueMicrotask === "function" :
			retarder = queueMicrotask;break;
		case !!(typeof Promise === "function" && Promise.resolve) :
			retarder = (callback:any) => Promise.resolve().then(callback);break;
		default : 
			retarder = setTimeout;
	}
	
	retarder(callback);
};
