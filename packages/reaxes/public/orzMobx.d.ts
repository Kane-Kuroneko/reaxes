export declare const orzMobx: <S extends object>(state: S) => {
    store: S;
    setState: <T extends Partial<S>>(partialState : T) => S;
    mutatePartialState: <T extends object = S>(partialState: Partial<T>, deepStore?: any) => void;
};
