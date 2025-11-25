/**
 * @description
 * Assets the param is not any false value.
 * @example
 * ```ts
 * type ProxyConf = false | {hostname:string};
 * let proxy_conf: ProxyConf;
 * 
 * notFalse(proxy_conf).hostname //No more complain about "Property hostname does not exist on type ProxyConf Property hostname does not exist on type false"
 * ```
 */
export const notFalse = <T extends any>(value:T) => value as Exclude<T , false|null|undefined>;
