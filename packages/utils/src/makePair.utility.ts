/**
 * 成对使用数据
 *
 * @format
 * @param value
 * @param callback
 * @returns {[undefined, undefined]}
 */

export const makePair = (value, ...callbacks) => {
  return [
    ...callbacks.map(callback => {
      if (typeof callback === 'function') {
        return callback(value);
      } else {
        return value;
      }
    }),
  ];
};
/*↓↓↓↓↓↓↓↓↓↓↓例子↓↓↓↓↓↓↓↓↓↓↓*/
if (0) {
  /*传入一个react ref hook , 并用后面两个函数对其进行封装或引用 , */
  const [paramObject, getParamFromKey] = makePair(
	  /*@ts-ignore*/
    getUrlParam(),
    params => params,
    params => key => params[key],
  );
  paramObject.token;
  getParamFromKey('token');
}
/*↑↑↑↑↑↑↑↑↑↑↑例子↑↑↑↑↑↑↑↑↑↑↑*/
