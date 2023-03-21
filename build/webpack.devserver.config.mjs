const proxy_configuration = async () => {
	
	try {
		return (await import(path.join(obsProjectRootDir,`packages/${repo}//proxy.configuration.json`) ,{ assert : { type : 'json' } })).default;
	}catch ( e ) {
		return [];
	}
}


export const webpackServerConfig = {
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
		proxy : (await proxy_configuration()).reduce((accu , config) => (accu[config.proxy_path_dev] = {
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
import { obsProjectRootDir } from './toolkit.mjs';
import path from 'path';
import { LoggerWebpackPlugn,LogWhenSucceed } from '../build/webpack.plugins.mjs';
