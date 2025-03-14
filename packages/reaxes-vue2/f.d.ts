/*global provider*/
// declare const _ : typeof import('lodash').LoDashStatic;
// declare const React : typeof import('react');
// declare const useState : typeof React.useState;
// declare const useEffect : typeof React.useEffect;
// declare const useRef : typeof React.useRef;
// declare const useLayoutEffect : typeof React.useLayoutEffect;
// declare const useMemo : typeof React.useMemo;
// declare const useCallback : typeof React.useCallback;
// declare const utils: typeof import('reaxes-utils');

/*DOM*/


/*获取数组泛型参数*/
declare type ArrayElement<ArrayType extends any[]> = ArrayType extends (infer P)[] ? P : never;

declare global{
	// declare const _ : typeof import('lodash').LoDashStatic;
	declare const React : typeof import('react');
	declare const useState : typeof React.useState;
	declare const useEffect : typeof React.useEffect;
	declare const useRef : typeof React.useRef;
	declare const useLayoutEffect : typeof React.useLayoutEffect;
	declare const useMemo : typeof React.useMemo;
	declare const useCallback : typeof React.useCallback;
	// declare const utils: typeof import('reaxes-utils');
	
}
