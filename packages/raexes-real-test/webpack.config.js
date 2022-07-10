const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const ProvidePlugin = require('webpack').ProvidePlugin;
const hooks = [
	"State",
	"Effect",
	"Context",
	"Reducer",
	"Callback",
	"Memo",
	"Ref",
	"ImperativeHandle",
	"LayoutEffect",
	"DebugValue",
	"DeferredValue",
	"Transition",
	"Id",
	"SyncExternalStore",
	"InsertionEffect",
].reduce((accu,name) => {
	accu[`use${ name }`] = [
		"react" ,
		[`use${ name }`] ,
	];
	return accu;
},{});
module.exports = {
	devtool : "source-map" ,
	mode : "development" ,
	resolve : {
		symlinks : false ,
		
	} ,
	module : {
		rules : [
			{
				test : /\.(j|t)sx?$/i ,
				use : [
					{
						loader : "babel-loader" ,
						
					} ,
				] ,
			} ,
			{
				test : /\.css$/i ,
				use : [
					{
						loader : "style-loader" ,
					} ,
					{
						loader : "css-loader" ,
					} ,
				] ,
			} ,
			{
				test : /\.(png|jpg|gif)$/i ,
				use : [
					{
						loader : 'url-loader' ,
						options : {
							limit : 8192 ,
						} ,
					} ,
				] ,
				type : 'javascript/auto' ,
			} ,
		] ,
	} ,
	plugins : [
		new HtmlWebpackPlugin({}) ,
		new ProvidePlugin({
			React : ["react"] ,
			...hooks ,
			
		}),
	] ,
	entry : {
		"main" : "./src/main.js" ,
	} ,
	output : {
		filename : "[name].bundle.[hash:6].js" ,
		path : path.resolve(__dirname , 'dist') ,
	} ,
	stats : "errors-only" , // watch : true ,
	devServer : {
		port : "8888" ,
		allowedHosts : "all" ,
		static : "./dist" ,
		host : "0.0.0.0" ,
		watchFiles : ["src/**"] ,
		historyApiFallback : true ,
	} ,
};



