import path from "node:path";

const build = async () => {
	if(isSubpackage(packige)){
		var targetDir = parseSubpackagePath(packige);
	}else {
		targetDir = path.join(absProjectRootDir , 'packages' , packige);
	}
	
	const files = fs.readdirSync(targetDir);
	console.log(files);
	if(files.includes('webpack.partial.ts')){
		var partialConf: Configuration = ( await import(path.join('file://',targetDir , 'webpack.partial.ts')) ).default;
		var finalWebpackConf = merge(
			webpackBaseConfig ,
			webpackBuildConfig ,
			webpackLibsConf,
			partialConf,
		);
	}
	console.log(finalWebpackConf);
	await webpack_promise(finalWebpackConf).then(( { stats } ) => {
		console.clear();
		console.log(chalk.green(`\n\n${ packige }打包成功,在${pathToFileURL(path.join(targetDir,'dist'))}查看`));
	}).catch(e => {
		console.error(chalk.white.bgRed(`打包失败:\n`));
		console.error(e);
	});
}


try {
	await build();
}catch ( e ) {
	console.log(1111111111,e);
}
import chalk from 'chalk';
import {webpackBaseConfig} from '../build-tools/webpack.base.config';
import {webpackBuildConfig} from '../build-tools/webpack.build.config';
import { webpackLibsConf } from '../build-tools/webpack.libs.conf.ts';
import { merge } from 'webpack-merge';
import _ from 'lodash';
import { Configuration } from 'webpack';
import {packige,EntranceType,} from '../build-tools/entrance';
import { absProjectRootDir , warn , parseSubpackagePath , isSubpackage , webpack_promise } from '../build-tools/toolkit';
import fs from "node:fs";
import { pathToFileURL } from 'node:url';
