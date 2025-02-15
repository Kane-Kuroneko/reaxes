<template>
	<div @click="plus()">
		count : {{ count }}
	</div>
</template>

<script>
import { reaxper } from 'reaxes-vue2';
import { reaxel_counter } from 'src/counter/reaxel';

const reax_Counter = reaxel_counter(),{
	plus,
} = reax_Counter;
export default reaxper({
	name : "test-plugin",
	status(){
		return {
			count : reax_Counter.count,
		}
	},
	methods:{
		plus,
	},
	mounted(){
		console.log(22222222222222222);
	},
})
</script>
