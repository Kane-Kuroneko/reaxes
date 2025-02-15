declare const Cookie: {
    get(key: any, decode?: typeof decodeURIComponent): any;
    set(key: any, value: any, options: any): string;
    remove(key: any): boolean;
    hasItem: (sKey: any) => boolean;
};
export default Cookie;
