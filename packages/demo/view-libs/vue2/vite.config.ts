import { fileURLToPath , URL } from 'node:url';
import path from 'node:path'
import { defineConfig } from 'vite';
import legacy from '@vitejs/plugin-legacy';
import vue2 from '@vitejs/plugin-vue2';
import vue2Jsx from '@vitejs/plugin-vue2-jsx';

// https://vitejs.dev/config/
export default defineConfig({
	plugins : [
		vue2() ,
		vue2Jsx() ,
		legacy({
			targets : [ 'ie >= 11' ] ,
			additionalLegacyPolyfills : [ 'regenerator-runtime/runtime' ] ,
		}) ,
	] ,
	esbuild: {
		loader : "ts"
	},
	resolve : {
		alias : {
			'@' : fileURLToPath(new URL('./src' , import.meta.url)) ,
			'reaxes' : fileURLToPath(new URL('../../../reaxes' , import.meta.url)),
			'reaxes-vue2' : fileURLToPath(new URL('../../../reaxes-vue2' , import.meta.url)),
		} ,
	} ,
	server:{
		port : parseInt(process.env.PORT!) || 5172
	}
});

console.log(fileURLToPath(new URL('../../../reaxes' , import.meta.url)));
