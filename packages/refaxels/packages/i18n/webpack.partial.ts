import * as path from "node:path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

import { Configuration } from 'webpack';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const entries = {
	'index' : path.join(__dirname,'src/index'),
	'views/react' : path.join(__dirname , 'src/views/react/index')
};

export default {
	entry : entries,
	output : {
		path : path.join(__dirname , 'dist' ),
		filename(pathData){
			const name = pathData.chunk.name;
			if(!name){
				console.log(pathData.chunk);
			}
			if(Object.keys(entries).includes(name)){
				
				return {
					'index' : 'esm/index.js',
					'views/react' : 'esm/views/react/index.js'
				}[name]
			}
			else {
				return `[name].js`
			}
		}
	}
} as Configuration;

