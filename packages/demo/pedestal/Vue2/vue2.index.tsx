import { routeMappingWithVMC } from './route.mapping';
// import { Vue2_TicTacToe } from './tic-tac-toe/vue2';
import VueRouter from 'vue2-router';
// @ts-expect-error
import Vue from 'vue';
import PluginTest from 'src/test-vue2-plugin/index';
import Root from './Root.vue2.vue';

const router = new VueRouter( {
	mode: 'history',
	routes:routeMappingWithVMC,
} );

utils.asyncCall(() => {
	Vue.config.productionTip = false;
	Vue.use(VueRouter);
	new Vue({
		router,
		el : "#reaxes-vue2-root-container",
		render(h){
			return h(RouterRoot);
		},
	});
});

Vue.use(PluginTest);

const RouterRoot = {
	template : `<router-view></router-view>`,
};
