import path from "node:path";
import { fileURLToPath ,pathToFileURL} from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const absRepoRootDir = path.join(__dirname,'../');

const build = async () => {
	if(isSubpackage(packige)){
		var targetDir = parseSubpackagePath(packige);
	}else {
		targetDir = path.join(absProjectRootDir , 'packages' , packige);
	}
	
	/**
	 * 要在Terminal中打印路径并实现点击跳转,必须是相对路径并且带行号
	 * 比如:consoloe.log('packages/reaxes/src/index.tsx:1:0');
	 */
	const outputRelativeDir = path.join(pathToFileURL(targetDir).href , 'dist');
	const files = fs.readdirSync(targetDir);
	
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
		path.relative(`Z:/reaxes/packages/reaxes-react/dist`,`Z:/reaxes/`)
		console.log(chalk.green(`\n\n${ packige }打包成功,在${outputRelativeDir}查看`));
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
