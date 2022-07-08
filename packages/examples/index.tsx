import { render } from 'react-dom';
import {
	orzMobx ,
	Reaxlass ,
	Reaxper,
} from '../../npm/dist/reaxes.min';
// } from '../core';


const App = Reaxper(class extends Reaxlass{
	
	reax_counter = reaxel_count(this.lifecycle);
	
	render(){
		const { Counter } = this.reax_counter;
		return <>
			<Counter/>
		</>
	}
})


const reaxel_count = function(){
	
	const {store,setState} = orzMobx({
		count : 0,
	})
	
	
	
	
	return (lifecycle) => {
		
		lifecycle.rendered(() => {
			console.log('rendered');
			
		})
		
		return {
			Counter : Reaxper(() => {
				return <button
					onClick = {() => {
						setState({ count : store.count + 1 });
					}}
				>
					count : {store.count}
				</button>
			})
		}
	}
}()


render(
	<App /> ,
	document.getElementById( 'react-app-root' ) ,
);
