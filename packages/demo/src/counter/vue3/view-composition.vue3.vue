<script setup>
import { ref } from 'vue3';
import { reaxel_counter } from '../reaxel';
import { reaxper } from 'reaxes-vue3';
import { observable , action } from 'mobx';

const log = ref(console.log.bind(console));


const countRef = ref(111);

const reax_count = reaxel_counter() , {
	plus,
	minus
} = reax_count;
</script>
<template>
	<div>
		<!--		<div @click = 'plus'>vue3 {{ reax_count.count }}</div>-->
		<p>vue3-composition-count : {{ reax_count.count }}</p>
		<button @click='plus()'>plus  1</button>
		<button @click='minus()'>minus 1</button>
		
		
		<p @click='() => (log(this),countRef++)'>ref:{{ countRef }}</p>
	</div>
</template>
