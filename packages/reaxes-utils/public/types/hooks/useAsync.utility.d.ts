interface State<D> {
    error: Error | null;
    data: D | null;
    stat: 'idle' | 'loading' | 'error' | 'success';
}
declare const defaultConfig: {
    throwOnError: boolean;
};
export declare const useAsync: <D>(initialState?: State<D>, initialConfig?: typeof defaultConfig) => {
    error: Error | null;
    data: D;
    stat: 'idle' | 'loading' | 'error' | 'success';
    isIdle: boolean;
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
    run: (promise: Promise<D>, runConfig?: {
        retry: () => Promise<D>;
    }) => Promise<any>;
    setData: (data: D) => void;
    setError: (error: Error) => void;
    retry: () => void;
};
export {};
