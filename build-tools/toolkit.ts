/* reaxes目录的绝对路径,返回F:/reaxes/   */
export const absProjectRootDir = path.join(path.dirname(fileURLToPath(import.meta.url)) , "../");

/*reaxes目录的文件路径,返回file:///F:/reaxes/     */
export const absProjectRootFileURL = pathToFileURL(path.join(path.dirname(fileURLToPath(import.meta.url)) , '../')).href;

/*封装webpack回调为promise*/
export const webpack_promise = ( config: Configuration ) => {
	return new Promise<{ compiler: Compiler, stats: Stats }>(( resolve , reject ) => {
		const compiler = webpack(config , ( error , stats ) => {
			if( error ) {
				reject(error);
			} else if( stats.hasErrors() ) {
				reject(stats.toJson().errors);
			} else {
				resolve({ compiler , stats });
			}
		});
	});
};

/*返回本机的ipv4局域网地址*/
export const getIPV4address = () => {
	const network = os.networkInterfaces();
	
	for( const i in network ){
		for( const val of network[i] ){
			if( val.netmask === "255.255.255.0" &&
				val.address.startsWith('192.168')
			) {
				return val.address;
			}
		}
	}
	return '127.0.0.1';
};

/*自动检查basePort的端口是否可用, 如果不可用则寻找相邻的可用端口作为wds服务器端口*/
export const getPort = ( port ) => {
	portfinder.basePort = parseInt(port) || 3000;
	return portfinder.getPortPromise();
};

/*根据参数值来映射出相应参数名*/
export const argvMapper = <Rtn>(
	params ,
	processer: {
		regExp?: { test: ( s: string ) => boolean },
		choices?: string[],
		key: string,
	}[] ,
): Rtn => {
	return params.reduce(( accumulator: Rtn , current ) => {
		processer.forEach(( {
			regExp ,
			key ,
			choices = [] ,
		} ) => {
			switch( true ) {
				case choices.includes(current):
				case regExp?.test(current): {
					accumulator[key] = current;
				}
			}
		});
		return accumulator;
	} , {});
};

//是否是多层子包
export const isSubpackage = ( packageName: string ) => {
	return packageName.includes('/');
};

//根据entrance::packige查找到该子包的绝对路径.parseSubpackagePath('refaxels/i18n') => 'Z:\reaxes\packages\refaxels\packages\i18n'
export const parseSubpackagePath = (
	subpackageName: string ,
) => {
	if( !subpackageName.includes('/') ) {
		throw new Error('subpackageName参数必须是reaxels/lottie这样的格式');
	}
	const subpackagePath = subpackageName.split('/');
	
	const recursive = ( dir: string , layer: number ): string => {
		const currentDirs = fs.readdirSync(dir);
		
		if( currentDirs.includes(subpackagePath[layer]) ) {
			//查找结束,这一层就是想要的包的路径
			if( layer === subpackagePath.length - 1 ) {
				const target = path.join(dir , subpackagePath[layer]);
				if( !fs.readdirSync(target).includes('package.json') ) {
					console.warn(chalk.bgHex('#ffd699')(`This dir do not includes 'package.json', make sure it's a package dir rather than a container.`));
				}
				return target;
			} else {
				return recursive(path.join(dir , subpackagePath[layer] , 'packages') , layer + 1);
			}
		} else {
			throw new Error(`subpackage not found: ${ subpackageName }`);
		}
	};
	return recursive(path.join(absProjectRootDir , 'packages') , 0);
};

export const warn = ( ...text: string[] ) => {
	console.warn(chalk.bgHex('#ffd699')(...text));
};

export const packigesMatcher = {
	//除了choices之外,还匹配例如<reaxels/browser-persist>或<refaxels/lottie>等子库
	key : "packige" as const ,
	regExp : /\bre((f?a)|(te))xels\/[\s\S]+\b/ ,
	choices : [
		'demo' ,
		'reaxes' ,
		'reaxes-react' ,
		'reaxes-vue2' ,
		'reaxes-vue3' ,
		'reaxes-angular' ,
		'reaxes-toolkit' ,
		'reaxes-utils' ,
	] ,
};

export type Packige =
	| 'reaxes'
	| 'reaxes-react'
	| 'reaxes-vue2'
	| 'reaxes-vue3'
	| 'reaxes-angular'
	| 'reaxes-toolkit'
	| 'reaxes-utils'
	| string&{};

import webpack , { Compiler , Configuration , Stats } from 'webpack';
import { fileURLToPath , pathToFileURL } from 'url';
import path from 'node:path';
import portfinder from 'portfinder';
import chalk from 'chalk';
import os from 'os';
import fs from 'node:fs';
