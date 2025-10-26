const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const entries = {
	'index' : path.join(__dirname , 'src/index') ,
	'react-hooks' : path.join(__dirname , 'src/react-hooks/index') ,
	'type-helpers' : path.join(__dirname , 'src/type-helpers/index') ,
};

export default {
	entry : entries ,
	output : {
		path : path.join(__dirname , 'dist') ,
		filename( pathData ){
			const name = pathData.chunk.name;
			if( !name ) {
				console.log(pathData.chunk);
			}
			if( Object.keys(entries).includes(name) ) {
				
				return {
					'index' : 'esm/index.js' ,
					'react-hooks' : 'esm/react-hooks/index.js' ,
					'type-helpers' : 'esm/type-helpers/index.js' ,
				}[name];
			} else {
				return `[name].js`;
			}
		} ,
	} ,
	plugins:[
		new CopyPlugin({
			patterns : [
				{
					from : path.join(__dirname,'publish'),
					to :path.join(__dirname,'dist')
				}
			]
		})
	],
	externals : [
		"reaxes" ,
		"reaxes-react" ,
		"reaxes-vue2" ,
		"reaxes-react" ,
		"reaxes-vue3" ,
		"reaxes-utils" ,
		"reaxes-toolkit" ,
		"reaxel-storage",
		"react",
		"vue"
	] ,
} as Configuration;

import * as path from "node:path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import CopyPlugin from 'copy-webpack-plugin'
import { Configuration } from 'webpack';
