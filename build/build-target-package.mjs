/**
 * 输入要打包的repoName,将其构建.返回promise
 */
import { packageList , rootPath } from './entrance.mjs';
import chalk from 'chalk';
import { webpack_promise , absProjectRootDir , absProjectRootFileURL } from './toolkit.mjs';
import { merge } from 'webpack-merge';
import { webpackBaseConfig } from './webpack.base.config.mjs';
import { webpackBuildConfig } from './webpack.build.config.mjs';
import webpack from 'webpack';
import { argv } from 'process';
import path from 'path';

/* X:/reaxes/build/    */
// const reaxesBuildDir = ;

const repoList = argv.slice( 2);

export const buildRepo = () => {
	const {} = webpack;
	/*检测输入的repoList是否都存在*/
	repoList.forEach((repo) => {
		if ( !packageList.includes(repo) ) {
			throw RangeError(`输入的repoName有误,请检查 ${repo} 是否存在`);
		}
	});
	return repoList.map(async (repo) => {
		// console.log(`../packages/${ repo }/webpack.partial.mjs`);
		const packagePath = path.join(absProjectRootDir,`packages/${ repo }`);
		const repoWebpackPartialConfig = (await import(path.join(absProjectRootFileURL,`packages/${repo}/webpack.partial.mjs`))).webpackConfig;
		const {entry,output} = repoWebpackPartialConfig;
		if(entry){
			repoWebpackPartialConfig.entry = path.resolve(packagePath,entry);
		}
		if(output?.path){
			repoWebpackPartialConfig.output.path = path.resolve(packagePath,output.path);
		}
		const webpackConfig = merge(webpackBaseConfig , repoWebpackPartialConfig , webpackBuildConfig);
		console.log(webpackConfig.output);
		webpack_promise(webpackConfig).then(({compiler ,stats}) => {
			if(stats.hasErrors()){
				throw stats.toJson().errors;
			}
			console.log(chalk.green(`package <${chalk.blue(repo)}> built successfully`));
			debugger;
		}).catch((e) => {
			console.log(chalk.bgRed(`package <${chalk.red(repo)}> built failed,please debug with --inspect-brk mode`));
			console.error(e);
		});
	})
};


buildRepo();


debugger;
