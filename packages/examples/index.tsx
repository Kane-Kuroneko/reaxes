import {
	Reaxper ,
	Reaxlass ,
	orzMobx ,
	Reaxes ,
} from '../core/index';
// } from '../../npm/dist/reaxes.min';
import { render } from 'react-dom';
import {Test_Reaxel_i18n as UmountTest} from './test-unmount/index';


export const App = UmountTest;


render(
	<App /> ,
	document.getElementById( 'react-app-root' ) ,
);
