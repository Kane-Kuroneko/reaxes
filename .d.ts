/*获取数组泛型参数*/
// declare type ArrayElement<ArrayType extends any[]> = ArrayType extends (infer P)[] ? P : never;
declare interface NodeModule {
	hot?: {
		accept: Function;
	};
}



/*todo 后续放入requester插件*/
declare type PayloadBody<T> = () => Promise<T>;


declare const _: typeof import('lodash');
