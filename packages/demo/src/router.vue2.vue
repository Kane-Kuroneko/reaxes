<script lang='ts'>
import { reaxel_router } from '../pedestal/routing.reaxel';
import { reaxper } from 'reaxes-vue2';
import {defineComponent} from 'vue2';

export default reaxper(defineComponent({
	data(){
		const { pathId } = reaxel_router();
		return {
			pathId,
		};
	},
}));
</script>

<template>
	<div :id='pathId'>
		<router-view></router-view>
	</div>
</template>
