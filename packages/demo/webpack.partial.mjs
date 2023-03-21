const {
	ProvidePlugin ,
	DefinePlugin,
} = webpack;


const obsCurrentPkg = path.join(obsProjectRootDir,'packages/demo');

export const webpackConfig = {
	mode : "development",
	devtool : "source-map",
	entry : path.join(obsCurrentPkg,"src"),
	devServer : {
		port : await getPort(3001),
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.join(obsCurrentPkg ,'public/index.template.ejs'),
			filename: 'index.html',
			minify: false,
			hash: true,
			excludeChunks: [],
			inject: false,
		}),
		new DefinePlugin({
			__IS_MOCK__ : mock ? 'true' : 'false' ,
			__ENV__ : JSON.stringify(env) ,
			__NODE_ENV__ : JSON.stringify(node_env),
			__METHOD__ : JSON.stringify(method),
			__EXPERIMENTAL__ : JSON.stringify(experimental === 'experimental'),
		}),
		new ProvidePlugin({
			Reaxes : ["reaxes","Reaxes"],
			orzMobx : ["reaxes","orzMobx"],
			obsReaction : ["reaxes","Reaxes","obsReaction"],
			contrastedCallback : ["reaxes","Reaxes","contrastedCallback"],
			collectDeps : ["reaxes","Reaxes","collectDeps"],
			reaxper : ["reaxes-react","reaxper"],
			Reaxlass : ["reaxes-react","Reaxlass"],
			orzPromise: ['reaxes-utils', 'orzPromise'],
			utils: ['reaxes-utils'],
			crayon: ['reaxes-utils', 'crayon'],
			toolkit: ['reaxes-toolkit'],
			orzPending: ['reaxes-toolkit','orzPending'],
		}),
	],
};

import path from 'path';
import webpack from 'webpack';
import {obsProjectRootDir,obsProjectRootFileURL} from '../../build/toolkit.mjs';
import { getPort } from '../../build/toolkit.mjs';
import { env , experimental , method , mock , node_env ,repo  } from '../../build/entrance.mjs';
import HtmlWebpackPlugin from 'html-webpack-plugin';
