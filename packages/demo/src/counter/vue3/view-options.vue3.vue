<script>
import {} from 'reaxes-vue3';
import { } from 'reaxes-vue3';
import { reaxel_counter } from '../reaxel';
const reax_count = reaxel_counter() , {
	plus ,
	minus,
} = reax_count;
export default ({
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
			<p>current count : {{ count }}</p>
			<button @click='plus()'>
				plus 1
			</button>
			<button @click='minus()'>
				minus 1
			</button>
		</div>
	</Observer>
</template>
