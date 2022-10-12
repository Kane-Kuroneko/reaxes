export declare const formatter: {
    addKey: <T extends any[]>(source: T) => (ArrayElement<T> & {
        key: number;
    })[];
};
