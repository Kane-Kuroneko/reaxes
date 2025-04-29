const {
	DefinePlugin ,
	ProvidePlugin ,
} = webpack;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const obsCurrentPkg = path.join(absProjectRootDir , 'packages/reaxes-vue3');


export default {/*will be dynamic imported*/
	entry : path.join(__dirname , 'src/index') ,
	output : {
		path : path.join(__dirname , 'dist') ,
		filename : 'esm/index.js' ,
	} ,
	devtool : 'source-map' ,
	resolve : {
		alias : {
			"mobx-vue" : path.join(absProjectRootDir , "libs/mobx-vue-lite") ,
		},
	} ,
	// stats : 'errors-only' ,
	externals : [
		"reaxes" ,
		'reaxes-utils' ,
		"reaxes-toolkit" ,
		"vue" ,
		'lodash' ,
		'mobx' ,
	] ,
	mode : 'production' ,
	performance : {
		maxEntrypointSize : 10000000 ,
		maxAssetSize : 30000000 ,
	} ,
	plugins : [
		new CleanWebpackPlugin() ,
		new CopyWebpackPlugin({
			patterns : [
				{
					from : path.join(obsCurrentPkg , 'publish/') ,
					to : path.join(obsCurrentPkg , 'dist/') ,
				} ,
			] ,
		}) ,
	] ,
} as Configuration;


import webpack , { Configuration } from 'webpack';
import { absProjectRootDir } from '../../build-tools/toolkit';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import path from "node:path";
import { fileURLToPath } from 'url';
