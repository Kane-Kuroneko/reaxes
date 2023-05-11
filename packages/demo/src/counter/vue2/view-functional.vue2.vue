<template>
	<div>
		<p>vue2-fp-count : {{ count }}</p>
		<button @click='plus()'>
			plus 1
		</button>
		<button @click='minus()'>
			minus 1
		</button>
		
		<p @click='setObs()'>obs : {{ obs.c }}</p>
	</div>
</template>

<script>
import { observable , action , untracked , transaction , _allowStateChanges , autorun } from 'mobx';
import Vue,{} from 'vue';
import {reaxper} from 'reaxes-vue2';
import { reaxel_counter } from '../reaxel';

const reax_count = reaxel_counter() , {
	plus ,
	minus,
} = reax_count;

const obs = observable({ c : 999 });
const setObs = action(() => obs.c ++);

export default reaxper({
	data () {
		const { count } = reaxel_counter();
		return {
			obs,
			console ,
			count ,
		};
	} ,
	mounted () {
		console.log();
	} ,
	methods : {
		setObs,
		plus ,
		minus ,
	} ,
});
</script>
