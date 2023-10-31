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
// @ts-ignore
// @ts-ignore


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


declare global {
	export const _ : typeof import("lodash");
	export const orzMobx : typeof import("reaxes").orzMobx;
	export const Reaxes : typeof import("reaxes").Reaxes;
	export const reaxel : typeof import("reaxes").reaxel;
	export const utils : typeof import("reaxes-utils");
	
	export const crayon : typeof import("reaxes-utils").crayon;
	export const logProxy : typeof import("reaxes-utils")['logProxy'];
	export const orzPromise : typeof import("reaxes-utils")['orzPromise'];
	
	export const toolkit : typeof import("reaxes-toolkit");
	export const orzPending : typeof import("reaxes-toolkit")['orzPending'];
	
	export const obsReaction : typeof import('reaxes').Reaxes['obsReaction'];
	export const collectDeps : typeof import('reaxes').Reaxes['collectDeps'];
	export const contrastedCallback : typeof import('reaxes').Reaxes['contrastedCallback'];
}
