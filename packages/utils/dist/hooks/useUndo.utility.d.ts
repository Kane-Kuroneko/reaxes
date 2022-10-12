declare type State<T> = {
    past: T[];
    present: T;
    future: T[];
};
export declare const useUndo: <T>(initialPresent: T) => readonly [State<unknown>, {
    readonly set: (newPresent: T) => void;
    readonly reset: (newPresent: T) => void;
    readonly undo: () => void;
    readonly redo: () => void;
    readonly canUndo: boolean;
    readonly canRedo: boolean;
}];
export {};
