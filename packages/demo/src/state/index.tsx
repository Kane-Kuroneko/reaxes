import { collectDeps } from '../../core/ORZMobx';
export const Test_State = Reaxper(class extends Reaxlass {
	
	reax_count = reaxel_counter();
	
	render(){
		collectDeps( this.reax_count.store );
		// console.log( 111111111 );
		return <>
			<button
				onClick={() => {
					this.reax_count.setCount(this.reax_count.store.count + 1);
				}}
			>
				current count : {this.reax_count.count}
			</button>
		</>
	}
}); 


const reaxel_counter = function(){
	const {
		store ,
		setState,
	} = orzMobx( {
		count : 0 ,
	} );
	let static_count = 0;
	
	return () => {
		return {
			get store(){
				return store;
			},
			get count (){
				return static_count;
			},
			setCount(count:number){
				setState( {
					count ,
				} );
				static_count += 1 ;
			},
		}
	}
}(); 





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
