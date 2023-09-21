# 0.1.0
修改了核心api

```js
//vuecomponent.vue
export default reaxper({
   //之前版本:
-   data () {
-      const { count } = reaxel();
-      return {
-         count ,
-      };
-   } ,
   //0.1.0版本后,state不写入data函数,用status函数替代:
+    status () {
+       const { count } = reaxel();
+       return {
+          count ,
+       };
+    },
+ });

```
