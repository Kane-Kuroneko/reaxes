<script>
import { reaxper } from 'reaxes-vue3';
import { reaxel_counter } from '../reaxel';
const reax_count = reaxel_counter() , {
	plus ,
	minus,
} = reax_count;
export default reaxper({
	data(){
		const {count} = reaxel_counter();
		return {
			console,
			count,
		};
	},
	methods:{
		plus,
		minus,
	}
}); 

</script>
<template>
	<Observer>
		<div>
			<p>Vue3-options-count : {{ count }}</p>
			<button @click='plus()'>
				plus 1
			</button>
			<button @click='minus()'>
				minus 1
			</button>
		</div>
	</Observer>
</template>
