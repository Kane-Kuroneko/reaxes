<template>
	<div>
		
		<p v-if="c > 7">count : {{ count }}</p>
		<p v-if="c < 8">c : {{ c }}</p>
		<button @click="increase()">click</button>
	</div>
</template>

<script>
import {reaxper} from 'reaxes-vue2';
import {reaxel,createReaxable} from 'reaxes';

const {
	store ,
	setState,
} = createReaxable({ count : 0 });

export default reaxper({
	status (){
		
		return {
			count : store.count,
		}
	},
	data(){
		return {
			c : 0,
		}
	},
	watch : {
		"c" (){
			console.log(store.count);
		}
	},
	methods : {
		increase(){
			setState({count : store.count + 1});
			console.log(this.c);
			this.c += 1;
		}
	}
})
</script>
