<script>
import Options from './view-options.vue3.vue';
import Composition from './view-composition.vue3.vue';
export default {
	components : {
		"reaxes-options" : Options,
		"reaxes-composition" : Composition,
	},
	
};
</script>
<template>
	<div>
		<reaxes-options></reaxes-options>
<!--		<reaxes-composition></reaxes-composition>-->
	</div>
</template>
