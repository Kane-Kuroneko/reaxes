const { routes } = reaxel_router();

export const routeMapping = {
	"root" : Root,
	"counter" : Counter,
	"tic-tac-toe" : RC_tic_tac_toe,
	"complex-todo" : RC_Complex_Todo,
};

export const routeMappingWithRC = routes.reduce((accu,item) => {
	accu.push({
		...item,
		RC : routeMapping[item.id]
	});
	return accu;
},[]);

import { reaxel_router } from '../routing.reaxel';
import { Root } from './Root.rc';
import { Counter } from 'src/counter/react/view';
import { RC_tic_tac_toe } from 'src/tic-tac-toe/react';
import { RC_Complex_Todo } from 'src/complex-todo/react/index.rc';
