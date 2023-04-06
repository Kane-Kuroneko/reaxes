export declare const Reaxes: {
    collectDeps(store: object, propKeys?: (string | number | symbol)[]): void;
    obsReaction(callback: (first : boolean , disposer? : IReactionDisposer) => any , dependencies:() => Array<any>): any;
    contrastedCallback<C extends (...args: E[]) => any, F_1 extends () => any[], E = any>(callback: C, deps: F_1): [(depsSetter: (prevDeps: any[]) => any[]) => C, () => void];
};
import { IReactionDisposer } from 'mobx';
