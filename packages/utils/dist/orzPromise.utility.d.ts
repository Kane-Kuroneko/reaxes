export declare const orzPromise: <T = any>(callback?: (resolve: Function, reject: Function) => any) => Promise<T> & {
    resolve: (value?: any) => void;
    reject: (reason?: any) => void;
};
