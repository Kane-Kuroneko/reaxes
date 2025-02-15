
export const vue2_webpack_config = {
	
	module : {
		rules : [
			{
				test : /\.vue2\.vue$/i,
				loader : "vue2-vue-loader"
			},
			/*for .vue configuration*/
			{
				test : /(\.vue2\.vue\.js)$/i ,
				use : {
					loader : 'babel-loader' ,
					options : {
						...babelConfigFn('vue2') ,
					} ,
				} ,
				exclude : [
					/node_modules/ ,
				] ,
			} ,
		] ,
	},
	plugins : [
		new VueLoaderPlugin(),
	],
};

import { VueLoaderPlugin } from 'vue2-vue-loader';
import { babelConfigFn } from '../../babel.config.mjs';
import {vue as env_vue} from '../../entrance.mjs';
