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


export default {
	entry : "./src/index.tsx" ,
	output : {
		libraryTarget : "module" ,
		module : true ,
		path : path.resolve(__dirname , 'dist') ,
		filename : "index.js" ,
	} ,
	resolve : {
		alias : {
			'@@root' : __dirname ,
			'@@libs' : path.resolve(__dirname , 'libs') ,
			'@@packages/*' : path.resolve(__dirname , "../") ,
			'@@utils' : path.resolve(packages , 'utils') ,
		} ,
		extensions : [
			'.ts' ,
			'.tsx' ,
			'.js' ,
			'.jsx' ,
			'.json' ,
		] ,
	} ,
	devtool : 'source-map' ,
	experiments : {
		outputModule : true ,
	} , // stats : 'errors-only' ,
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
						options : _.pick(cssLoaderOptions , ["sourceMap"]) ,
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
						options : _.pick(cssLoaderOptions , ["sourceMap"]) ,
					} ,
				] ,
			} ,
			{
				test : /\.(png|jpe?g|te?xt|gif|woff|woff2|eot|ttf|otf|bmp|swf)$/ ,
				type : "asset/resource" ,
				generator : {
					filename : 'static/[hash][ext][query]' ,
				} ,
				parser : {
					dataUrlCondition : {
						maxSize : 20 * 1024 ,
					} ,
				} ,
			} ,
			{
				test : /\.component\.svg$/ ,
				use : ["@svgr/webpack"] ,
				
			} ,
			{
				test : /(?<!\.component)\.svg$/ ,
				type : "asset/resource" ,
				
			} ,
		] ,
	} ,
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
					from : "src/types.d.ts" ,
					to : "types.d.ts" ,
				},
			],
		}),
	] ,
};
