
<script>
import { reaxper } from 'reaxes-vue2';
import { reaxel_counter } from '../reaxel';
import Vue from 'vue';
import Component from "vue-class-component";

const {
	plus ,
	minus,
} = reaxel_counter();


@reaxper
@Component({
	console,
	status(){
		const { count } = reaxel_counter();
		return {
			count : count + 3,
		}
	}
})
export default class CCD extends Vue {
	plus = plus;
	minus = minus;
	mounted(){
		console.log(this);
	}

	render () {
		return <div style = 'background-color: aliceblue'>
			<p>vue2-class-count+3 : { this.count }</p>
			<button onClick = { () => this.plus() }>
				plus
			</button>
			<button onClick = { () => this.minus() }>
				minus
			</button>
		</div>;
	}
	
}
</script>
