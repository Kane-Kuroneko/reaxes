/**
 * 输入要打包的repoName,将其构建.返回promise
 */
import { repoPackages } from './entrance.mjs';
export const buildRepo = async () => {
	/*检测输入的repoList是否都存在*/
	repoList.forEach((repo) => {
		if ( !repoPackages.includes(repo) ) {
			throw RangeError(`输入的repoName有误,请检查 ${repo} 是否存在`);
		}
	});
	return repoList.map(async (repo) => {
		const repoWebpackPartialConfig = (await import(`../packages/${repo}`))
	})
};



const repoList = argv.slice( 2);
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
