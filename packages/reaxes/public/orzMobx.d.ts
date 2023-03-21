export declare const orzMobx: <S extends object>(state: S) => {
    store: S;
    setState: (partialState: Partial<S>) => void;
    mutatePartialState: <T extends object = S>(partialState: Partial<T>, deepStore?: any) => void;
};
