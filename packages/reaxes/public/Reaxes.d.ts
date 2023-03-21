export declare const Reaxes: {
    collectDeps(store: object, propKeys?: (string | number | symbol)[]): void;
    obsReaction<F extends (first: boolean, disposer?: IReactionDisposer) => any>(callback: F, dependencies: any): ReturnType<F>;
    contrastedCallback<C extends (...args: E[]) => any, F_1 extends () => any[], E = any>(callback: C, deps: F_1): [(depsSetter: (prevDeps: any[]) => any[]) => C, () => void];
};
import { IReactionDisposer } from 'mobx';
