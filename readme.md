# 项目演示与打包说明

## 运行 Demo

运行以下命令启动开发服务器：

```bash
$ npm start <vm-type> <devserver-port>
```

- `<vm-type>`：选择你要运行的框架，支持以下选项：
	- `"react"`
	- `"vue2"`
	- `"vue3"`
	- `"angular"`
	- `"solid"`
	- `"svelte"`

- `<devserver-port>`：指定开发服务器的端口号，范围为 `0-65535`。如果指定的端口号已被占用，系统会自动选择最近的可用端口。

---

## 打包

运行以下命令来打包项目：

```bash
$ npm run build <package or subpackage>
```

- 打包 `reaxes`：

  ```bash
  $ npm run build reaxes
  ```

- 打包 `refaxels/i18n`：

  ```bash
  $ npm run build refaxels/i18n
  ```
