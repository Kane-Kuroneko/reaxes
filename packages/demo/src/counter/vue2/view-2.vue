<!--<template>-->
<!--	<div @click='setSon()'>-->
<!--		son : {{ state.son }}-->
<!--	</div>-->
<!--</template>-->

<!--<template>-->
<!--	<div @click='setCount'>-->
<!--		age: {{ count }}-->
<!--	</div>-->
<!--</template>-->

<script>
import { observable , action , untracked , transaction , _allowStateChanges , autorun } from 'mobx';
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

const obsState = observable({age:11,count:123});

export default observer({
	data(){
		return {
			state : obsState,
			count : obsState.count
			// son:state.son
		}
	},
	render (h) {
		console.log(h);
		console.log(<span></span>);
		return <div
			onClick = { () => {
				this.setAge();
			} }
		>
			age: { obsState.age }
		</div>;
	},
	
	methods:{
		setAge : action(() => {
			obsState.age += 1;
		}),
		setCount:action(() => {
			obsState.count++;
		})
		// setSon(){
		// 	action(() => {
		// 		state.son ++;
		// 	});
		// }
	}
})

</script>
