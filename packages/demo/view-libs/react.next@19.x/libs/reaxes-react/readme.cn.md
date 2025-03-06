# reaxes-react

[English](./readme.md) | Chinese

_将组件以`reaxper`包裹,当`reaxes store`的值发生变化时自动刷新组件_

---

## 如何使用
创建一个reaxel,其中包含存储count的响应式store和修改count的函数,他们构成了计数器模块的封装并暴露出api.
```tsx
//reaxels/counter.ts
import {createReaxable,reaxel} from 'reaxes'
export const reaxel_Counter = reaxel(() => {
	const {store,setState,mutate} = createReaxable({
		count:0
	});
	const setCount = (count = store.count+1) => {
		setState({count})
	}
	return {
		Counter_Store:store,
		Counter_SetState:setState,
		Counter_Mutate:mutate,
		setCount,
	}
})
```

```tsx
// there is no need to use obsReaction for every component
// because reaxper will do this automaticlly
// all you need is just to wrap you components with reaxper();
import { reaxper } from 'reaxes-react';
import { reaxel_Counter } from './reaxels/counter';

// functional component
export const Count = reaxper(() => {
	const {count,setCount} = reaxel_Counter();
	
	return <div onClick = { () => setCount(count+1) }>
		count:{ count }
	</div>;
});

// or use class component
import { Component } from 'react';

@reaxper
class CountComponent extends Component {
	
	render(){
		const {count,setCount} = reaxel_Counter();
		
		return <div onClick = { () => setCount(count+1) }>
			count:{ count }
		</div>;
	}
}

```
<style>
pre{
	tab-size: 3;
}
</style>
