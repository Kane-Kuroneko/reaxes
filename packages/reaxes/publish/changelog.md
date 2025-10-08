# 1.4.0
- createReaxable的返回值{setState,mutate}增加了针对内部对象修改的功能:
```ts
const {setState,mutate} = createReaxable({
   user : {
      name : 'John',
      age : 30,
   },
   loggedIn : false,
});
// 修改user对象的name属性
mutate.user( s => {
   s.name = 'Doe';
});
//或
setState.user({
    name : 'Doe',
})
```


# 1.3.1
* Type Fix: The second argument of collectDeps should be optional.

# 1.3.0

* distinctCallback修改了返回api , 去除了返回{next}对象 , 并且不再返回元祖 而是返回带resetDeps函数的distinct函数.   
 现在的用法:
```tsx
// 此函数在react组件中可直接运行,无需useeffect,会自动对比依赖数组,只有依赖变化时才会执行
// 在这种场景下和obsReaction的区别是,obsReaction会在依赖变化时立即执行一次,而distinctCallback则是等到用户触及与此视图时才会执行.适用于懒加载等场景
const distinct = distinctCallback((id:string) => {
	fetch(`/api/user?id=${id}`).
	then(res => res.json()).
	then(( profile ) => {
		setState(profile);
	});
}, () => [reaxel_User.store.id]);

//using in react for example
import {reaxel_Profile} from '#reaxels/profile';

const Profile = reaxper(() => {
	const { profile } = reaxel_Profile.store;
	//No need useEffect anymore, data is nolonger related to UI.
	//第一次调用时传入依赖数组, 会根据依赖数组的变化来决定第二次调用是否会被实际执行
	distinct(() => [reaxel_User.store.id])(reaxel_User.store.id);
	
	if(!profile) {
		return <div>loading...</div>;		
	}
	
	return <div>
		<p>name:{profile.name}</p>
		<p>age:{profile.age}</p>
	</div>
})
```
* 重大更改:1.3.0版本后改变reaxel的范式且obsReaction的第一次调用为asapAsync即异步但尽快调用 , 用于解决循环引用问题:
   * 新范式:
```ts
export const reaxel_Profile = reaxel(() => {
	const {store,setState,mutate} = createReaxable({
		bio : null as string,		
	});
	
	const {status,setStatus} = rexaStatus();
	let rqstId = 0;
	obsReaction(async( first , disposer ) => {
		if( !reaxel_User.store.token ) {
			setState({ bio : null });
			return;
		}
		
		if( _.isString(reaxel_User.store.token) ) {
			const currentRqstId = ++rqstId;
			setStatus({
				pending:xPromise(),
				error:null,
			});
			
			try {
				const profile = await fetch(`/api/user/profile`).then(res => res.json());
				if(currentRqstId !== rqstId) {
					return;
				}
				setState({
					bio : profile.bio,
				});
				status.pending.resolve();
			}catch ( e ) {
				status.pending.resolve();
				setStatus({ error : e , pending:false });
			}
		}
		
	} , () => [
		reaxel_User.store.token ,
	]);
	
	return Object.assign(() => {
		return {
			get bio(){
				return store.bio;
			},
			clearBio(){
				setState({ bio : null });
			},
			bioStatus(){
				return status;
			},
		};
	},{
		store,
		setState,
		mutate
	});
});

import { reaxel_User } from '../auth.ts';
import { rexaStatus } from 'reaxes-toolkit';
import { obsReaction } from 'reaxes';
```

# 1.2.0

* 修复了1.0版本还错误依赖着reaxes-utils^1.x
* `contrastedCallback`更名为`distinctCallback`
* 删除了_UNSTABLE_EXPIMENTAL_consistentCallback
* `collectDeps`,`obsReaction`,`distinctCallback`从Reaxes对象中拿出来了,直接`import {distinctCallback} from 'reaxes'`

# 1.0.0

* orzMobx更名为createReaxable,用于创建store,setState,mutate等方法
* createReaxable的返回对象里删除了 `_UNSTABLE_mutatePartialState`,并清理了多余的代码
* createReaxable中的setState逻辑,之前的逻辑是粗暴合并partialState进来,现在会检测partialState要合并的键在store中是否存在,存在再合并. 增加了安全性以及健壮性.
* 优化和统一了tsc的编译过程,现在的编译发布流程是:
	* 先修改publish中的版本更新信息,比如changelog等
	* 然后在`../../reaxes`monorepo根目录执行`npm run build reaxes`,将把产物编译进dist/esm , 和复制publish/*到dist中
	* 最后在monorepo根目录执行`npm run publish reaxes <releaseType> <npmTag>`,完成发布.会自动修改`publish/package.json::version`为发布后的版本号.

# 0.0.11

修复orzMobx().setState泛型不正确

# 0.0.10

修复:缺少orzMobx().mutate函数dts声明

# 0.0.8

修复由于react-hot-loader/babel引起的打包后产物出现__WEBPACK_EXTERNAL_MODULE的问题

# v0.0.4

修复obsReaction的dep类型

# v0.0.3

`orzMobx:setState增加了返回值,同步返回此次合并store后的数据`
