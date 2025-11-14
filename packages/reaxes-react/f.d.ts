declare const React : typeof React;
declare global {
	export const _ : typeof import('lodash');
	namespace React {
		type R = typeof import('react');
		//@ts-expect-error
		export = R;
	}
}

/*获取数组泛型参数*/
// declare type ArrayElement<ArrayType extends any[]> = ArrayType extends (infer P)[] ? P : never;

import * as ReactModule from 'react';
export {}
