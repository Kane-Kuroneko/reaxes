export const reaxper = <T extends any>(component:T):T => {
	return observer( component ) as unknown as T;
};


import { observer } from '../libs/mobx-vue';
import type {Component} from 'vue/types';
