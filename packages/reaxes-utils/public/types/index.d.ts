export type ArrayElement<ArrayType extends any[]> = ArrayType extends (infer P)[] ? P : never;
export declare const assignPick: <O extends {}, K extends (keyof O)[]>(object: O, keys: K) => Pick<O, ArrayElement<K>>, shallowEqual: (src: any, target: any) => boolean;
export * from './isPromise.utility';
export * from './debounce.utility';
export * from './stringify.utility';
export * from './crayon.utility';
export * from './checkGenericNull.utility';
export * from './runOnlyOnce.utility';
export * from './ConditionRender.utility';
export * from './makePair.utility';
export * from './timer.utility';
export * from './replaceStr.utility';
export * from './queryString.utility';
export * from './orzPromise.utility';
export * from './assert-group.utility';
export * from './dataflow.utility';
export * from './logProxy.utility';
export * from "./hooks";
export { default as Cookie } from './cookie.utility';
export { default as checkType } from './checkType.utility';
export { default as getNestedValue } from './getNestedValue.utility';
export { default as Random } from './random.utility';
export { default as throttle } from './throttle.utility';
