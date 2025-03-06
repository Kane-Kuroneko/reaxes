import { fileURLToPath , URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import vueDevTools from 'vite-plugin-vue-devtools';

// https://vite.dev/config/
export default defineConfig({
	plugins : [
		vue() ,
		vueJsx() ,
		vueDevTools() ,
	] ,
	esbuild:{
		loader : "ts",
	},
	resolve : {
		alias : {
			'@' : fileURLToPath(new URL('./src' , import.meta.url)) ,
			'reaxes' : fileURLToPath(new URL('../../../reaxes' , import.meta.url)) ,
			'reaxes-vue3' : fileURLToPath(new URL('../../../reaxes-vue3' , import.meta.url)) ,
			'reaxes-utils' : fileURLToPath(new URL('../../../reaxes-utils' , import.meta.url)) ,
		} ,
	} ,
	server:{
		port : parseInt(process.env.PORT!) || 5173
	}
});
