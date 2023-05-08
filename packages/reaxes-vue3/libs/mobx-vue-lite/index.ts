import type { App } from 'vue';
import { createGlobalState as createGlobalObservable } from '@vueuse/core';
import Observer from './ObserverComponent';
import { useLocalObservable } from './use-local-observable';

export const Plugin = {
	install : ( app: App ) => {
		app.component( 'Observer' , Observer );
	} ,
};

export {
	Observer ,
	useLocalObservable ,
	createGlobalObservable ,
};
