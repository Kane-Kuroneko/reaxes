import { action , observable , Reaction } from 'mobx';
import { collectVueData } from './collectData';
import type { DefineComponent } from 'vue3';

const noop = () => {};
const disposerSymbol = Symbol( 'disposerSymbol' );

export const reaxper = <ops extends DefineComponent<any>>( options: ops ) => {
	crayon.blue( 'vue-component' , _.cloneDeep( options ) );
	
	const name = (
		options as any
	).name || options._componentTag || (
		options.constructor && options.constructor.name
	) || '<component>';
	
	const {
		data : ori_data ,
		render : ori_render ,
		mounted : ori_mounted ,
		unmounted : ori_unmounted ,
		setup : ori_setup,
		methods : ori_methods ,
	} = options;
	
	let vm;
	
	const _options = {
		name ,
		...options ,
		data( _vm ) {
			vm = _vm;
			return collectVueData( vm , ori_data );
		} ,
		mounted( ...args ) {
			return reactionMounted.apply( this , args );
		} ,
		unmounted() {
			ori_unmounted?.call( this );
			this[disposerSymbol]?.();
		} ,
		// render:function(  ) {
		// 	/*是原生vue渲染(true)还是mobx更新(false)*/
		// 	let renderFlag = false;
		// 	return function( _ctx , _cache , $props , $setup , $data , $options ) {
		// 		let ret ;
		// 		const renderer = () => {
		// 			reaction.track(() => {
		// 				if(renderFlag){
		// 					ret = ori_render.call( this , _ctx , _cache , $props , $setup , $data , $options );
		// 				}
		// 			})
		// 		};
		// 		const reaction = new Reaction( 'render' , renderer );
		// 		return ret;
		// 	}
		// }() ,
		methods : typeof ori_methods === 'function' ? (
			ori_methods as () => any
		)() : ori_methods ,
		
	};
	const mobxSymbol = Symbol('');
	const reactionMounted = function( ...args ) {
		let mounted = false;
		let dosposer = () => null;
		crayon.yellow('CPI',this);
		const reactiveRender = () => {
			reaction.track( () => {
				ori_data?.call( vm , vm );
				if( !mounted ) {
					ori_mounted?.apply( this , args );
					mounted = true;
				} else {
					console.count()
					this.$forceUpdate();
				}
			} );
		};
		
		const reaction = new Reaction( `${ name }.render()` , reactiveRender );
		// @ts-expect-error
		this[disposerSymbol] = reaction.getDisposer_?.() || reaction.getDisposer?.();
		reactiveRender();
	};
	return _options;
};

// import {Observer} from 'reaxes-vue3/libs/mobx-vue-lite';
// export * from 'reaxes-vue3/libs/mobx-vue-lite';
