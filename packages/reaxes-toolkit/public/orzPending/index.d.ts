export declare const orzPending: () => {
    pendingState: {
        pending: boolean;
        error: boolean;
    };
    setPending: (pending: boolean) => void;
    setError: (error: boolean) => void;
};
