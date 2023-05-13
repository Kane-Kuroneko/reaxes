const { routes } = reaxel_router();

export const routeMapping = {
	"root" : Root,
	"counter" : Counter,
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
