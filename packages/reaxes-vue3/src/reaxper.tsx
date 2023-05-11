import { action , observable , Reaction } from 'mobx';
import { collectVueData } from './collectData';
import type { ComponentOptions } from 'vue3';

const noop = () => {};
const disposerSymbol = Symbol( 'disposerSymbol' );

export const reaxper = <ops extends ComponentOptions>( options: ops ) => {
	crayon.blue( 'vue-component' , _.cloneDeep( options ) );

	const name = options.name || options._componentTag || ( options.constructor && options.constructor.name) || '<component>';
	
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
			return collectVueData( vm , (ori_data as any) );
		} ,
		mounted( ...args ) {
			return reactionMounted.apply( this , args );
		} ,
		unmounted() {
			ori_unmounted?.call( this );
			this[disposerSymbol]?.();
		} ,
		render(_ctx , _cache , $props , $setup , $data , $options){
			let ret ;
			reaction.track(() => {
				ret = ori_render.call(this,_ctx , _cache , $props , $setup , $data , $options);
			});
			return ret;
		},
		methods : typeof ori_methods === 'function' ? ( ori_methods as () => any )() : ori_methods ,
		
	};
	const mobxSymbol = Symbol('');
	
	const reactiveRender = function(_ctx , _cache? , $props? , $setup? , $data? , $options?) {
		
	};
	
	
	
	const reactionMounted = function( ...args ) {
		debugger;
		
		let mounted = false;
		let dosposer = () => null;
		crayon.yellow('CPI',this);
		const reactiveRender = (_ctx , _cache? , $props? , $setup? , $data? , $options?) => {
			let renderResult;
			/*是否是mobx触发的,如果mobx触发则调用$forceUpdate,否则返回hook后的nativeRender*/
			const reactiveCall = _ctx === mobxSymbol;
			reaction.track( () => {
				ori_data?.call( vm , vm );
				if( !mounted ) {
					if(reactiveCall){
						
					}else {
						debugger
						ori_mounted?.apply( vm , args );
						Reflect.defineProperty( vm.$options , 'render' , {
							value:reactiveRender ,
						} );
						mounted = true;
					}
					
				} else {
					console.log('updated');
					if(reactiveCall){
						vm.$forceUpdate();
					}else {
						renderResult = ori_render.call(vm,_ctx , _cache , $props , $setup , $data , $options);
					}
				}
			} );
			return renderResult;
		};
		
		const reaction = new Reaction( `${ name }.render()` , () => reactiveRender( mobxSymbol ) );
		// @ts-expect-error
		this[disposerSymbol] = reaction.getDisposer_?.() || reaction.getDisposer?.();
		reactiveRender();
	};
	return _options;
};

// import {Observer} from 'reaxes-vue3/libs/mobx-vue-lite';
// export * from 'reaxes-vue3/libs/mobx-vue-lite';
