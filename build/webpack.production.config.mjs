/*返回应用层webpack配置对象*/
import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import { merge } from "webpack-merge";
import Webpack from 'webpack';
import { method } from "../webpack.main.mjs";
import CopyWebpackPlugin from 'copy-webpack-plugin';
import {
	basicConfig$Fn ,
	port ,
	rootPath ,
} from "./webpack.core.config.mjs";
import {LogAtSucceed} from './plugins.mjs';

/*返回dev-server配置 , 用于启动本地服务*/
export const productionConfig$Fn = (mixed = {plugins:[]}) => merge(basicConfig$Fn([]) , {
	stats : 'errors-only' ,
	entry : mixed.entry,
	devtool : 'source-map' ,
	mode : "development",
	target : "es2020",
	output : {
		library : {
			type : "module",
			// export : ["default"]
		},
		chunkFormat : "module",
		// module : true,
	},
	experiments : {
		outputModule: true,
	},
	externals : [
		'react',
		'react-dom',
		'react-router', 
		'react-router-dom', 
		'ahooks', 
		'lodash', 
		'mobx', 
		'shallowequal', 
	],
	// externalsType: 'module',
	plugins : [
		...mixed.plugins ,
		new LogAtSucceed('production') ,
		new CopyWebpackPlugin({
			patterns : [
				{
					from : "./Public/template.reaxes.d.ts" ,
					to : "./reaxes.min.d.ts" ,
				},
			]
		}),
	],
});

