import {
	Reaxper ,
	Reaxlass ,
	orzMobx ,
	Reaxes ,
} from '../core/index';
// } from '../../npm/dist/reaxes.min';
import { render } from 'react-dom';
import {Test_Reaxel_i18n as UmountTest} from './test-unmount/index';
import { Test_State } from './state';
import { User } from './example-reaxel-user';


render(
	<User /> ,
	document.getElementById( 'react-app-root' ) ,
);


export const reaxel__counter = function () {
	const {
		store ,
		setState,
	} = orzMobx( {
		count : 0 ,
	} );
	
	return () => {
		return {
			get count() {
				return store.count;
			} ,
			setCount( count: number ) {
				setState( { count } );
			} ,
		};
	};
}();

export const reaxel__counter_observer = function () {
	// 使用其他reaxel的能力
	const reax_counter = reaxel__counter();
	/**
	 * 监听reaxel-counter.store.count , 如果发生变化就调用回调
	 * 回调函数接受一个销毁器, 运行后取消当前监听。
	 * observedMemo的第二个参数数组接受任意长度的数组, 但必须是orzMobx store的值。
	   任意store值发生变化都会调用回调。
	 * 建议配合Reaxes.closuredMemo使用以在某些变量没有发生变化时阻止回调执行。
	 */
	Reaxes.observedMemo( (disposer) => {
		console.log( `now store.count is : ${ reax_counter.count }` );
		if(reax_counter.count > 4){
			disposer();
		}
	} , () => [ reax_counter.count ] );
	
	return () => {
		
		Reaxes.closuredMemo(() => {
			Reaxes.observedMemo( (disposer) => {
				console.log( `now store.count is : ${ reax_counter.count }` );
				if(reax_counter.count > 4){
					disposer();
				}
			} , () => [ reax_counter.count ] );
		},() => [])
		return {
			
		}
	}
}();
