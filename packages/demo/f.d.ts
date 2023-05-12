/*global provider*/
declare const _ : typeof import('lodash');
declare const React: typeof import('react');
declare const { 
	useEffect , 
	useState ,
	useLayoutEffect ,
	Component ,
	useRef ,
	useMemo ,
	useContext ,
	useReducer ,
	useCallback,
}: typeof React;
declare const {orzMobx,Reaxes,reaxel} : typeof import("reaxes");
declare const {reaxper,Reaxlass} : typeof import("reaxes-react");
declare const utils:typeof import("reaxes-utils");
declare const {crayon,orzPromise,logProxy} : typeof utils;
declare const toolkit:typeof import('reaxes-toolkit');
declare const {orzPending} : typeof toolkit;

declare const __ENV_VUE__: "vue2"|"vue3";
declare const __IS_MOCK__: boolean;
declare const __EXPERIMENTAL__: boolean;
declare const __METHOD__: "server"|"build";
declare const __NODE_ENV__ : "development"|"production";
declare module "*.vue";
declare module "vue" {
	import * as vue2 from 'vue2';
	import * as vue3 from 'vue3';
	// export = vue2;
	export = vue2;
}
/*DOM*/

/*CSS*/
declare module '*.module.less' {
	const classes : {
		readonly [ key: string ]: string;
	};

	export default classes;
}
declare module '*.theme.less' {
	const theme : string;
	export default theme;
}

/*获取数组泛型参数*/
declare type ArrayElement<ArrayType extends any[]> = ArrayType extends (infer P)[] ? P : never;
declare interface NodeModule {
	hot?: {
		accept: Function;
	};
}



/*todo 后续放入requester插件*/
// declare type PayloadBody<T> = () => Promise<T>; 
