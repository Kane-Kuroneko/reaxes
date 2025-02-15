
export const vue3_webpack_config = {
	
	module : {
		rules : [
			{
				test : /\.vue3\.vue$/i,
				loader : "vue3-vue-loader"
			},
			/*for .vue configuration*/
			{
				test : /(\.vue3\.vue\.js)$/i ,
				use : {
					loader : 'babel-loader' ,
					options : {
						...babelConfigFn('vue3') ,
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

import { VueLoaderPlugin } from 'vue3-vue-loader';
import { babelConfigFn } from '../../babel.config.mjs';
import {vue as env_vue} from '../../entrance.mjs';
