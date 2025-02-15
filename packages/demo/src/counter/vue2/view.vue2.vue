<template>
	<div>
<!--		<count-view-fn/>-->
		<count-view-class/>
	</div>
</template>
<script>
import { reaxper } from 'reaxes-vue2';
import {defineComponent} from 'vue';
// import count_view_fn from './view-functional.vue2.vue';
import count_view_class from './view-class.vue2.vue';

export default reaxper(defineComponent({
	components : {
		// 'count-view-fn' : count_view_fn ,
		'count-view-class' : count_view_class ,
	} ,
}));


</script>

