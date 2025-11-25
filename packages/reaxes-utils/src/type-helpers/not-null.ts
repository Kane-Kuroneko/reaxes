/**
 * @description
 * Assets the param is not any null value.
 * @example
 * ```ts
 * type ProxyConf = null | {hostname:string};
 * let proxy_conf: ProxyConf;
 *
 * notNull(proxy_conf).hostname //No more complain about "Property hostname does not exist on type ProxyConf Property hostname does not exist on type null"
 * ```
 */
export const notNull = <T extends any>(value:T) => value as Exclude<T , null|undefined>;
