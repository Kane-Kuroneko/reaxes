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

import {reaxper,createReaxable} from 'reaxes-react';
import { reaxel_counter } from './reaxel';
import React,{} from 'react';

const Sub = class extends React.Component {
	
	render(){
		console.log(this.props);
		return <span>
			<button>
				click me
			</button>
		</span>;
	}
}

/*反向继承*/
const Wrapper = (Component) => {
	return class extends Component{
		
		
	} 
}
/*属性代理*/
const Parent = () => {
	return <Sub />;
}
