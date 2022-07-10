import {
	Reaxper ,
	Reaxlass ,
	orzMobx ,
	Reaxes,
} from 'reaxes';
import {
	Signature
} from 'ethers';

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
	
	const Reaxes.closuredMemo()
	
	/**
	 * @return {(lifecycle:Lifecycle) => number }
	 */
	return (lifecycle) => {
		
		lifecycle.rendered(() => {
			console.log('rendered');
			
		})
		
		return {
			Counter : (() => {
				reaxel_count(Reaxes.hooks);
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
