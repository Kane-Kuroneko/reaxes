import { action , observable , Reaction } from 'mobx';
import { collectVueData } from './collectData';
import type { ComponentOptions } from 'vue';

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
		methods : typeof ori_methods === 'function' ? ( ori_methods as () => any )() : ori_methods ,
		
	};
	const mobxSymbol = Symbol('');
	let mounted = false;
	const reactiveRender = function(_ctx , _cache? , $props? , $setup? , $data? , $options?) {
		const mobxUpdate = _ctx === mobxSymbol;
		let oriRenderReturn;
		reaction.track( () => {
			ori_data?.call( vm , vm );
			if(mobxUpdate && mounted){
				vm.$forceUpdate();
			}else {
				oriRenderReturn = ori_render.call(vm,_ctx , _cache , $props , $setup , $data , $options)
				if(!mounted){
					mounted = true;
				}
			}
		} );
		
		return oriRenderReturn;
	};
	const reaction = new Reaction(`${ name }.render()`,() => reactiveRender(mobxSymbol))
	_options.render = reactiveRender;
	
	const reactionMounted = function( ...args ) {
		crayon.yellow('CPI',this);
		ori_mounted?.apply( vm , args );
		// @ts-expect-error
		this[disposerSymbol] = reaction.getDisposer_?.() || reaction.getDisposer?.();
		reactiveRender(mobxSymbol);
	};
	
	return _options;
};
