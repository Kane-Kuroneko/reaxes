import { Component } from 'react';
import { observer as observerLite , parentObserver} from 'mobx-react-lite';
import { observer } from 'mobx-react';

type Props = {
	instance: React.Component;
};

/**
 * 包裹原始component , 集成了react-router , mobx-react , withHooks
 * @param OriginalComponent
 */
export function withHoC<T extends ( React.Component & React.FC )>( OriginalComponent: T ) {
	/*this should be a FC*/
	if ( !OriginalComponent.prototype?.render ) {
		return observerLite(OriginalComponent);
	}
	/**
	 * 如果已经被Observer包裹过,则直接返回
	 */
	if(Object.getOwnPropertySymbols(OriginalComponent).find((symbol) => symbol.description === "isMobXReactObserver" )){
		return OriginalComponent;
	}
	
	const baseRender = OriginalComponent.prototype.render;
	
	function HooksProvider( { instance,random } , ref ,  ): any {
		
	
		return baseRender.call(instance);
	}
	
	// @ts-ignore  
	const componentName = OriginalComponent.displayName || OriginalComponent.name || 'Component';
	HooksProvider.displayName = componentName + 'Hooks';
	const H = parentObserver( HooksProvider );
	
	
	OriginalComponent.prototype.render = function (){
		// return React.createElement()
		return <H instance={this} /*random = {Math.random()}*//>
	};
	
	
	return observer(OriginalComponent);
}


