import { render } from 'react-dom';
import { BrowserRouter , Route , Routes,createBrowserRouter } from 'react-router-dom';
import { Demo$state } from 'src/state';
import {} from 'src/intro';
import { Counter } from 'src/counter/react/view';
import {} from 'src/multi-reaxels';
import {} from 'src/test-unmount';
import { TimeMachineTest } from 'src/time-machine';
import { routeMappingWithRC } from './route.mapping';
import { reaxel_router } from '../routing.reaxel';

const Routing = reaxper( () => {
	const { pathId } = reaxel_router();
	
	console.log(pathId);
	
	return <BrowserRouter>
		<Routes>
			{routeMappingWithRC.map(({id,path,RC}) => <Route
				key={id}
				path={path}
				element={<RC/>}
			/>)}
		</Routes>
	</BrowserRouter>;
} );


render(
	<Routing /> ,
	document.getElementById( 'reaxes-react-root' ) ,
);

if (module.hot) { module.hot.accept( function () { location.reload(); } ); }
