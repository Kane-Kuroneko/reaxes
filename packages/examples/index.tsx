import {
	Reaxper ,
	Reaxlass ,
	orzMobx ,
	Reaxes ,
} from '../core/index';
// } from '../../npm/dist/reaxes.min';
import { render } from 'react-dom';
import {Test_Reaxel_i18n as UmountTest} from './test-unmount/index';
import { Test_State } from './state';

render(
	<Test_State /> ,
	document.getElementById( 'react-app-root' ) ,
);
