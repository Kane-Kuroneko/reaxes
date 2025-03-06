type crayon = ((css: Partial<CSSStyleDeclaration>) => (...logs: any[]) => void) & {
    [key in "warn" | "info" | "log" | "error" | "debug" | "trace"]: ((...any: any[]) => any) & {
        [key in string]: (...any: any[]) => any;
    };
} & {
    [key in string]: (...any: any[]) => any;
};
export declare const crayon: crayon;
export {};
