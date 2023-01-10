const {
	ProvidePlugin ,
	DefinePlugin,
} = webpack;

export const webpackConfig = {
	devServer : {
		port : await getPort(3001),
	},
	resolve: {
		alias: {
			'@@root': path.resolve(repoRoot),
			'@@pages': path.resolve(repoRoot, 'src/pages'),
			'@@reaxels': path.resolve(repoRoot, 'src/reaxels'),
			'@@utils': path.resolve(repoRoot, 'src/utils'),
			'@@requester': path.resolve(repoRoot, 'src/requester'),
			'@@requests': path.resolve(repoRoot, 'src/requests'),
			'@@toolkits': path.resolve(repoRoot, 'src/toolkits'),
			'@@public': path.resolve(repoRoot, 'public'),
			'@@SVGcomponents': path.resolve(repoRoot, 'src/svg-comps'),
			'@@Xcomponents': path.resolve(repoRoot, 'src/Xcomponents'),
			'--Components--': path.resolve(repoRoot, 'src/pages/--Components--'),
		},
	},
	plugins: [
		new NodePolyfillPlugin(),
		new HtmlWebpackPlugin({
			template: path.resolve(repoRoot, 'public/index.template.ejs'),
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
			orzPromise: ['@@utils', 'orzPromise'],
			utils: ['@@utils'],
			antd: ['antd'],
			toolkits: ['@@toolkits'],
			crayon: ['@@utils', 'crayon'],
			logProxy: ['@@utils', 'logProxy'],
			decodeQueryString: ['@@utils', 'decodeQueryString'],
			encodeQueryString: ['@@utils', 'encodeQueryString'],
			stringify: ['@@utils', 'stringify'],
			request: ['@@requester', 'request'],
			I18n: ['@@reaxels/i18n', 'I18n'],
			i18n: ['@@reaxels/i18n', 'i18n'],
		}),
	],
};

import path from 'path';
import webpack from 'webpack';
import NodePolyfillPlugin from 'node-polyfill-webpack-plugin';
import { getPort } from '../../build/toolkits.mjs';
import {method, repo, repoRoot , mock , env , node_env , experimental, } from '../../build/entrance.mjs';
import HtmlWebpackPlugin from 'html-webpack-plugin';
