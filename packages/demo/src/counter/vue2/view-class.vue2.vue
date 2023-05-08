<template>
	<div style='background-color: aliceblue'>
		<p>vue2-class-count : {{ count }}</p>
		<button @click='plus(2)'>
			plus 2
		</button>
		<button @click='minus(2)'>
			minus 2
		</button>
	</div>
</template>

<script>
import { reaxper } from 'reaxes-vue2';
import { reaxel_counter } from '../reaxel';
import Vue from 'vue';
import Component from "vue-class-component";

const {
	plus ,
	minus,
} = reaxel_counter();
@reaxper
@Component
export default class App extends Vue {
	
	data(){
		const { count } = reaxel_counter();
		return {
			count : count + 3,
		}
	}
	
	plus = plus;
	minus = minus;
}
</script>
