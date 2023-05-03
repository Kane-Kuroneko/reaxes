/**
 * cover vue
 * 覆盖node_modules下的vue文件,
 */
!function (){
	const cover_vue_path = path.join(absProjectRootDir , 'build/vue/cover-vue-loader');
	const destination_path = path.join(absProjectRootDir , 'node_modules');
	fs.cpSync(cover_vue_path,destination_path,{recursive:true,force:true});
}();

import path from 'path';
import fs from 'fs';
import {absProjectRootDir} from '../../toolkit.mjs';
