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
		choices : [ 'alpha' , 'beta' ] ,
	} ,
	{
		key : 'releaseType' ,
		choices : [ "major" , "premajor" , "minor" , "preminor" , "patch" , "prepatch" , "prerelease" ] ,
	} ,
	packigesMatcher ,
]);
const publish = async() => {
	let command = `npm publish`;
	if( tag ) {
		command += ` --tag ${ tag }`;
	}
	
	const targetPath = isSubpackage(packige) ?
		path.join(parseSubpackagePath(packige) , 'dist') :
		path.join(absProjectRootDir , `packages/${ packige }/dist`);
	
	const packgeJsonContent = fs.readFileSync(path.join(targetPath , 'package.json') , { encoding : 'utf-8' });
	console.log(packgeJsonContent);
	const { version : versionStr } = JSON.parse(packgeJsonContent) as PackageJson;
	console.log(versionStr,22222222);
	const version = semver.parse(versionStr);
	console.log(version.inc(releaseType,),33333333);
	
	cp.execSync(command , {
		cwd : targetPath ,
		stdio : 'inherit' ,
	});
};
publish();

type NpmTag = 'latest' | 'next' | 'beta' | 'alpha' | 'rc' | 'dev' | string & {};
type Arg = {
	tag: 'alpha' | 'beta' | void,
	releaseType: ReleaseType,
	packige: Packige,
};
import { PackageJson } from 'package-json';
import { absProjectRootDir , isSubpackage , Packige , parseSubpackagePath } from '../build-tools/toolkit';
import cp from 'child_process';
import { argvMapper , packigesMatcher } from '../build-tools/toolkit';
import path from 'node:path';
import semver , { ReleaseType } from 'semver';
import fs from "node:fs";
