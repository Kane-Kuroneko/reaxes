export declare const orzMobx: <S extends object>(state: S) => {
    store: Omit<S, "hasOwnProperty">;
    setState: <PS extends Partial<S>>(partialState: PS) => void;
    setPartialState: (partialState: RecursivePartial<S>) => void;
};
export declare const collectDeps: (store: any, propKeys?: (string | number | symbol)[]) => void;
declare type RecursivePartial<S extends object> = {
    [p in keyof S]+?: S[p] extends object ? RecursivePartial<S[p]> : S[p];
};
export {};
