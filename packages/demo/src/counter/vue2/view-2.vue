<template>
	<div @click='setSon()'>
		son : {{ state.son }}
	</div>
</template>

<script>
import {observable,action} from 'mobx';
import Vue,{} from 'vue';
import {observer,Observer} from 'mobx-vue';
import Component from "vue-class-component";

const state = observable({
	son : 233 ,
});

@Observer
@Component
export default class vue2 extends Vue {
	state = {
		son:state.son
	}
	
	setSon(){
		state.son += 1;
		console.log(state.son);
	}
}

// export default observer({
// 	data(){
// 		return {
// 			son:state.son
// 		}
// 	},
// 	methods:{
// 		setSon(){
// 			action(() => {
// 				state.son ++;
// 			});
// 		}
// 	}
// }) 
</script>
