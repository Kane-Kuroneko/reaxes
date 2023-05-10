<script>
import { reaxper } from 'reaxes-vue3';
import { defineComponent , ref } from 'vue3';
import { reaxel_counter } from '../reaxel';

export default /*reaxper*/defineComponent({
	data () {
		const { count } = reaxel_counter();
		return {
			console ,
			count ,
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
		
		<p @click='c++'>ref : {{ c }}</p>
	</div>
</template>
