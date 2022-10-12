// import {Reaxper ,Reaxlass ,orzMobx ,Reaxes} from 'reaxes';
import {Reaxper ,Reaxlass ,orzMobx ,Reaxes} from '@@reaxes';

import { render } from 'react-dom';
import React,{} from 'react';
// import {Test_Reaxel_i18n as UmountTest} from './test-unmount';
// import { Test_State } from './state';
// import { User } from './example-reaxel-user';

console.log(Reaxper);

const reaxel_counter = function(){
	const {store,setState} = orzMobx({
		count : 0 ,
	})
	return () => {
		return {
			get count(){
				return store.count
			},
			plusCount (){
				setState({ count : store.count + 1 });
			},
		}
	}
}()

const Counter = Reaxper(() => {
	const {count,plusCount} = reaxel_counter();
	console.log(count);
	
	return <div>
		<p>count : {count}</p>
		<button onClick={plusCount}>add count</button>
	</div>
});

render(
	<Counter /> ,
	document.getElementById( 'react-app-root' ) ,
);
