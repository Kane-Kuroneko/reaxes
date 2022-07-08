import webpack from 'webpack';
import chalk from 'chalk';
import WebpackDevServer from 'webpack-dev-server';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import CompressionWebpackPlugin from 'compression-webpack-plugin';


import {
	overload ,
	webpack_promise ,
} from './build/utils.mjs';
import { developmentConfig$Fn } from "./build/webpack.development.config.mjs";
import { productionConfig$Fn } from "./build/webpack.production.config.mjs";

const {
	DefinePlugin ,
	ProvidePlugin ,
} = webpack;
/* 标记开始时间以记录build花费 */
const startTime = Date.now();

/**
 * 获取npm run <method> <env> <mock?>
 * @var method {"server"|"build"}
 */
const args = process.argv.slice(2);
/**
 * npm start dev mock
 * npm start --analyze
 * #npm build mock
 * npm start
 * todo: analyze
 */
/*对参数进行判断/处理*/
export let {
	entry = "core" ,
	analyze = false ,
	method = "server" ,
	node_env = "development",
	experimental = null ,
} = overload(args , [
	{
		regExp : /\bcore|examples\b/ ,
		key : "entry" ,
	} ,
	{
		regExp : /\banalyze\b/ ,
		key : "analyze" ,
	} ,
	{
		regExp : /\bbuild|server\b/ ,
		key : "method" ,
	} ,
	{
		/*网络请求环境*/
		regExp : /\bdevelopment|production\b/ ,
		key : "node_env" ,
	} ,
	{
		/*是否开启实验特性*/
		regExp : /\bexperimental\b/i ,
		key : "experimental" ,
	} ,
]);

/*如果是dev环境则默认开启实验特性,除非明确说明*/
if(experimental === null && node_env === 'development') experimental = 'experimental';
else if(node_env === "production" ) experimental = 'non-exp';
const analysis = analyze ? [new BundleAnalyzerPlugin()] : [];
entry = `/packages/${ entry }/index`;
const devConfig = developmentConfig$Fn({
	plugins : [
		getProvidePlugin() ,
		getDefinePlugin(node_env ) ,
		...analysis,
	] ,
	entry ,
});
const prodConfig = productionConfig$Fn({
	plugins : [
		getProvidePlugin() ,
		getDefinePlugin() ,
		new CompressionWebpackPlugin({
			
		}) ,
		...analysis,
	] ,
	entry ,
});


setTimeout(start);

function start () {
	if ( process.argv.includes('mock') ) {
		console.log(chalk.yellowBright(`当前运行在mock模式下`));
	}
	switch ( method ) {
		case 'server':
			devServer().
			then(() => {}).
			catch(e => {
				console.log('server失败!');
				console.error(e);
			});
			break;
		case 'build': {
			chalk.green(`building , please hold on...`)
			build().then(() => {
				const usedTime = (Date.now() - startTime) / 1000;
				console.log(chalk.green(`构建成功! 用时${ usedTime }s`));
			}).catch(e => {
				console.log(chalk.red(`构建失败 : `));
				console.error(e);
			});
		}
	}
}

/* 注入plugin并启动dev-server */
function devServer () {
	
	try {
		const compiler = webpack(devConfig);
		const webpackServer = new WebpackDevServer(
			devConfig.devServer,
			compiler ,
		);
		webpackServer.start().then(() => {
			// console.log(chalk.yellow(`WDS已启动在http://${ getIPV4address() }:${ port }`));
		})
	}
	catch ( e ) {
		return Promise.reject(e);
	}
	finally {
		return Promise.resolve(true);
	}
};

/* 打包业务代码 */
function build () {
	return webpack_promise(prodConfig );
};

function getDefinePlugin (mode = node_env || 'production') {
	return new DefinePlugin({
		// '__REACT_DEVTOOLS_GLOBAL_HOOK__' : '({ isDisabled: true })' , /* 递归遍历src/pages下的文件结合src/pages/Route_Map.json , 生成一份路由表注入到全局变量里 */
	});
};

function getProvidePlugin (config = {}) {
	const examplesNeeded = {
		
	};
	return new ProvidePlugin({
		_ : ["lodash"] ,
		React : ["react"] ,
		useState : [
			"react" ,
			"useState",
		] ,
		useEffect : [
			"react" ,
			"useEffect",
		] ,
		useRef : [
			"react" ,
			"useRef",
		] ,
		useLayoutEffect : [
			"react" ,
			"useLayoutEffect",
		] ,
		useMemo : [
			"react" ,
			"useMemo",
		] ,
		useCallback : [
			"react" ,
			"useCallback",
		] ,
		Reaxper : [
			"reaxes" ,
			"Reaxper",
		] ,
		Reaxlass : [
			"reaxes" ,
			"Reaxlass",
		] ,
		orzMobx : [
			"reaxes" ,
			"orzMobx",
		] ,
		Reaxes : ["reaxes","Reaxes"] ,
		orzPromise : [
			"@@utils" ,
			"orzPromise",
		] ,
		utils : ["@@utils"] ,
		crayon : [
			"@@utils" ,
			"crayon",
		] ,
		logProxy : [
			"@@utils" ,
			"logProxy",
		] ,
		decodeQueryString : [
			"@@utils" ,
			"decodeQueryString",
		] ,
		encodeQueryString : [
			"@@utils" ,
			"encodeQueryString",
		] ,
		stringify : [
			"@@utils" ,
			"stringify",
		] ,
	});
};

