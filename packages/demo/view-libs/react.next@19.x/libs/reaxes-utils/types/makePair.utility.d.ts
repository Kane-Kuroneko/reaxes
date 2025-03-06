export declare const makePair: <I, F extends (value: I) => any>(value: I, ...callbacks: F[]) => [I, ...ReturnType<F>[]];
