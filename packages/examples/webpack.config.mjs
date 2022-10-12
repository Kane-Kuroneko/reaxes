import chalk from 'chalk';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import portfinder from 'portfinder';
import HtmlWebpackPlugin from 'html-webpack-plugin';

// import CompressionWebpackPlugin from 'compression-webpack-plugin';
const {DefinePlugin,ProvidePlugin } = webpack;
/* 标记开始时间以记录build花费 */
import { fileURLToPath } from 'url';

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
		Reaxper : [
			"reaxes" ,
			"Reaxper" ,
		] ,
		Reaxlass : [
			"reaxes" ,
			"Reaxlass" ,
		] ,
		orzMobx : [
			"reaxes" ,
			"orzMobx" ,
		] ,
		Reaxes : [
			"reaxes" ,
			"Reaxes",
		] ,
		orzPromise : [
			"@@utils" ,
			"orzPromise" ,
		] ,
		utils : ["@@utils"] ,
		crayon : [
			"@@utils" ,
			"crayon" ,
		] ,
		logProxy : [
			"@@utils" ,
			"logProxy" ,
		] ,
		decodeQueryString : [
			"@@utils" ,
			"decodeQueryString" ,
		] ,
		encodeQueryString : [
			"@@utils" ,
			"encodeQueryString" ,
		] ,
		stringify : [
			"@@utils" ,
			"stringify" ,
		] ,
	});
};

/*<------------------------------------------------>*/
const packages = path.resolve(__dirname,"../");
console.log(packages);
const getPort = () => {
	portfinder.basePort = 8080;
	return portfinder.getPortPromise();
};
const cssLoaderOptions = {
	sourceMap :  true ,
	modules : {
		exportLocalsConvention : "dashes",
		localIdentName: "[local]--[hash:base64:4]",
		
	},
}
/*从object里挑出某些键*/
export const pick = (source,keys) => {
	return keys.reduce((accu,key) => {
		if(source.hasOwnProperty(key)){
			return Object.assign(accu , { [key] : source[key] });
		}
	},{});
}; 
export default {
	entry : "./src/index.tsx" ,
	output : {
		filename : "public/index.bundle.js",
	},
	resolve : {
		alias : {
			// 'reaxes' : path.resolve(packages , 'reaxes/dist/index') ,
			'@@reaxes' : path.resolve(packages , 'reaxes') ,
			'@@root' : __dirname ,
			'@@packages/*' : path.resolve(__dirname,"../") ,
			'@@utils' : path.resolve(packages , 'utils/dist/index') ,
			'@@Public/*' : path.join(__dirname , 'Public/*') ,
		} ,
		extensions : [
			'.ts' ,
			'.tsx' ,
			'.js' ,
			'.jsx' ,
			'.json',
		] ,
	} ,
	devServer : {
		compress : false ,
		port : await getPort(),
		server : "https",
		host : '0.0.0.0' ,
		hot : true ,
		open : false ,
		allowedHosts: "all",
		bonjour : true ,
		historyApiFallback : true ,
		// clientLogLevel : "none",
		// quiet : true,
	} ,
	devtool : 'source-map' ,
	// stats : 'errors-only' ,
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
						options : pick(cssLoaderOptions , ["sourceMap"]) ,
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
						options : pick(cssLoaderOptions , ["sourceMap"]) ,
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
	mode:"development",
	performance : {
		maxEntrypointSize : 10000000 ,
		maxAssetSize : 30000000 ,
	} ,
	plugins : [
		new HtmlWebpackPlugin({
			template : './public/index.html' ,
		}) ,
	],
};
import path from 'path';
