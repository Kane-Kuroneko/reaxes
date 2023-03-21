const cssLoaderOptions = {
	sourceMap: true,
	modules: {
		exportLocalsConvention: 'dashes',
		localIdentName: '[local]--[hash:base64:4]',
	},
};
const { ProvidePlugin} = webpack;
/**
 * suggest dev环境建议使用全量source-map , 否则可能会导致错误栈无法定位到正确的模块
 */
/*webpack基础配置*/
export const webpackBaseConfig = {
	mode: node_env,
	output: {
		filename: node_env === 'development' ? '[name].bundle.js' : '[name].bundle.[contenthash:6].js',
		path : path.join(obsProjectRootDir , repo , 'dist'), 
		// publicPath : path.resolve(rootPath , 'dist') ,
	},
	resolve: { 
		aliasFields: ['browser'],
		alias: {
			'#root': obsProjectRootDir,
			'#packages': path.join(obsProjectRootDir,'packages'),
			'reaxes': path.join(obsProjectRootDir, 'packages/reaxes'),
			'reaxes-toolkit': path.join(obsProjectRootDir, 'packages/reaxes-toolkit'),
			'reaxes-utils': path.join(obsProjectRootDir, 'packages/reaxes-utils'),
			'reaxels': path.join(obsProjectRootDir, 'packages/reaxels'),
			'reaxes-react': path.join(obsProjectRootDir, 'packages/reaxes-react'),
			'reaxes-vue': path.join(obsProjectRootDir, 'packages/reaxes-vue'),
			'reaxes-angular': path.join(obsProjectRootDir, 'packages/reaxes-angular'),
		},
		extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
	},
	devtool: 'cheap-source-map',
	module: {
		rules: [
			{
				test: /\.m?js$/,
				resolve: {
					fullySpecified: false,
				},
			},
			{
				test: /\.(jsx?|tsx?)$/,
				use: {
					loader: 'babel-loader',
					options : {
						configFile : path.join(obsProjectRootDir , 'babel.config.js'),
					}
				},
				exclude: /node_modules/,
			},
			{
				test: /\.module\.less$/,
				use: [
					{
						loader: 'style-loader',
					},
					{
						loader: 'css-loader',
						options: cssLoaderOptions,
					},
					{
						loader: 'less-loader',
						options: {
							sourceMap: true,
							lessOptions: {
								javascriptEnabled: true,
							},
						},
					},
				],
			},
			{
				test: /(?<!(\.module|\.theme))\.less$/,
				use: [
					{
						loader: 'style-loader',
					},
					{
						loader: 'css-loader',
						options: _.pick(cssLoaderOptions, ['sourceMap']),
					},
					{
						loader: 'less-loader',
						options: {
							sourceMap: true,
							lessOptions: {
								javascriptEnabled: true,
							},
						},
					},
				],
			},
			{
				test: /\.module\.css$/,
				use: [
					{
						loader: 'style-loader',
					},
					{
						loader: 'css-loader',
						options: cssLoaderOptions,
					},
				],
			},
			{
				test: /(?<!(\.module|\.theme))\.css$/,
				use: [
					{
						loader: 'style-loader',
					},
					{
						loader: 'css-loader',
						options: _.pick(cssLoaderOptions, ['sourceMap']),
					},
				],
			},
			{
				test: /\.theme\.(le|c)ss$/, // type :  "asset/source",
				use: [
					{
						loader: 'css-loader',
						options: _.pick(cssLoaderOptions, ['sourceMap']),
					},
					{
						loader: 'less-loader',
						options: {
							sourceMap: true,
							lessOptions: {
								javascriptEnabled: true,
							},
						},
					},
				],
			},
			{
				test: /\.(png|jpe?g|te?xt|gif|woff|woff2|eot|ttf|otf|bmp|swf|mp4)$/,
				type: 'asset/resource',
				generator: {
					filename: 'static/[hash][ext][query]',
				},
				parser: {
					dataUrlCondition: {
						maxSize: 20 * 1024,
					},
				},
			},
			{
				test: /\.component\.svg$/,
				use: ['@svgr/webpack'],
			},
			{
				test: /(?<!\.component)\.svg$/,
				type: 'asset/resource',
			},
		],
	},
	optimization: {
		minimizer: [
			new TerserPlugin({
				extractComments: false,
				terserOptions: {
					format: {
						comments: false,
					},
				},
			}),
		],
	},
	performance: {
		maxEntrypointSize: 10000000,
		maxAssetSize: 30000000,
	},
	stats: 'errors-only',
	plugins: [
		new ProvidePlugin({
			_: ['lodash'],
			React: ['react'],
			useState: ['react', 'useState'],
			useEffect: ['react', 'useEffect'],
			useRef: ['react', 'useRef'],
			useLayoutEffect: ['react', 'useLayoutEffect'],
			useMemo: ['react', 'useMemo'],
			useCallback: ['react', 'useCallback'],
		}),
	],
};

import path from 'path';
import TerserPlugin from 'terser-webpack-plugin';
import {
	method ,
	node_env,
	repo
} from './entrance.mjs';
import { obsProjectRootDir , obsProjectRootFileURL } from './toolkit.mjs';
import _ from 'lodash';
import webpack from 'webpack';
import NodePolyfillPlugin from 'node-polyfill-webpack-plugin';
