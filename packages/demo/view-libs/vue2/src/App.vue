<script lang="ts">
import { createReaxable } from 'reaxes/src';
import {reaxper} from 'reaxes-vue2'
import { reaxel_counter } from '../../../src/counter/reaxel';
export default reaxper({
	status(){
		const { count , plus } = reaxel_counter();
		return {
			count ,
		};
	},
	methods:{
		plus(){
			return reaxel_counter().plus();
		}
	}
})
</script>

<template>
  <div id="app">
    <div @click="plus()">count:{{ count }}</div>
    <router-view />
  </div>
</template>

<style scoped>

</style>
