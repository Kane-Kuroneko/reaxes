// export const Counter = reaxper( class extends Reaxlass {
//	
// 	reax_counter = reaxel_counter();
//	
// 	render() {
// 		const {count , setCount} = this.reax_counter;
//		
// 		return <>
// 			<p>current count : { count }</p>
// 			<button onClick = { () => setCount( count + 1 ) }>
// 				click me
// 			</button>
// 		</>;
// 	}
// } );


export const Counter = reaxper( () => {
	const {count , plus} = reaxel_counter();
	
	return <>
		<p>current count : { count }</p>
		<button onClick = { () => plus() }>
			click me
		</button>
	</>;
} );

import { reaxel_counter } from '../reaxel';
import { reaxper } from '../../../../reaxes-react/src';
