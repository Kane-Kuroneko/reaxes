/*global provider*/
// declare const _ : typeof import('lodash');
// declare const React: typeof import('react');
// declare const { 
// 	useEffect , 
// 	useState ,
// 	useLayoutEffect ,
// 	Component ,
// 	useRef ,
// 	useMemo ,
// 	useContext ,
// 	useReducer ,
// 	useCallback,
// }: typeof React;
// declare const {orzMobx,Reaxes,reaxel} : typeof import("reaxes");
// declare const {reaxper,Reaxlass} : typeof import("reaxes-react");
// declare const utils:typeof import("reaxes-utils");
// declare const {crayon,orzPromise} : typeof utils;

/*获取数组泛型参数*/
declare type ArrayElement<ArrayType extends any[]> = ArrayType extends (infer P)[] ? P : never;
