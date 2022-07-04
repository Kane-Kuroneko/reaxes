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

import NodePolyfillPlugin from 'node-polyfill-webpack-plugin'
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

/*webpack基础配置*/
export const basicConfig$Fn = (plugins = []) => ({
	mode : method === 'server' ? 'development' : 'production' ,
	entry : {
		main : '/src/main.tsx' ,
	} ,
	output : {
		filename : '[name].bundle.[fullhash:6].js' ,
		path : path.resolve(rootPath , 'dist') ,
		// publicPath : path.resolve(rootPath , 'dist') ,
	} ,
	resolve : {
		alias : {
			'react-dom' : "@hot-loader/react-dom" ,
			'mobx-react-lite' : path.resolve(rootPath , 'src/libs/mobx-react-lite/index') ,
			'@@RootPath' : path.resolve(rootPath) ,
			'@@common' : path.resolve(rootPath , 'src/common') ,
			'@@common/*' : path.resolve(rootPath , 'src/common/*') ,
			'@@utils' : path.resolve(rootPath , 'src/utils/index.tsx') ,
			'@@utils/*' : path.resolve(rootPath , 'src/utils/*') ,
			'@@Public' : path.join(rootPath , 'Public') ,
			'@@mobxState' : path.resolve(rootPath , 'src/common/MobxState.ts') ,
			'@@components' : path.resolve(rootPath , 'src/utils/components/index.ts') ,
			'@@components/*' : path.resolve(rootPath , 'src/utils/components/*') ,
			'@@pages' : path.resolve(rootPath , 'src/pages') ,
			'@@reaxes' : path.resolve(rootPath , 'src/reaxes') ,
			'@@reaxes/*' : path.resolve(rootPath , 'src/reaxes/*') ,
			'@@requester' : path.resolve(rootPath , 'src/common/requester') ,
			'@@requests' : path.resolve(rootPath , 'src/requests') ,
			'@@requests/*' : path.resolve(rootPath , 'src/requests/*') ,
			// '@@common/requests' : path.resolve(rootPath , 'src/common/requests/index.ts') ,
			// '@@common/routes' : path.resolve(rootPath , 'src/common/routes/index.ts') ,
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
		new HtmlWebpackPlugin({
			template : './Public/index.template.ejs' ,
			title : 'eth' ,
			filename : 'index.html' ,
			minify : false ,
			hash : true ,
			excludeChunks : [] ,
			inject : false ,
		}) ,
		new NodePolyfillPlugin(),
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
