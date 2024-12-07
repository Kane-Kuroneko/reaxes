export declare const orzMobx: <S extends {}>(state: S) => {
    store: S;
    setState: <state extends Partial<S>>(partialState: state) => S;
	 mutate : <T extends (store:S) => void>(fn:T) => void;
    mutatePartialState: <T extends object = S>(partialState: Partial<T>, deepStore?: any) => void;
};
