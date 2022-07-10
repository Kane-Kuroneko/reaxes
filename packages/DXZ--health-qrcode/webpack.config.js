const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
	devtool:"source-map",
	mode : "development" ,
	resolve : {
		symlinks : false,
		
	},
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
				{ from: "../../npm/dist/reaxes.min.js", to: "./reaxes.min.js" },
				{ from: "G:\\Reaxes\\npm\\dist\\reaxes.min.js", to: "G:\\Reaxes\\packages\\DXZ--health-qrcode\\reaxes.min.js" },
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
		watchFiles : ["src/**"],
		historyApiFallback : true ,
	},
};
