<template>
	<div>
		<p>current count : {{ count }}</p>
		<button @click='plus()'>
			plus 1
		</button>
		<button @click='minus()'>
			minus 1
		</button>
	</div>
</template>

<script>
import { observable , action , untracked , transaction , _allowStateChanges , autorun } from 'mobx';
import Vue,{} from 'vue';
import {reaxper} from 'reaxes-vue2';
import { reaxel_counter } from '../reaxel';

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

const reax_count = reaxel_counter() , {
	plus ,
	minus,
} = reax_count;

export default reaxper({
	data(){
		const {count} = reaxel_counter();
		return {
			console,
			count,
		};
	},
	// render (h) {
	// 	console.log(h);
	// 	console.log(<span></span>);
	// 	return <div
	// 		onClick = { () => {
	// 			this.setAge();
	// 		} }
	// 	>
	// 		age: { obsState.age }
	// 	</div>;
	// },
	updated () {
		console.log(++updated);
	},
	mounted () {
		
	},
	methods:{
		plus,
		minus,
		// setAge : action(() => {
		// 	obsState.age += 1;
		// }),
		// setCount:action(() => {
		// 	// obsState.count++;
		// 	this.count ++;
		// }),
		// setSon(){
		// 	action(() => {
		// 		state.son ++;
		// 	});
		// }
	}
})
let updated = 0;
</script>
