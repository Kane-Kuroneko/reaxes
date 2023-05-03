<template>
	<div id='reaxes-vue2-root'>
		<count-view-fn/>
<!--		<count-view-class/>-->
	</div>
</template>
<script>
import {} from 'reaxes';
import {observable} from 'mobx';
import {observer} from '../../../mobx-vue';
import count_view_fn from './view-functional.vue2.vue';
import count_view_class from './view-class.vue2.vue'

export default observer({
	components : {
		'count-view-fn' : count_view_fn ,
		'count-view-class' : count_view_class ,
	} ,
	
});
window.vue2_env_obs = observable;
</script>

