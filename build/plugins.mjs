import chalk from 'chalk';
import dayjs from 'dayjs';
import {
	getIPV4address ,
	getPort,
} from './utils.mjs';



const port = await getPort();

/**
 * 每次打包完成后输出日志
 */
export class LogAtSucceed {
	env = null;
	constructor (env = "production") {
		this.env = env;
	}
	
	count = 0;
	
	onFail = (error) => {
		console.log(chalk.red(`compiled failed at ${ dayjs().format("HH:mm:ss") }\n\r`));
	};
	
	apply (compiler) {
		this.count ++;
		compiler.hooks.done.tap('LogAtSucceed' , (stats) => {
			
			if ( stats.hasErrors() ) {
				return this.onFail(stats);
			}
			const whisper = this.env === "production" ? "" : ` , host : https://${ getIPV4address() }:${port}\n\r`;
			console.log(chalk.green(`compiled successfully at ${ dayjs().format("HH:mm:ss") }${whisper}`));
		});
		compiler.hooks.failed.tap('LogAtSucceed' , (error) => {
			this.onFail(error);
		});
	}
}
