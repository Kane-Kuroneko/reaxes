# Changelog

## [0.1.2] - 2023-03-26
### Fixed
- 修复为`import * as _ from 'lodash'`

## [0.1.1] - 2023-03-26
### Added
- 增加对 `vm.status` 存在但不是函数的判断。

### Changed
- 当 `status` 返回值不是对象时，将在控制台发出警告。

## [0.1.0] - 2023-05-15
### Changed
- 修改了核心 API，组件中 `data()` 替换为 `status()`。

```diff
// vuecomponent.vue
-export default reaxper({
-   data () {
-      const { count } = reaxel();
-      return {
-         count,
-      };
-   },
+export default reaxper({
+   status () {
+      const { count } = reaxel();
+      return {
+         count,
+      };
+   },
});
```
