// @ts-nocheck
/*global provider*/
declare const _ : typeof import('lodash');
declare const React , {
	useEffect ,
	useLayoutEffect ,
	useMemo ,
	useRef ,
	useState ,
	useContext ,
	useCallback ,
	useReducer,
}: typeof import('react');
declare const {orzMobx,Reaxes} : typeof import('reaxes');
declare const utils : typeof import('reaxes-utils');


declare const __IS_MOCK__: boolean;
declare const __EXPERIMENTAL__: boolean;
declare const __METHOD__: "server"|"build";
declare const __NODE_ENV__ : "development"|"production";
/*DOM*/


/*获取数组泛型参数*/
declare type ArrayElement<ArrayType extends any[]> = ArrayType extends (infer P)[] ? P : never;
