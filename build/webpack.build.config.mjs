export default {
	
	optimization: {
		chunkIds: "named" ,
		splitChunks : {
			chunks : 'all' ,
		},
	},
	plugins : [
		new CleanWebpackPlugin(),
		new CompressionWebpackPlugin({}),
	],
}

import CompressionWebpackPlugin from 'compression-webpack-plugin';

import { CleanWebpackPlugin } from 'clean-webpack-plugin';
