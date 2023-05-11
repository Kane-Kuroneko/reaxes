import {createApp} from 'vue3';
import { Plugin } from 'reaxes-vue3';
import App from './root.vue3.vue';

createApp(App).
use({
	install(app,options){
		console.log(app);
	}
}).
mount( '#reaxes-vue3-root' );
