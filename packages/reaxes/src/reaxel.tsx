/*构造一个reaxel出来,目前只是将回调函数立即执行了, 后续可能会将callback传入其他参数*/
export const reaxel = <T extends (...args:any[]) => any>(callback:T):ReturnType<T> => {
	return callback();
};
