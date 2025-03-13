const {
	DefinePlugin ,
	ProvidePlugin ,
} = webpack;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/*will be dynamic imported*/
export default {
	entry : path.join(__dirname , 'src/index') ,
	output : {
		path : path.join(__dirname,'dist') ,
		filename : 'esm/index.js' ,
	} ,
	externals : [
		'reaxes',
		'reaxes-utils' ,
		'lodash' ,
		'mobx' ,
	] ,
	plugins : [
		new CleanWebpackPlugin() ,
		new CopyWebpackPlugin({
			patterns : [
				{
					from : path.join(__dirname , 'publish/') ,
					to : path.join(__dirname , 'dist/') ,
				} ,
			] ,
		}) ,
	] ,
} as Configuration;

import path from "node:path";
import { fileURLToPath } from 'url';
import webpack , { Configuration } from 'webpack';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
