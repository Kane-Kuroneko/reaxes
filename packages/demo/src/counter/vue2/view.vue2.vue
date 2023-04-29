<template>
	<div id='reaxes-demo-root'>
		<count-view-fn/>
		<count-view-class/>
	</div>
</template>
<script>
import {} from 'reaxes';
import {observer} from '../../../mobx-vue';
import count_view_fn from './view-functional.vue2.vue';
import count_view_class from './view-class.vue2.vue'

export default observer({
	components : {
		"count-view-fn" : count_view_fn, 
		"count-view-class" : count_view_class, 
	}
	
})
</script>

