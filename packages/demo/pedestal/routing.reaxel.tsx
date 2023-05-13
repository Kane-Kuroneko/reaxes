/**
 * 为demo提供路由逻辑
 */
export const reaxel_router = reaxel(() => {
	const routes = [
		{
			path : "/",
			id : "root",
		},
		{
			path : "/counter",
			id : "counter",
		},
	] as Array<RouteUnit>;
	
	const {store,setState} = orzMobx({
		pathId : 'root',
	});
	
	const navigate = (id) => {
		setState( { pathId : id } );
	};
	
	addEventListener( 'popstate' , ( e ) => {
		setState( {
			pathId : routes.find( ( { path } ) => location.pathname === path ).id ?? '/' ,
		} );
	} );
	
	Reaxes.obsReaction(() => {
		crayon.orange( 'pathId:' , store.pathId );
	},() => [store.pathId]);
	
	return () => {
		return {
			get pathId(){
				return store.pathId;
			},
			routes ,
			navigate ,
		};
	};
});

interface RouteUnit {
	path : string,
	id : string,
	exact? : boolean ,
	children? : Array<RouteUnit>
}
