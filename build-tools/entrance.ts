
/**
 * 此文件是所有打包行为的入口,为后续流程提供依赖
 */

export const args = process.argv.slice(2);

//发布为npm包的packages,不可在本地独立运行,比如reaxes,reaxes-react等库
export const forPublishPackages = [
	'reaxes',
	'reaxes-react',
	'reaxes-vue2',
	'reaxes-vue3',
	'reaxes-angular',
	'reaxes-toolkit',
	'reaxes-utils',
];
//以下两个函数用于检测运行demo和打包某包时不适用的cli参数.
const checkDemoArgs = () => {
	if(process.env.npm_lifecycle_event !== 'start'){
		return;
	}
	if(!!packige){
		warn('运行demo时不应该传入package参数,因为此参数是为构建某个特定的包而设计的.')
	}
	//检测结束,现在开始为entrance赋默认值
	if(!argPort) argPort = 8080;
	if(!viewLib) viewLib = 'react';
	if(!experimental) experimental = 'non-exp';
	console.log('arg-port:',argPort);
}
const checkBuildArgs = () => {
	if(process.env.npm_lifecycle_event !== 'build'){
		return;
	}
	if(argPort != undefined){
		warn('打包时不应该指定port参数,因为此参数是为本地启动demo而设计的.');
	}
	if(viewLib != undefined){
		warn('打包时不应该指定viewLib参数,因为此参数是为本地启动demo而设计的.');
	}
	//检测结束,现在开始为entrance赋默认值
	if(!packige) throw new Error('必须指定要打包的package,参阅readme.md');
	if(!experimental) experimental = 'non-exp';
}



export type EntranceType = {
	argPort: number,
	packige: Packige,
	analyze: "analyze" | void,
	experimental: "experimental" | 'non-exp' | void,
	viewLib: "react" | "vue2" | "vue3" | "angular" | "solid" | "svelte",
	debug : 'debug'|void,
};
export let {
	//用户希望使用的端口,但实际使用的端口<port> == await getPort(argPort)
	argPort,
	viewLib,
	//fuck `package` reserved word.
	packige,
	analyze,
	experimental ,
	debug,
} = argvMapper<EntranceType>(args , [
	{
		/*本应由正则判断,但这里将其伪造为正则调用test函数.*/
		key : "argPort" as const,
		regExp : {test(_port) {
			const __port = parseInt(_port);
			return (Number.isSafeInteger(__port)) && (__port >= 0) && (__port <= 65535);
		}}
	},
	packigesMatcher ,
	{
		key : "analyze" as const ,
		regExp : /\banalyze\b/ ,
	} ,
	{
		/*是否开启实验特性*/
		key : "experimental" as const ,
		regExp : /\bexperimental\b/i ,
	} ,
	{
		/*view-lib只在运行demo时可用,用于启动对应view框架的demo.*/
		key : "viewLib" as const ,
		choices : [ "react" , "vue2" , "vue3" , "angular" , "solid" , "svelte" ],
	} ,
	{
		/*view-lib只在运行demo时可用,用于启动对应view框架的demo.*/
		key : "debug" as const ,
		choices : [ 'debug' ],
	} ,
]);
checkDemoArgs();
checkBuildArgs();


export const port = await getPort(argPort);

import { argvMapper , getPort , warn , packigesMatcher ,Packige} from './toolkit';
import { fileURLToPath } from 'url';
import path from 'path';
import process from 'node:process';
