import {createApp} from 'vue3';
import { Plugin } from 'reaxes-vue3';
import App from './root.vue3.vue';

createApp(App).
use(Plugin).
mount( '#reaxes-vue3-root' );
