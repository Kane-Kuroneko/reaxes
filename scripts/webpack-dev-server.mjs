Error.stackTraceLimit = 1000;

const webpackDevConfig = merge( webpackServerConfig,webpackConfigWithRepo );
// delete webpackDevConfig.output;
const webpackDevServer = async () => {
	try {
		const { compiler } = await webpack_promise(webpackDevConfig);
		const webpackServer = new WebpackDevServer(webpackDevConfig.devServer , compiler);
		webpackServer.start().then(() => {
			console.log(chalk.yellow(`WDS已启动在http://${ getIPV4address() }:${ port }`));
		}).catch((e) => {
			console.error(e);
		});
	}
	catch ( e ) {
		console.error(e);
		return Promise.reject(e);
	}
	finally {
		return Promise.resolve(true);
	}
};

webpackDevServer();

import {
	port ,
	repo ,
	mock ,
	env ,
	args ,
	node_env ,
	method ,
	analyze ,
	experimental ,
} from '../build/entrance.mjs';
import {getIPV4address,webpack_promise} from '../build/toolkit.mjs';
import { webpackConfigWithRepo } from '../build/webpack.repo.config.mjs';
import { webpackServerConfig } from '../build/webpack.devserver.config.mjs';
import { merge } from "webpack-merge";
import WebpackDevServer from 'webpack-dev-server';
import chalk from 'chalk';
import webpack from 'webpack';
