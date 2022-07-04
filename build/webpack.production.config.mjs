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
import {LogAtSucceed} from './plugins.mjs';

/*返回dev-server配置 , 用于启动本地服务*/
export const productionConfig$Fn = (mixed = {plugins:[]}) => merge(basicConfig$Fn([]) , {
	stats : 'errors-only' ,
	mode : "production",
	devtool : 'source-map' ,
	plugins : [
		...mixed.plugins ,
		new LogAtSucceed('production') ,
	],
});

