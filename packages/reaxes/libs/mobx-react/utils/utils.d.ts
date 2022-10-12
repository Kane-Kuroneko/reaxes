export declare function newSymbol(name: string): symbol | string;
export declare function shallowEqual(objA: any, objB: any): boolean;
export declare function copyStaticProperties(base: object, target: object): void;
export declare function setHiddenProp(target: object, prop: any, value: any): void;
export interface Mixins extends Record<string, any> {
    locks: number;
    methods: Array<Function>;
}
export declare function patch(target: object, methodName: string, mixinMethod: Function): void;
