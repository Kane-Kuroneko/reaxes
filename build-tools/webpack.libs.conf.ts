/**
 * 打包为库的配置
 */
export const webpackLibsConf:Configuration = {
	output:{
		library:{
			type : "module",
		},
		libraryTarget:"module",
		environment:{
			module:true,
		}
	},
	experiments:{
		outputModule:true
	},
	devtool : 'source-map' ,
	mode : 'production',
	externals : ['reaxes' , 'react' , 'react-dom' , 'react-router' , 'react-router-dom' , 'lodash' , 'mobx' , 'shallowequal'] ,
};


import { Configuration } from 'webpack';
