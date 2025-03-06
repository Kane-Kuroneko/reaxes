import { Reaction } from 'mobx';
import collectDataForVue from './collectData';
import Vue, { ComponentOptions } from 'vue';
import {Reaxes} from 'reaxes';
import _ from 'lodash';

export type VueClass<V> = (new(...args: any[]) => V & Vue) & typeof Vue;


const noop = () => {};
const disposerSymbol = Symbol('disposerSymbol');
// @formatter:on
function observer<VC extends VueClass<Vue>>(Component: VC | ComponentOptions<Vue>): VC;
function observer<VC extends VueClass<Vue>>(Component: VC | ComponentOptions<Vue>) {
	let vm;
	// typeof Component === "function" && (Component = Component());
	const name = (Component as any).name || (Component as any)._componentTag || (Component.constructor && Component.constructor.name) || '<component>';

	const originalOptions = typeof Component === 'object' ? Component : (Component as any).options;
	// To not mutate the original component options, we need to construct a new one
	// const dataDefinition = originalOptions.data;
	
	const options = {
		name,
		...originalOptions,
		// overrider the cached constructor to avoid extending skip
		// @see https://github.com/vuejs/vue/blob/6cc070063bd211229dff5108c99f7d11b6778550/src/core/global-api/extend.js#L24
		_Ctor: {},
	};
	delete options.status;
	// we couldn't use the Component as super class when Component was a VueClass, that will invoke the lifecycle twice after we called Component.extend
	const superProto = typeof Component === 'function' && Object.getPrototypeOf(Component.prototype);
	/*@ts-expect-error*/
	const Super = superProto instanceof Vue ? superProto.constructor : Vue;
	const ExtendedComponent = Super.extend(options);

	const { $mount, $destroy } = ExtendedComponent.prototype;
	
	let nativeRenderOfVue: any;
	ExtendedComponent.prototype.$mount = function (this: any, ...args: any[]) {
		vm = this;
		let mounted = false;
		this[disposerSymbol] = noop;

		const reactiveRender = () => {
			reaction.track(() => {
				// options.data.call(this,this);
				if (!mounted) {
					const status = typeof originalOptions.status === 'function' ? originalOptions.status() : null;
					if(_.isPlainObject(status)){
						for(const key in status){
							if(status.hasOwnProperty(key)){
								Object.defineProperty(vm,key,{
									enumerable : true,
									configurable : true,
									get(){
										return originalOptions.status()[key];
									},
									set(){
										throw "这个属性归属于reaxes store , 只能通过createReaxable暴露出的方法修改"
									},
								});
							}
						}
					}else if(originalOptions.status == void 0){
						//do nothing.
					}else {
						console.warn('status必须返回一个对象。（status在当前组件已失效!）',vm);
					}
					
					$mount.apply(this, args);
					mounted = true;
					nativeRenderOfVue = this._watcher.getter;
					// rewrite the native render method of vue with our reactive tracker render
					// thus if component updated by vue watcher, we could re track and collect dependencies by mobx
					this._watcher.getter = reactiveRender;
				} else {
					nativeRenderOfVue.call(this, this);
				}
			});
			
			return this;
		};
		
		const reaction = new Reaction(`${name}.render()`, reactiveRender);

		// @ts-expect-error
		this[disposerSymbol] = reaction.getDisposer_?.() || reaction.getDisposer?.();
		
		return reactiveRender();
	};

	ExtendedComponent.prototype.$destroy = function (this: Vue) {
		(this as any)[disposerSymbol]();
		$destroy.apply(this);
	};

	const extendedComponentNamePropertyDescriptor = Object.getOwnPropertyDescriptor(ExtendedComponent, 'name') || {};
	if (extendedComponentNamePropertyDescriptor.configurable === true) {
		Object.defineProperty(ExtendedComponent, 'name', {
			writable: false,
			value: name,
			enumerable: false,
			configurable: false,
		});
	}

	return ExtendedComponent;
}

export {
	observer,
	observer as Observer,
};
