<template>
	<div style='background-color: aliceblue'>
		<p>current count : {{ reax_count.count }}</p>
		<button @click='reax_count.plus()'>
			plus 1
		</button>
		<button @click='reax_count.minus()'>
			minus 1
		</button>
		
		<p @click='d.a ++'>{{ d.a }}</p>
	</div>
</template>

<script>
import { reaxper } from 'reaxes-vue2';
import { reaxel_counter } from '../reaxel';
import { observer , VueClass ,Observer} from 'mobx-vue';
import {  observable } from "mobx";
import Vue from 'vue';
import Component from "vue-class-component";


@Observer
@Component
export default class App extends Vue {
	d = {
		a:0
	}
	reax_count = reaxel_counter();
	
	render(){
		return <p>{this.reax_count.count + 100}</p>
	}
}
</script>
