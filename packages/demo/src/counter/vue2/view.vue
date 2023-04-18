<template>
	<div id='reaxes-demo-root'>
		<p>current count : {{ x }}</p>
		<button @click = 'setX'>
			click me
		</button>
		
		
		<p>current C : {{ c }}</p>
		<button @click = 'cClick'>
			click me
		</button>
		
		<vue-son></vue-son>
	</div>
</template>

<script>
import { reaxper } from 'reaxes-vue2';
import { reaxel_counter } from '../reaxel';
import { observer , VueClass } from 'mobx-vue';
import {  observable } from "mobx";
import vue2 from './view-2.vue';
const state = observable({
	c:222
});

const {
	plus ,
	minus ,
} = reaxel_counter();



export default observer({
	components : {
		"vue-son" : vue2,
	},
	data () {
		
		const { count } = reaxel_counter();
		return {
			x : 123,
			c : state.c,
			count
		};
	} ,
	methods : {
		setX(){
			this.x ++;
		},
		cClick(){
			state.c = state.c + 1;
			console.log(state.c);
		},
		minus ,
		plus ,
	} 
});
</script>
