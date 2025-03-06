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
		{
			path : "/tic-tac-toe",
			id : "tic-tac-toe",
		},
		{
			path : "/complex-todo",
			id : "complex-todo",
		},
		{
			path : "/vue2-watch",
			id : "vue2-test-watch",
		},
	] as Array<RouteUnit>;
	
	const {store,setState} = createReaxable({
		pathId : 'root',
	});
	
	const navigate = (id) => {
		// setState( { pathId : id } );
		// window.location.pathname = routes.find((unit) => unit.id === id ).path;
		location.hash = routes.find((unit) => unit.id === id ).path
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
