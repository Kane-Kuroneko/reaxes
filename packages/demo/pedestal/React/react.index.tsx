import { createRoot } from 'react-dom/client';

import { HashRouter, Route, Routes } from 'react-router-dom';
import { routeMappingWithRC } from './route.mapping';
import { reaxel_router } from '../routing.reaxel';
import { Component, StrictMode } from 'react';

const Routing = reaxper( () => {
	const { pathId } = reaxel_router();
	
	console.log( pathId );
	
	
	return <HashRouter>
		<Routes>
			{ routeMappingWithRC.map( ( { id , path , RC } ) => {
				console.log(path);
				
				return <Route
					key = { id }
					path = {'/'+ path }
					element = { <RC /> }
				/>;
			} ) }
		</Routes>
	</HashRouter>;
} );

@reaxper
class Test extends Component {
	constructor( props ) {super( props );}
	
	state = {
		count : 0,
	};
	
	componentDidMount() {
		console.log( 1111111111 );
	}
	
	render() {
		
		const { pathId } = reaxel_router();
		const [count,setCount] = useState(0);
		
		return <div onClick = {() => setCount(count + 1)}>{ pathId }</div>;
	}
};

const root = createRoot( document.getElementById( 'reaxes-react-root' ) );
root.render(
	<>
		<Routing />
	</>,
);
