import webpack from 'webpack';
import portfinder from 'portfinder';
import { fileURLToPath } from 'url';
import _ from 'lodash';
import path from 'path';
import CopyWebpackPlugin from 'copy-webpack-plugin';

const {
	DefinePlugin ,
	ProvidePlugin,
} = webpack;

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname , '../../');
function getProvidePlugin () {
	return new ProvidePlugin({
		_ : ["lodash"] ,
		React : ["react"] ,
		useState : [
			"react" ,
			"useState" ,
		] ,
		useEffect : [
			"react" ,
			"useEffect" ,
		] ,
		useRef : [
			"react" ,
			"useRef" ,
		] ,
		useLayoutEffect : [
			"react" ,
			"useLayoutEffect" ,
		] ,
		useMemo : [
			"react" ,
			"useMemo" ,
		] ,
		useCallback : [
			"react" ,
			"useCallback" ,
		] ,
		orzPromise : [
			"@@utils" ,
			"orzPromise",
		] ,
		utils : ["@@utils"] ,
		crayon : [
			"@@utils" ,
			"crayon",
		] ,
		logProxy : [
			"@@utils" ,
			"logProxy",
		] ,
		decodeQueryString : [
			"@@utils" ,
			"decodeQueryString",
		] ,
		encodeQueryString : [
			"@@utils" ,
			"encodeQueryString",
		] ,
		stringify : [
			"@@utils" ,
			"stringify",
		] ,
	});
};

const packages = path.resolve(__dirname , "../");
const getPort = () => {
	portfinder.basePort = 8080;
	return portfinder.getPortPromise();
};
const cssLoaderOptions = {
	sourceMap : true ,
	modules : {
		exportLocalsConvention : "dashes" ,
		localIdentName : "[local]--[hash:base64:4]" ,
		
	} ,
};


export const webpackConfig = {
	entry : "./src/index.tsx" ,
	output : {
		libraryTarget : "module" ,
		module : true ,
		path : path.resolve(__dirname , 'dist') ,
		filename : "index.js" ,
	} ,
	devtool : 'source-map' ,
	experiments : {
		outputModule : true ,
	} , // stats : 'errors-only' ,
	externals : [
		'reaxes',
		'react',
		'react-dom',
		'react-router',
		'react-router-dom',
		'lodash',
		'mobx',
		'shallowequal',
	],
	mode : "production" ,
	performance : {
		maxEntrypointSize : 10000000 ,
		maxAssetSize : 30000000 ,
	} ,
	plugins : [
		getProvidePlugin() ,
		new CopyWebpackPlugin({
			patterns : [
				{
					from : "./public/package.json" ,
					to : "./dist/package.json" ,
				},
			],
		}),
	] ,
};
