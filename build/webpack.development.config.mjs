/*返回应用层webpack配置对象*/
import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import { merge } from "webpack-merge";
import Webpack from 'webpack';
import { method } from "../webpack.main.mjs";
import {
	basicConfig$Fn ,
	port ,
	rootPath ,
} from "./webpack.core.config.mjs";
import { envConfig } from './.mix.js';
import {LogAtSucceed} from './plugins.mjs';
// import envConfig from '../Public/env.config.json';
// const envConfig = require('../Public/env.config.json');


/*返回dev-server配置 , 用于启动本地服务*/
export const developmentConfig$Fn = (mixed = {plugins:[]}) => merge(basicConfig$Fn([]) , {
	stats : 'errors-only' ,
	devServer : {
		static : {
			// directory : path.resolve(rootPath , 'dist')
		} ,
		compress : false ,
		port : port ,
		https:true ,
		host : '0.0.0.0' ,
		hot : true , 
		open : false ,
		allowedHosts: "all",
		bonjour : true ,
		historyApiFallback : true ,
		// clientLogLevel : "none",
		// quiet : true,
		proxy : envConfig.reduce((accu , config) => (accu[config.proxy_path_dev] = {
			target : config.server_host ,
			pathRewrite : config.path_rewrite ,
			secure : config.secure ,
		},accu) , {}),
		
	} ,
	devtool : 'source-map' ,
	optimization : {
		minimize : false ,
	} ,
	plugins : [...mixed.plugins, new LogAtSucceed('development'),],
	
});
