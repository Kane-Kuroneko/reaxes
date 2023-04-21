<!--<template>-->
<!--	<div @click='setSon()'>-->
<!--		son : {{ state.son }}-->
<!--	</div>-->
<!--</template>-->

<template>
	<div @click='setAge'>
		age: {{ state.age }}
	</div>
</template>

<script>
import {observable,action,untracked,transaction,_allowStateChanges} from 'mobx';
import Vue,{} from 'vue';
import {observer,Observer} from 'mobx-vue';
import Component from "vue-class-component";

const state = observable({ son : 333 });

// @observer
// @Component
// export default class extends Vue {
//	
// 	@observable count = 0;
//	
//	
// }
// class ViewModel {
// 	@observable age = 10;
//	
// 	@action.bound setAge() {
// 		this.age++;
// 	}
// }

const obsState = observable({age:11});

export default observer({
	data(){
		return {
			state : obsState
			// son:state.son
		}
	},
	methods:{
		setAge (){
			_allowStateChanges(true,() => {
				obsState.age += 1;
			})
			console.log(this.state.age);
		}
		// setSon(){
		// 	action(() => {
		// 		state.son ++;
		// 	});
		// }
	}
})

</script>
