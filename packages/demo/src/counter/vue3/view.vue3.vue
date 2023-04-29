<script setup>
import { ref } from 'vue3';
import { reaxel_counter } from '../reaxel';
import {} from 'mobx-vue-lite';
import { observable , action } from 'mobx';
// const count = ref(0);
const plus = () => reax_count.plus();

const reax_count = reaxel_counter();
const obs = observable({ c : 111 });
const n = action(() => {
	obs.c ++;
});
</script>
<template>
	<Observer>
<!--		<div @click = 'plus'>vue3 {{ reax_count.count }}</div>-->
			<div @click='n'>vue3 {{ obs.c }}</div>
	</Observer>
</template>
