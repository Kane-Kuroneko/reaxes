import path from "node:path";
import { fileURLToPath ,pathToFileURL} from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if(isSubpackage(packige)){
	var targetDir = parseSubpackagePath(packige);
}else {
	targetDir = path.join(absProjectRootDir , 'packages' , packige);
}

const build = async () => {
	
	/**
	 * 要在Terminal中打印路径并实现点击跳转,必须是相对路径并且带行号
	 * 比如:consoloe.log('packages/reaxes/src/index.tsx:1:0');
	 * 要打印路径跳转则必须是posix风格的绝对路径
	 * 比如:console.log("file:///Z:/reaxes/packages/reaxes-utils/");
	 */
	const outputRelativeDir = pathToFileURL(win32ToPosix(targetDir)).href;
	console.log(outputRelativeDir);
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
	// console.log(finalWebpackConf);
	await webpack_promise(finalWebpackConf).then(( { stats } ) => {
		// console.clear();
		
		console.log(chalk.green(`\n\n${ packige }打包成功,在${outputRelativeDir}`));
	}).catch(e => {
		console.error(chalk.white.bgRed(`打包失败:\n`));
		console.error(e);
	});
}

const tsc = async () => {
	return new Promise((resolve, reject) => {
		exec('tsc' , {
			cwd : targetDir,
		} , (error, stdout, stderr) => {
			if (error) {
				console.error(chalk.red(stdout));
				reject(error);
				return;
			}
			resolve(stdout || stderr);
			console.log(chalk.greenBright('tsc类型编译完成'));
		});
	});
}
const posixToWin32 = (posixPath: string): string => {
	return path.win32.join(...posixPath.split(path.posix.sep));
};
const win32ToPosix = (win32Path: string): string => {
	return path.posix.join(...win32Path.split(path.win32.sep));
};
try {
	await build();
	await tsc();
}catch ( e ) {
	console.error(1111111111,e);
}

import chalk from 'chalk';
import {webpackBaseConfig} from '../build-tools/webpack.base.config';
import {webpackBuildConfig} from '../build-tools/webpack.build.config';
import { webpackLibsConf } from '../build-tools/webpack.libs.conf.ts';
import { merge } from 'webpack-merge';
import _ from 'lodash';
import { Configuration } from 'webpack';
import {packige,EntranceType,} from '../build-tools/entrance';
import { absProjectRootDir,warn , parseSubpackagePath , isSubpackage , webpack_promise } from '../build-tools/toolkit';
import fs from "node:fs";
import { exec } from 'node:child_process';
