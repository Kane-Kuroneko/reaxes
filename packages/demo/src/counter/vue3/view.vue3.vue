<script>
import Options from './view-options.vue3.vue';
import Composition from './view-composition.vue3.vue';
import {reaxper} from 'reaxes-vue3';

export default {
	components : {
		// "reaxes-options" : reaxper(Options),
		"reaxes-composition" : reaxper(Composition),
	},
	
};
</script>
<template>
	<div>
<!--		<reaxes-options></reaxes-options>-->
		<reaxes-composition></reaxes-composition>
	</div>
</template>
