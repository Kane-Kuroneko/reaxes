const proxy_configuration = async () => {
	
	try {
		return (await import(path.join(absProjectRootDir,`packages/${repo}//proxy.configuration.json`) ,{ assert : { type : 'json' } })).default;
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
		port ,
		server : {
			type : 'https',
			options : {
				cert : './build/cert/127.0.0.1+5.pem',
				key : './build/cert/127.0.0.1+5-key.pem',
			}
		},
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
				console.log(`webpack is starting...\n`);
			} ,
			done () {
				console.log(chalk.green(`compiled successfully in https://${getIPV4address()}:${port}\n`));
			} ,
		}),
	],
};
import chalk from 'chalk';
import { exec } from 'child_process';
import {
	port ,
	repo ,
} from './entrance';
import { absProjectRootDir,getIPV4address } from './toolkit';
import path from 'path';
import { LoggerWebpackPlugn,LogWhenSucceed } from './webpack.plugins';
