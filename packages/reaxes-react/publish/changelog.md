# 0.1.3
- fixed package.json type paths

# 0.1.2
- fixed types of useReaxable , for reaxes@1.4.0 compatibility
```ts
const {
	store ,
	setState ,
	mutate ,
} = useReaxable( {
	user : {
		name : 'jack' ,
		age  : 18 ,
	} ,
} );
//easy to set nested state
setState.user({
	age : 20 ,
});
//or
mutate.user( user => {
	user.age = 21 ;
});
```

# 0.1.1
* 修复types和hooks type

# 0.1.0
* 新增`useReaxable` hook

# 0.0.8&0.0.9
* 修复了reaxper的类型声明
* 更新了reaxper::compose相关的代码
* 剔除了hot-loader , 因为会导致mobx-react不正常的hooks调用

# 0.0.7
去除了有严重缺陷的ComponentDidRender生命周期 

# 0.0.6
修复由于react-hot-loader/babel引起的打包后产物出现__WEBPACK_EXTERNAL_MODULE的问题
