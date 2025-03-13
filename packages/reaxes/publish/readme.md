# What's This
_reaxes的设计哲学是:应用的逻辑应该与其他模块解耦,特别是`视图`和`用户输入`_
* 此库可以让你以响应式编程思维来构建你的应用的核心逻辑,无论是web前端还是nodejs,只要宿主环境支持Proxy即可以运行.
* 将复杂的业务逻辑从视图组件中抽离, 数据和逻辑将在应用的任何地方可用,而不再是组件和hooks中了.
* 跨视图同构你的应用,一套逻辑,可以在react,vue中轻易通用而不用修改任何组件代码.甚至native app , web , 小程序中都可以通用,只需要根据宿主环境做些判断.

## Installation
`$ npm i -S reaxes`

## Documents
[https://kane-7.gitbook.io/reaxes-document](https://kane-7.gitbook.io/reaxes-document)

## Playground
* Tic-Tac-Toe [React](https://codesandbox.io/p/sandbox/tic-tac-toe-reactjing-zi-qi-by-reaxes-41ff76)

## Using reaxes to build core logic of your app

```tsx
// reaxels/counter.ts
import { createReaxable , obsReaction } from 'reaxes';

export const reaxel_Counter = reaxel(() => {
   //create a reactive store , so you can subscribe changes when you need.
   const { store , setState } = createReaxable({
      count : 0
   });
   
   return {
      get count(){
         return store.count;
      } ,
      setCount( count: number ){
         setState({ count });
      }
   }
})
```

## Using with vallina JS

```tsx
// when count changed, refresh DOM
import { reaxel_Counter } from './reaxels/counter';
import { obsReaction } from 'reaxes';

function render(){
   const { count , setCount } = reaxel_Counter();
   
   const div = document.createElement('div');
   div.onclick = () => setCount(count + 1);
   div.innerText = count;
   return div;
}

//listen store.count , once it changes,render() will be re-runed automatically
obsReaction(
   ( first , dispose ) => {
      document.write(render());
      if(first){
         console.log('div element mounted');
      }
   } ,
   //place all observable props here
   () => [ reaxel_Counter().count ]
);
```

## using with React

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
## using with Vue2
```vue
<template>
   <div @click="setCount()">
      {{ count }}
   </div>
</template>
<script>
   import { reaxel_Counter } from './reaxels/counter';
   
   export default {
      status(){
         const {count} = reaxel_Counter();
         return { count };
      },
      methods:{
         setCount(){
            const {count,setCount} = reaxel_Counter();
            setCount(count+1);
         }
      }
   }
</script>
```

<style>
  pre {
    tab-size: 3;
  }
</style>
