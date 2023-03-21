type ret = {
    [p: string]: string;
};
export declare const decodeQueryString: <result extends ret>(str?: string) => ret;
export declare const encodeQueryString: (source: object) => string;
export {};
