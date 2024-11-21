# refaxel
### refaxel是reaxel的构造体形式，也就是说reaxel直接运行的时候是单个功能的直接部署

```typescript jsx
//i18n.ts
import { initialize } from 'reaxel-i18n';

const conf = {
	langs : { 'en' : import('.../en.json') } ,
	default : 'zh-cn' ,
};
//应在入口文件尽快执行
initialize( conf );

//Login.tsx
import { i18n , I18N } from 'reaxel-i18n';

export const Login = reaxper( () => {
	
	return <div>
		<h1><I18N>Login</I18N></h1>
		<input placeholder={i18n('input username')}/>
	</div>;
} );
```
这个例子说明了reaxel是全局单一实例的,它无需实例化即可使用,

而refaxel则是reaxel的构造类,每个refaxel可以构造为任意多个reaxel:
```typescript jsx
//user.reaxel.ts
import Persist from 'refaxel-persist';

const reaxel_User = reaxel(() => {
	const {
		store
	} = orzMobx({...});
	//...
	
	//将userStore持久化,当内容变化时自动写入到storage里,当页面刷新时自动尝试从storage里还原数据
	new Persist(store,'user');
})

//user-post.reaxel.ts
export const reaxel_Post = reaxel(() => {
	const {store} = orzMobx({
		content : ''
	});
	//...
	new Persist(store,'post')
})
```
这段代码里有两个reaxel模块, 分别存储了用户认证信息以及用户要发表的评论. 他们分别实例化了Persist,因为每个Persist实例只关心一个store的变化,他们是独立工作的
