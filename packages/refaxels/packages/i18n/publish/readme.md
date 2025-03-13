安装  
`$ npm i -S refaxel-i18n`

使用:  
```ts
import {Refaxel_I18n} from 'refaxel-i18n';

export const reaxel_I18n = Refaxel_I18n([
	{
		language : 'en-US',
		default : true,
		name : 'english',
		isSource : true,
	},
	{
		language : 'zh-TW',
		name : "正體中文",
		resourceLoader:() => import('../languages/zh-TW.json').then( m => m.default ),
	},
	{
		language : "ja-JP",
		name : '日本語',
		resourceMap : {
			'hello' : 'こんにちは'
		}
	}
]);


```






---








<style>
html{
	overflow: scroll;
	padding : 0;
	
}
body{
	max-width: 77%;
	overflow : scroll;
	margin: 0 1em;
}
</style>
