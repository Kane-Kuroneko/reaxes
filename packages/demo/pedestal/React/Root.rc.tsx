export const Root = reaxper( () => {
	
	return <div>
		{routeWithRC.map(({name,path}) => <Entry key={path} name={name} path={path}/>)}
	</div>;
} );

const Entry = reaxper( ( { name , path , pathId } ) => {
	
	const { navigate } = reaxel_router();
	const navigateTo = useNavigate();
	
	
	return <p>
		<button
			onClick = { () => {
				navigateTo(path);
				navigate( name );
			} }
		>
			{ name }
		</button>
	</p>;
} );


const { routes } = reaxel_router();
const routeWithRC = routes.reduce((accu,item) => {
	accu.push({
		key : item.id ,
		name : item.id,
		path : item.path,
	});
	return accu;
},[]);
import { reaxel_router } from '../routing.reaxel';
import { useNavigate } from 'react-router-dom';
