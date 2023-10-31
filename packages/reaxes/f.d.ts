declare const _ : typeof import('lodash');
declare const React : typeof import('react');
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
declare const utils : typeof import("reaxes-utils");
declare const orzPromise : typeof utils.orzPromise;
declare const crayon : typeof utils.crayon;



/*获取数组泛型参数*/
declare type ArrayElement<ArrayType extends any[]> = ArrayType extends (infer P)[] ? P : never;

declare global {
	export const _ : typeof import('lodash');
	export const React : typeof import('react');
	export const {
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
	export const utils : typeof import("reaxes-utils");
	export const orzPromise : typeof utils.orzPromise;
	export const crayon : typeof utils.crayon;
}
