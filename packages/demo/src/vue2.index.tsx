import Vue from 'vue2';
import Vue_Counter from './counter/vue2/view.vue2.vue';


new Vue( {
	el : '#reaxes-vue2-root' ,
	render( h ) {
		return h( Vue_Counter );
	} ,
} );
