/**
 * 输入要打包的repoName,将其构建.返回promise
 */
import { repoPackages } from './entrance.mjs';
import chalk from 'chalk';
import { webpack_promise } from './toolkit.mjs';
import { merge } from 'webpack-merge';
import { webpackBaseConfig } from './webpack.base.config.mjs';
import { webpackBuildConfig } from './webpack.build.config.mjs';
import webpack from 'webpack';
import { argv } from 'process';
import path from 'path';

const repoList = argv.slice( 2);
export const buildRepo = () => {
	const {} = webpack;
	/*检测输入的repoList是否都存在*/
	repoList.forEach((repo) => {
		if ( !repoPackages.includes(repo) ) {
			throw RangeError(`输入的repoName有误,请检查 ${repo} 是否存在`);
		}
	});
	return repoList.map(async (repo) => {
		// console.log(`../packages/${ repo }/webpack.partial.mjs`);
		const packagePath = path.resolve(`../packages/${ repo }`);
		const repoWebpackPartialConfig = (await import(`../packages/${ repo }/webpack.partial.mjs`)).webpackConfig;
		const {entry,output} = repoWebpackPartialConfig;
		if(entry){
			repoWebpackPartialConfig.entry = path.resolve(packagePath,entry);
		}
		if(output?.path){
			repoWebpackPartialConfig.output.path = path.resolve(packagePath,output.path);
		}
		/* TEST */repoWebpackPartialConfig.output.path = `F:\\reaxes\\packages\\reaxes-react\\dist`;/*TEST*/
		const webpackConfig = merge(webpackBaseConfig , repoWebpackPartialConfig , webpackBuildConfig);
		webpack_promise(webpackConfig).then((stats , error) => {
			// console.log(stats , error);
			if(error){
				throw error;
			}
			if(stats.hasErrors()){
				throw  stats.toJson().errors;
			}
			console.log(chalk.green(`package built successful`));
			debugger;
		}).catch((e) => {
			console.error(e);
		});
	})
};


buildRepo();


debugger;
