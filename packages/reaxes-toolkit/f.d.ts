// @ts-nocheck
/*global provider*/
// declare const _ : typeof import('lodash');
// declare const React:typeof import("react")
// declare const {
// 	useEffect ,
// 	useLayoutEffect ,
// 	useMemo ,
// 	useRef ,
// 	useState ,
// 	useContext ,
// 	useCallback ,
// 	useReducer,
// }: typeof import('react');
// declare const {orzMobx,Reaxes} : typeof import('reaxes');
// declare const utils : typeof import('reaxes-utils');
// declare const {crayon,orzPromise} : typeof import("reaxes-utils")
/*获取数组泛型参数*/
declare type ArrayElement<ArrayType extends any[]> = ArrayType extends (infer P)[] ? P : never;
