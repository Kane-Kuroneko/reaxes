export declare const Reaxes: {
    collectDeps(store: object, propKeys?: (string | number | symbol)[]): void;
    observedMemo<F extends (first: boolean, disposer?: IReactionDisposer) => any>(callback: F, dependencies: any): ReturnType<F>;
    _DEPRECATED_closuredMemo<C extends (...args: E[]) => any, F_1 extends () => any[], E = any>(callback: C, deps: F_1): (depsSetter: (prevDeps: any[]) => any[]) => C;
    closuredMemo<C_1 extends (...args: E_1[]) => any, F_2 extends () => any[], E_1 = any>(callback: C_1, deps: F_2): [(depsSetter: (prevDeps: any[]) => any[]) => C_1, () => void];
    hooks: Lifecycle;
};
import { IReactionDisposer } from 'mobx';
