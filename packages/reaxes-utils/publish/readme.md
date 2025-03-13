# reaxes-utils是reaxes系列库内部使用的工具集

与[`reaxes-toolkit`](https://www.npmjs.com/package/reaxes-toolkit)不同的是:
* `reaxes-utils`服务于`reaxes`内部,但也可以直接用于业务代码中,包含动态导入,更加通用
* `reaxes-toolkit`则是面向[`reaxes`](https://www.npmjs.com/package/reaxes)的使用者,提供了基于`reaxes`的能力封装的一些可服用局部业务逻辑(比如可用`rexaStatus`管理局部逻辑的的pending和error状态)
