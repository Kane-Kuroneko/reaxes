export const Demo$state = reaxper(class extends Reaxlass {
	
	reax_count = reaxel_counter();
	
	render(){
		return <>
			<button
				onClick={() => {
					this.reax_count.setCount(this.reax_count.count + 1);
				}}
			>
				current count : {this.reax_count.count}
			</button>
		</>
	}
});

import {reaxper,orzMobx} from '#reaxes';
import { reaxel_counter } from './reaxel';


const Sub = class extends React.Component {
	
	render(){
		return <>
			<button>
				click me
			</button>
		</>
	}
}

/*反向继承*/
const Wrapper = (Component) => {
	return class extends Component{
		
		
	} 
}
/*属性代理*/
const Parent = () => {
	return <Sub/>
}
