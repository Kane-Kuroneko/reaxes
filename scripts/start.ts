/**
 *
 */


const viewLibConf = {
	'react' : {
		dirName:'react.next@19.x',
		cmd : [ 'run' , `dev` ],
	} ,
	'vue2' : {
		cmd : [ 'run' , 'dev' ],
	} ,
	'vue3' : {
		cmd : [ 'run' , 'dev' ],
	} ,
}[viewLib];

const start = () => {
	const {dirName = viewLib , cmd} = viewLibConf;
	console.log(viewLib);
	const targetDir = path.join(absProjectRootDir , 'packages/demo/view-libs' , dirName);
	
	cp.spawn('npm' , cmd , {
		cwd : targetDir ,
		stdio : 'inherit' ,
		shell : process.platform === 'win32' ,
		env : {
			PORT : port.toString(),
		}
	});
	
};

start();

import path from "node:path";
import { port , viewLib  } from '../build-tools/entrance';
import { absProjectRootDir } from '../build-tools/toolkit';
import cp from 'node:child_process';
