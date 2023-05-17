const { routes } = reaxel_router();
export const routeMapping = {
	"root" : Root,
	"counter" : Counter,
	"tic-tac-toe" : TicTacToe,
};

export const routeMappingWithVMC = routes.reduce((accu,route) => {
	accu.push({
		...route,
		component : routeMapping[route.id],
	});
	return accu;
},[]);


import { reaxel_router } from '../routing.reaxel';

import Root from './Root.vue2.vue';
import Counter from 'src/counter/vue2/view.vue2.vue';
import TicTacToe from 'src/tic-tac-toe/vue2/view.vue2.vue';
