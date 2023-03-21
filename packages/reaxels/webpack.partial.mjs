import webpack from 'webpack';
import portfinder from 'portfinder';
import { fileURLToPath } from 'url';
import path from 'path';
import CopyWebpackPlugin from 'copy-webpack-plugin';

const {
	DefinePlugin ,
	ProvidePlugin,
} = webpack;

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname , '../../');

export const webpackConfig = {/*be dynamic imported*/
	entry : './src/index.tsx' ,
	output : {
		libraryTarget : 'module' ,
		module : true ,
		path : path.resolve(__dirname , 'dist') ,
		filename : 'index.js' ,
	} ,
	devtool : 'source-map' ,
	experiments : {
		outputModule : true ,
	} , // stats : 'errors-only' ,
	externals : ['reaxes' , 'react' , 'react-dom' , 'react-router' , 'react-router-dom' , 'lodash' , 'mobx' , 'shallowequal'] ,
	mode : 'production' ,
	performance : {
		maxEntrypointSize : 10000000 ,
		maxAssetSize : 30000000 ,
	} ,
	plugins : [
		getProvidePlugin() ,
		new CopyWebpackPlugin({
			patterns : [
				{
					from : path.resolve(__dirname,'./public/package.json') ,
					to : path.resolve(__dirname,'./dist/package.json') ,
				} ,
			] ,
		}) ,
	] ,
};

function getProvidePlugin () {
	return new ProvidePlugin({
		_ : ['lodash'] ,
		React : ['react'] ,
		useState : ['react' , 'useState'] ,
		useEffect : ['react' , 'useEffect'] ,
		useRef : ['react' , 'useRef'] ,
		useLayoutEffect : ['react' , 'useLayoutEffect'] ,
		useMemo : ['react' , 'useMemo'] ,
		useCallback : ['react' , 'useCallback'] ,
		orzPromise : ['reaxes-utils' , 'orzPromise'] ,
		utils : ['reaxes-utils'] ,
		crayon : ['reaxes-utils' , 'crayon'] ,
	});
}
