
/**
 * 此文件是所有打包行为的入口,为后续流程提供依赖
 */

export const args = process.argv.slice(2);

export const port = await getPort();

/*排除构建的包,不作为独立的package*/
export const excludedPackages = [];

export let {
	repo = null,
	mock = null,
	analyze = false ,
	method = "server" ,
	env = "unset",
	node_env = "development",
	experimental = "non-exp" ,
} = overload(args , [
	{
		regExp : /\bdemo|reaxes-react\b/ ,
		key : "repo" ,
	} ,
	{
		regExp : /\bmock\b/ ,
		key : "mock" ,
	} ,
	{
		regExp : /\banalyze\b/ ,
		key : "analyze" ,
	} ,
	{
		/*启动模式,构建还是本地服务*/
		regExp : /\bbuild|server\b/ ,
		key : "method" ,
	} ,
	{
		/*网络请求环境*/
		regExp : /\bserver_yang|server_dev|server_production\b/ ,
		key : "env" ,
	} ,
	{
		/*webpack的mode*/
		regExp : /\bdevelopment|production\b/ ,
		key : "node_env" ,
	} ,
	{
		/*是否开启实验特性*/
		regExp : /\bexperimental\b/i ,
		key : "experimental" ,
	} ,
]);

/*如果没有明确指定node_env:  npm.server下自动dev,npm.build是production*/
if ( !node_env ) {
	if(method === "server"){
		node_env = 'development';
	}else if (method === "build") {
		node_env = 'production';
	}else {
		node_env = 'development';
	}
}else if(node_env === "production"){
	
}
export const rootPath = path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../');

export const repoRoot = path.resolve(rootPath , `packages/${ repo }`);

export const packagesRoot = path.resolve(rootPath , `packages`);

/*只有在列表中声明的包才可以被运行*/
export const repoPackages = readdirSync("../packages").filter((_package) => {
	return !excludedPackages.includes(_package);
});

if(!repo){
	throw "npm run build <<repo>> is nessessary";
}
/*非业务模块不可被打包,因为webpack.base.config.mjs里配置了对通用模块的alias,*/
if(repoPackages.every((repoName) => repoName !== repo )){
	throw new Error(`this repo "${ repo }" is not a valid business package`);
}


import {
	getPort ,
	overload,
} from './toolkit.mjs';
import { fileURLToPath } from "url";
import path from "path";
import { merge } from "webpack-merge";
import {readdirSync} from 'fs';
