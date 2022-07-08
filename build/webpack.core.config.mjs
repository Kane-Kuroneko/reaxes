/** @format */

import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import { merge } from 'webpack-merge';
import { __dirname } from './.mix.js';
import { getPort, pick } from './utils.mjs';
import {
	method,
} from '../webpack.main.mjs';

import {LogAtSucceed} from './plugins.mjs';
/**
 * @suggest dev环境建议使用全量source-map , 否则可能会导致错误栈无法定位到正确的模块
 */
const {
	DllReferencePlugin ,
	DllPlugin ,
	DefinePlugin,
} = webpack;
const defaultPartialConfig = {
	plugins : [] ,
};
/*拿到可用的端口号*/
export const port = await getPort();
export const rootPath = path.resolve(__dirname , '../');
const packagesPah = path.resolve(__dirname , '../packages/');

/*webpack基础配置*/
export const basicConfig$Fn = (plugins = []) => ({
	mode : method === 'server' ? 'development' : 'production' ,
	output : {
		filename : 'reaxes.min.js' ,
		path : path.resolve(rootPath , 'npm/dist') ,
		// publicPath : path.resolve(rootPath , 'dist') ,
	} ,
	resolve : {
		alias : {
			/*development*/
			/*production*/
			'mobx-react' : path.resolve(packagesPah , 'mobxs/mobx-react') ,
			'mobx-react-lite' : path.resolve(packagesPah , 'mobxs/mobx-react-lite') ,
			'reaxes' : path.resolve(packagesPah , 'core') ,
			'@@packages' : path.resolve(packagesPah) ,
			'@@RootPath' : path.resolve(rootPath) ,
			'@@utils' : path.resolve(packagesPah , 'utils/index') ,
			'@@utils/*' : path.resolve(packagesPah , 'utils/*') ,
			'@@Public' : path.join(rootPath , 'Public') ,
		} ,
		extensions : [
			'.ts' ,
			'.tsx' ,
			'.js' ,
			'.jsx' ,
			'.json',
		] ,
	} ,
	devtool : 'source-map' , 
	// cache : {
	// 	type : "filesystem",
	// 	allowCollectingMemory: true, 
	// } ,
	module : {
		rules : [
			{
				test : /\.(jsx?|tsx?)$/ ,
				use : {
					loader : 'babel-loader' ,
					options : {
						sourceMap : true ,
					} ,
				} ,
				exclude : /node_modules/ ,
			} ,
			{
				test : /\.module\.less$/ ,
				use : [
					{
						loader : 'style-loader' ,
					} ,
					{
						loader : 'css-loader' ,
						options : cssLoaderOptions ,
					} ,
					{
						loader : 'less-loader' ,
						options : {
							sourceMap : true ,
							lessOptions : {
								javascriptEnabled : true ,
							} ,
						} ,
					} ,
				] ,
			} ,
			{
				test : /(?<!\.module)\.less$/ ,
				use : [
					{
						loader : 'style-loader' ,
					} ,
					{
						loader : 'css-loader' ,
						options : pick(cssLoaderOptions,["sourceMap"]) ,
					} ,
					{
						loader : 'less-loader' ,
						options : {
							sourceMap : true ,
							lessOptions : {
								javascriptEnabled : true ,
							} ,
						} ,
					} ,
				] ,
			} ,
			{
				test : /\.module\.css$/ ,
				use : [
					{
						loader : 'style-loader' ,
					} ,
					{
						loader : 'css-loader' ,
						options : cssLoaderOptions ,
					} ,
				] ,
			} ,
			{
				test : /(?<!\.module)\.css$/ ,
				use : [
					{
						loader : 'style-loader' ,
					} ,
					{
						loader : 'css-loader' ,
						options : pick(cssLoaderOptions,["sourceMap"]) ,
					} ,
				] ,
			} ,
			{
				test : /\.(png|jpe?g|te?xt|gif|woff|woff2|eot|ttf|otf|bmp|swf)$/ ,
				type : "asset/resource",
				generator: {
					filename: 'static/[hash][ext][query]'
				},
				parser: {
					dataUrlCondition: {
						maxSize: 20 * 1024,
					},
				},
			} ,
			{
				test : /\.component\.svg$/ ,
				use : ["@svgr/webpack"],
				
			} ,
			{
				test : /(?<!\.component)\.svg$/ ,
				type : "asset/resource",
				
			} ,
		] ,
	} ,
	optimization : {
		minimizer : [
			new TerserPlugin({
				extractComments : false ,
				terserOptions : {
					format : {
						comments : false ,
					} ,
				} ,
			}) ,
		] ,
	} ,
	performance : {
		maxEntrypointSize : 10000000 ,
		maxAssetSize : 30000000 ,
	} ,
	stats : 'errors-only' ,
	plugins : [
		...plugins
	] ,
});



const cssLoaderOptions = {
	sourceMap :  true ,
	modules : {
		exportLocalsConvention : "dashes",
		localIdentName: "[local]--[hash:base64:4]",
		
	},
}
