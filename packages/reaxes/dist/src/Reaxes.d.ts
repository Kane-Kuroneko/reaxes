export declare const Reaxes: {
    collectDeps(store: object, propKeys?: (string | number | symbol)[]): void;
    observedMemo<F extends (disposer?: IReactionDisposer) => any>(callback: F, dependencies: any): ReturnType<F>;
    closuredMemo<C extends (...args: E[]) => any, F_1 extends () => any[], E = any>(callback: C, deps: F_1): (depsSetter: (prevDeps: any[]) => any[]) => C;
    hooks: Lifecycle;
};
import { IReactionDisposer } from 'mobx';
