<script lang = 'ts'>
import { reaxel_router } from '../routing.reaxel';
import { reaxper } from 'reaxes-vue2';
import { defineComponent } from 'vue';
import { routeMapping } from './route.mapping';

const { routes } = reaxel_router();
const routeWithVM = routes.reduce( ( accu , item ) => {
	accu.push( {
		...item ,
	} );
	return accu;
} , [] );
console.log( routeWithVM );
const reaxRouter = reaxel_router();
export default reaxper(defineComponent({
	data() {
		return {
			routeWithVM ,
			pathId : reaxRouter.pathId ,
		};
	} ,
	methods : {
		navigate : reaxRouter.navigate ,
	} ,
}));
</script>
<template>
	<div>
		<p
			v-for = 'item in routeWithVM'
			:key = 'item.id'
		>
			<button @click = 'navigate(item.id)'>
				{{ item.id }}
			</button>
		</p>
	</div>
</template>
