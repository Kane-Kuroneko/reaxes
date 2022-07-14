Reaxes架构:
响应式,分布式的逻辑抽象工具

start:

* 建立pakcages之间的引用关系 import {} from 'utils'
* 打包命令传入包名来进行对应的主入口打包
* 

`npm start <packageName>`


Reaxper 注意:
`render(){
  // 每次创建一个新的reaxper时会使react认为这是一个新的组件,不会更新而是会卸载再挂载
}`
