import {
	Reaxper ,
	Reaxlass ,
	orzMobx ,
	Reaxes,
	// } from '../../core/index.tsx';
} from '../../npm/dist/reaxes.min';
import {render} from 'react-dom';

console.log(window.a === React.Fragment);



export const App = Reaxper(class extends Reaxlass{
	
	reax_counter = reaxel_count(this.lifecycle);
	
	render(){
		const Counter = Reaxper(this.reax_counter.Counter);
		console.log('sdsds');
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
			Counter : (() => {
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
