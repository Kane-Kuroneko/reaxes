import Component from 'src/test-vue2-plugin/index.vue2.vue';
import { reaxel_counter } from 'src/counter/reaxel';
export default {
	install(Vue){
		const instance = new Component;
		instance.$mount(document.createElement('div'));
		document.getElementById('reaxes-vue2-root').appendChild(instance.$el);
		Vue.prototype.$plus = () => {
			console.log(222222222);
			reaxel_counter().plus();
		}
	}
}
