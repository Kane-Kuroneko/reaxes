import Vue from 'vue/dist/vue';
import Vue_Counter from './counter/vue2/view.vue';


new Vue( {
	el : '#reaxes-demo-root' ,
	render( h ) {
		return h( Vue_Counter );
	} ,
} );
