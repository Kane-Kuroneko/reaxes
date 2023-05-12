/**
 * 为demo提供路由逻辑
 */
export const reaxel_router = reaxel(() => (navigateTo) => {
	const {store,setState} = orzMobx({
		routes : {
			
		},
	});
	
	return () => {
		return {
			routes ,
		}
	}
});


const reaxelRouterReact = reaxel_router(() => {});

const El = reaxper(() => {
	const { navigateTo  } = useRouter( {} );
	
	return <div
		onClick= {() => navigateTo('./')}
	>
	
	</div>;
});
