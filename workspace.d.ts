// declare const _ : typeof import('lodash');
// declare const React : typeof import('react');
// declare const {
// 	useEffect ,
// 	useLayoutEffect ,
// 	useMemo ,
// 	useRef ,
// 	useState ,
// 	useContext ,
// 	useCallback ,
// 	useReducer,
// } : typeof React;
// declare const {orzMobx,Reaxes} : typeof import('reaxes');
// declare const utils,{orzPromise,crayon,logProxy} : typeof import('reaxes-utils');


// declare const __IS_MOCK__: boolean;
// declare const __EXPERIMENTAL__: boolean;
// declare const __METHOD__: "server"|"build";
// declare const __NODE_ENV__ : "development"|"production";
/*DOM*/
/*CSS*/
// declare module '*.module.less' {
// 	const classes : {
// 		readonly [ key: string ]: string;
// 	};
//	
// 	export default classes;
// }
// declare module '*.theme.less' {
// 	const theme : string;
// 	export default theme;
// }

/*获取数组泛型参数*/
// declare type ArrayElement<ArrayType extends any[]> = ArrayType extends (infer P)[] ? P : never;
declare interface NodeModule {
	hot?: {
		accept: Function;
	};
}



/*todo 后续放入requester插件*/
declare type PayloadBody<T> = () => Promise<T>; 
