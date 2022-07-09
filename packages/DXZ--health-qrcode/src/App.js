import React , { Component  } from 'react';
import {
	BrowserRouter,
	Link,
	Router,
	Route ,
	withRouter,
	Routes,
} from 'react-router-dom';
import {
	Reaxper ,
	Reaxlass ,
	orzMobx ,
	Reaxes,
// } from '../../../npm/dist/reaxes.min';
} from '../../../../Reaxes/';













export const App = Reaxper(class extends Reaxlass{
	
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
