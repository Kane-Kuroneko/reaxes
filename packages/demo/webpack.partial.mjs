const {
	ProvidePlugin ,
	DefinePlugin,
	CleanPlugin
} = webpack;


const obsCurrentPkg = path.join(absProjectRootDir,'packages/demo');

export const webpackConfig = merge({
	mode : "development",
	devtool : "source-map",
	entry : path.join(obsCurrentPkg,"src"),
	devServer : {
		port,
	},
	resolve : {
		alias : {
			//rewrite import "vue" to "vue2"
			"src" : path.join(obsCurrentPkg,'src'),
			"vue" : env_vue === "vue2" ? "vue2/dist/vue.esm.browser.min" : env_vue,
		},
	},
	plugins: [
		new CleanPlugin(),
		new HtmlWebpackPlugin({
			template: path.join(obsCurrentPkg ,'public/index.template.ejs'),
			filename: 'index.html',
			minify: false,
			hash: true,
			excludeChunks: [],
			inject: false,
		}),
		new DefinePlugin({
			__ENV_VUE__ : JSON.stringify(env_vue),
			__IS_MOCK__ : mock ? 'true' : 'false' ,
			__ENV__ : JSON.stringify(env) ,
			__NODE_ENV__ : JSON.stringify(node_env),
			__METHOD__ : JSON.stringify(method),
			__EXPERIMENTAL__ : JSON.stringify(experimental === 'experimental'),
		}),
		new ProvidePlugin({
			Reaxes : ["reaxes","Reaxes"],
			orzMobx : ["reaxes","orzMobx"],
			reaxel : ["reaxes","reaxel"],
			obsReaction : ["reaxes","Reaxes","obsReaction"],
			contrastedCallback : ["reaxes","Reaxes","contrastedCallback"],
			collectDeps : ["reaxes","Reaxes","collectDeps"],
			reaxper : ["reaxes-react","reaxper"],
			Reaxlass : ["reaxes-react","Reaxlass"],
			orzPromise: ['reaxes-utils', 'orzPromise'],
			utils: ['reaxes-utils'],
			crayon: ['reaxes-utils', 'crayon'],
			logProxy: ['reaxes-utils', 'logProxy'],
			toolkit: ['reaxes-toolkit'],
			orzPending: ['reaxes-toolkit','orzPending'],
		}),
	],
},{
	"vue2" : vue2_webpack_config,
	"vue3" : vue3_webpack_config,
}[env_vue]);



import { vue2_webpack_config } from '../../build/vue/vue2/webpack.mjs';
import { vue3_webpack_config } from '../../build/vue/vue3/webpack.mjs';

import path from 'path';
import fs from 'fs';
import webpack from 'webpack';
import { merge } from 'webpack-merge';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import {absProjectRootDir,absProjectRootFileURL} from '../../build/toolkit.mjs';
import { getPort } from '../../build/toolkit.mjs';
import { env , experimental , method , mock , node_env , repo , vue as env_vue , port } from '../../build/entrance.mjs';
