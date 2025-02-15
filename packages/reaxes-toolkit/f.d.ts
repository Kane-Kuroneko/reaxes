declare const _ : typeof import('lodash');
declare const React : typeof import("react");
declare const {
	useEffect ,
	useLayoutEffect ,
	useMemo ,
	useRef ,
	useState ,
	useContext ,
	useCallback ,
	useReducer ,
} : typeof import('react');
declare const {
	orzMobx ,
	Reaxes,
} : typeof import('reaxes');
declare const utils : typeof import('reaxes-utils');
declare const crayon : typeof import('reaxes-utils')['crayon'];
declare const orzPromise : typeof import('reaxes-utils')['orzPromise'];
/*获取数组泛型参数*/
declare type ArrayElement<ArrayType extends any[]> = ArrayType extends ( infer P )[] ? P : never;

declare global {
	export const _ : typeof import('lodash');
	export const React : typeof import("react");
	export const {
		useEffect ,
		useLayoutEffect ,
		useMemo ,
		useRef ,
		useState ,
		useContext ,
		useCallback ,
		useReducer ,
	} : typeof import('react');
	export const {
		orzMobx ,
		Reaxes,
	} : typeof import('reaxes');
	export const utils : typeof import('reaxes-utils');
	export const crayon : typeof import("reaxes-utils")['crayon'];
	export const orzPromise : typeof import("reaxes-utils")['orzPromise'];
}
