<script setup>
import { ref } from 'vue3';
import { reaxel_counter } from '../reaxel';
import { reaxper } from 'reaxes-vue3';
import { observable , action } from 'mobx';

const reax_count = reaxel_counter() , {
	plus,
	minus
} = reax_count;
const obs = observable({ c : 111 });
const setObs = action(() => obs.c ++); 
</script>
<template>
	<Observer>
		<!--		<div @click = 'plus'>vue3 {{ reax_count.count }}</div>-->
		<p>vue3 count : {{ reax_count.count }}</p>
		<button @click='plus()'>plus  1</button>
		<button @click='minus()'>minus 1</button>
		
		<p @click='setObs()'>obs:{{ obs.c }}</p>
	</Observer>
</template>
