/**
 * 此脚本用于发布已打包好的npm包,并自动修改版本号发布至npm
 */
const args = process.argv.slice(2);

const {
	tag ,
	releaseType ,
	packige ,
} = argvMapper<Arg>(args , [
	{
		key : 'tag' ,
		choices : [ 'alpha' , 'beta' , 'latest' , 'next' , 'rc' , 'dev' ] as NpmTag[] ,
		
	} ,
	{
		key : 'releaseType' ,
		choices : [ "major" , "premajor" , "minor" , "preminor" , "patch" , "prepatch" , "prerelease" ] ,
	} ,
	packigesMatcher ,
]);
const publish = async() => {
	let command = `npm publish`;
	if(!packige){
		throw new Error('是不是忘了输入要发布的包名?');
	}
	if(tag){
		command += ` --tag ${tag}`;
	}
	const targetPath = isSubpackage(packige) ?
		path.join(parseSubpackagePath(packige) , 'dist') :
		path.join(absProjectRootDir , `packages/${ packige }/dist`);
	
	//修改dist中的
	if(releaseType || tag){
		var packageJsonPath = path.join(targetPath , 'package.json');
		var packageJsonStr = fs.readFileSync(packageJsonPath , { encoding : 'utf-8' });
		var packageJsonObj = JSON.parse(packageJsonStr) as PackageJson;
		var { version : versionStr } = packageJsonObj;
		var semverResult = semver.parse(versionStr);
		semverResult.inc(releaseType,tag)
		packageJsonObj.version = semverResult.format();
		
		fs.writeFileSync(packageJsonPath,JSON.stringify(packageJsonObj,null,3));
	}
	
	const child = cp.spawn(command, { cwd: targetPath, shell: true });
	
	child.stdout.on('data', (data) => {
		process.stdout.write(data); // 实时打印
	});
	
	child.stderr.on('data', (data) => {
		process.stderr.write(data); // 实时打印错误信息
	});
	
	child.on('close', (code) => {
		if(!code && (releaseType || tag)){
			fs.writeFileSync(
				path.join(targetPath,'../publish/package.json'),
				JSON.stringify(packageJsonObj,null,'\t'),
			);
			console.log(chalk.greenBright(`${packige}@${packageJsonObj.version}发布成功!已修改publish/package.json为当前版本号`));
		}
	});
};

publish();

type NpmTag = 'latest' | 'next' | 'beta' | 'alpha' | 'rc' | 'dev' | string & {};
type Arg = {
	tag: NpmTag,
	releaseType: ReleaseType,
	packige: Packige,
};

import { absProjectRootDir , argvMapper , isSubpackage , Packige , packigesMatcher , parseSubpackagePath } from '../build-tools/toolkit';
import { PackageJson } from 'package-json';
import chalk from 'chalk';
import semver , { ReleaseType } from 'semver';
import path from 'node:path';
import cp from 'node:child_process';
import fs from "node:fs";
