const proxy_configuration = (await import(`../packages/${repo}/proxy.configuration.json` ,{assert: { type: 'json' }})).default;
export const webpack_devserver_config = {
	stats : 'errors-only' ,
	devServer : {
		static : {
			// directory : path.resolve(rootPath , 'dist')
		} ,
		compress : false ,
		port : port ,
		server : "https" ,
		host : '0.0.0.0' ,
		hot : true ,
		open : false ,
		allowedHosts: "all",
		bonjour : true ,
		historyApiFallback : true ,
		// clientLogLevel : "none",
		// quiet : true,
		proxy : proxy_configuration.reduce((accu , config) => (accu[config.proxy_path_dev] = {
			target : config.server_host ,
			pathRewrite : config.path_rewrite ,
			secure : config.secure ,
		},accu) , {}),
		
	} ,
	devtool : 'source-map' ,
	optimization : {
		minimize : false ,
	} ,
	plugins : [
		// new LogWhenSucceed('development'),
		new LoggerWebpackPlugn({
			initialize () {
				console.log(`webpack is start\n`);
			} ,
			done () {
				console.log(`compiled successfully\n`);
			} ,
		}),
	],
};


import {
	port ,
	repo ,
} from './entrance.mjs';
import path from 'path';
import { LoggerWebpackPlugn,LogWhenSucceed } from '../build/webpack.plugins.mjs';
