const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/*will be dynamic imported*/
export default {
	entry : {
		index : path.join(__dirname , 'src/index') ,
		hooks : path.join(__dirname , 'src/hooks/index') ,
	},
	output : {
		path : path.join(__dirname , 'dist') ,
		filename : 'esm/[name].js' ,
	} ,
	externals : [
		'reaxes' ,
		'reaxes-utils' ,
		'reaxes-toolkit' ,
		'react' ,
		'react-dom' ,
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
import { Configuration } from 'webpack';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
