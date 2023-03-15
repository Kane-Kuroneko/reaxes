// 
// 构建目标package时,先串行打包base packages
// 
// 
// 
// 


/**/
const baseRepos = argv.slice( 2);
const {} = webpack;



const compilersPromiseList = baseRepos.map(async (repo) => {
	const repoPartialWebpackConfig = async () => {
		try {
			return (await import(`../packages/${repo}/webpack.partial.mjs`)).webpackConfig
		}catch ( e ) {
			return {};
		}
	};
	const webpackBuildConfigWithRepo = merge()
	return webpack_promise()
})

import { webpack_promise } from 'build/toolkit.mjs';
import { merge } from 'webpack-merge';
import { webpackBaseConfig } from './webpack.base.config.mjs';
import { webpackBuildConfig } from './webpack.build.config.mjs';
import webpack from 'webpack';
import {argv} from 'process';
