declare type Reaxes = {
	renderAction() : (callback:Function) => any;
	/*自动收集dependencies里的依赖, 当依赖变化时自动*/
	observedMemo<F extends ( first : boolean, disposer?:IReactionDisposer ) => any>( callback : F , dependencies ) : ReturnType<F>;
	/*将其返回值存储下来 , 每次调用其时传入依赖数组,当与上次浅比较不匹配时才会执行,否则忽略*/
	closuredMemo <C extends (...args) => any ,>(callback:C , deps : () => any[]): (depsSetter:(prevDeps:any[]) => any[]) => (...args:Parameters<C>) => ReturnType<C>;
	hooks : Lifecycle;
};

type lifecycle = (callback:Function) => string;
declare interface Lifecycle {
	[p:string|symbol] : any ;
	unmount : lifecycle ,
	mounted : lifecycle ,
	rendered : lifecycle ,
	updated : lifecycle ,
	unregister : (id:string) => void,
	effect <T extends () => any,F extends () => any[]>(callback : T ,deps : F) : void ,
	memory<F extends (first:boolean) => any >( callback : F , dependencies ):ReturnType<F> ,
}

type IReactionDisposer = import('mobx').IReactionDisposer
