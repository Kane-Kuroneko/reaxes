<script
	lang = "ts"
	setup
>
import { RouterLink , RouterView } from 'vue-router';
// import { reaxper } from 'reaxes-vue3';
import { reaxel_counter } from '../../../src/counter/reaxel.tsx';
import { Observer , useLocalObservable } from 'reaxes-vue3';
import { reaxel } from 'reaxes';
const reax_counter = reaxel_counter();
const state = useLocalObservable(() => ({
	count: 0,
	get double() {
		return this.count * 2
	},
	increment() {
		this.count++
	}
}))

</script>

<template>
	<Observer>
		<div @click="reax_counter.plus()">
			count:{{ reax_counter.count }}
		</div>
		<div @click="state.increment()">c:{{ state.count }}</div>
		<RouterView />
	</Observer>
</template>

<style scoped>

</style>
