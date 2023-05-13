const component = defineComponent({
	template : `
		<ul>
			<li>
				<button @click='$router.push("/counter")'>
					counter
				</button>
			</li>
</ul>
	`,
});

const routes = [
	{ path: '/', component },
	{ path: '/counter', component: Vue2_Counter },
	{ path: '/tic-tac-toe', component: Vue2_TicTacToe }
];
const router = new VueRouter( {
	mode: 'history',
	routes, 
} );
import { RouterLink } from 'vue2-router';
utils.asyncCall(() => {
	Vue.config.productionTip = false;
	Vue.use(VueRouter);
	new Vue({
		router,
		el : "#reaxes-vue2-root-container",
		render(h){
			return h(RouterView);
		},
	});
});
import RouterView from './router.vue2.vue';
import Vue2_Counter from './counter/vue2/view.vue2.vue';
import { Vue2_TicTacToe } from './tic-tac-toe/vue2';
import VueRouter from 'vue2-router';
import Vue , {defineComponent} from 'vue';
