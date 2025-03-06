<script>
import { reaxper } from 'reaxes-vue3';
import { defineComponent , ref } from 'vue3';
import { reaxel_counter } from '../reaxel';

const { store,setState } = createReaxable({c:124});
export default /*reaxper*/defineComponent({
	data () {
		const { count } = reaxel_counter();
		return {
			console ,
			count ,
			store,
		};
	} ,
	setup () {
		const c = ref(222);
		
		return { c };
	} ,
	methods : function(){
		const {
			plus ,
			minus ,
		} = reaxel_counter();
		return {
			plus ,
			minus,
			setState,
		};
	}() ,
});
</script>

<template>
	<div>
		<p>Vue3-options-count : {{ count }}</p>
		<button @click = 'plus()'>
			plus 1
		</button>
		<button @click = 'minus()'>
			minus 1
		</button>
		
		<p @click='setState({c:store.c+1})'>ref : {{ store.c }}</p>
	</div>
</template>
