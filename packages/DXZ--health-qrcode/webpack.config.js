const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
	devtool:"source-map",
	mode : "development" ,
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
				test: /\.(png|jpg|gif)$/i,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 8192,
						}
					},
				],
				type: 'javascript/auto'
			},
		] ,
	} ,
	plugins : [
		new HtmlWebpackPlugin({
		}),
		new CopyPlugin({
			patterns: [
				{ from: "statics/*", to: "dist" },
			],
		}),
	] ,
	entry : {
		"main" : "./src/main.js" ,
	} ,
	output : {
		filename : "[name].bundle.[hash:6].js" ,
		path : path.resolve(__dirname , 'dist') ,
	} ,
	stats : "errors-only",
	// watch : true ,
	devServer : {
		port : "8888",
		allowedHosts : "all",
		static : "./dist",
		host : "0.0.0.0",
		hot : 'only',
		watchFiles : ["src/**"],
		historyApiFallback : true ,
	},
};
