export { stringify };
declare function stringify(obj: any, replacer?: any, spacer?: any, options?: any): any;
declare namespace stringify {
    var stable: typeof deterministicStringify;
}
declare function deterministicStringify(obj: any, replacer: any, spacer: any, options: any): any;
