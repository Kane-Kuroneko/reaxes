/**
 * 包裹React路由组件
 * @example 
 * <Route element = {utils.withOutlet(<ACertainComponent/>)}/>
 */

import {
	Outlet ,
	useNavigate ,
	useParams ,
	useLocation,
	useSearchParams ,
	useHref,
	useRoutes ,
	UNSAFE_NavigationContext as NavigationContext,
	UNSAFE_RouteContext as RouteContext,
	UNSAFE_LocationContext as LocationContext,
} from 'react-router-dom';


export const useRouter = () => {
	return {
		navigate : useNavigate(),
		params : useParams(),
		location : useLocation(),
		
	};
}

export const withOutlet = ( ReactElement:React.ReactElement ) => {
	return <>
		{ReactElement}
		<Outlet />
	</>;
};
type routerProps = ReturnType<typeof useRouter>;
/**
 * @example
const Routing = utils.withRouter((routerProps) => (props) => {
	console.log(routerProps);
	return <>{routerProps.parmas.ID}</>
});
 
 */
export const withRouter = ( JSX : (routerProps:routerProps) => React.ReactNode&React.ReactElement ):React.ReactElement => {
	
	const routerProps = useRouter();
	return JSX(routerProps);
	
	// return ((props) => {
	// 	const routerProps = useWithRouter();
	// 	useEffect(() => {
	//		
	// 		return () => {
	// 			console.log( 'mmmmmmmmmmmmmmmmm' );
	// 		}
	// 	})
	// 	const C = ComponentWrapper(elementFunction(routerProps));
	// 	return <C {...props} key={1}/> 
	// });
};
