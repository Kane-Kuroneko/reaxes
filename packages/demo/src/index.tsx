import { render } from 'react-dom';
import {BrowserRouter,Route,Routes} from 'react-router-dom';
import { Demo$state } from './state';
import {} from './intro';
import {} from './counter';
import {} from './multi-reaxels';
import {} from './test-unmount';
import {} from './';


console.log(toolkit,utils);
console.log(crayon);
console.log(null);

const mapping = [
	{
		name:"state",
		path:"/state",
		Component:Demo$state
	}
];

const Routing = reaxper( () => {
	
	return <BrowserRouter>
		<Routes>
			<Route path="/*" element = { <Home/> } />
			{mapping.map(({path,Component}) => <Route
				key={path}
				path={path}
				element={<Component/>}
			/>)}
		</Routes>
	</BrowserRouter>;
} );

const Home = reaxper( () => {
	
	return <div>
		{mapping.map(({name,path}) => <Entry key={path} name={name}/>)}
	</div>;
} );

const Entry = reaxper(({ name}) => {
	const { navigate } = toolkit.useRouter();
	return <p>
		<span>22222222</span>
		<button 
			onClick = { () => navigate( `/${ name }` ) }
		>
			{ name }
		</button>
	</p>;
});



render(
	<Routing /> ,
	document.getElementById( 'react-app-root' ) ,
);

if (module.hot) { module.hot.accept( function () { location.reload(); } ); }
