import {createApp} from 'vue3';
import Observer from 'mobx-vue-lite';
import App from './root.vue3.vue';

createApp(App).
use(Observer).
mount( '#reaxes-vue3-root' );
