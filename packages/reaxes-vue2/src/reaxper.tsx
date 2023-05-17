export const reaxper = <T extends {}>(component:T):T => {
	return observer( component ) as T;
};


import { observer } from 'reaxes-vue2/libs/mobx-vue';
