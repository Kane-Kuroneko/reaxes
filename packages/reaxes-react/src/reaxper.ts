import {
	compose ,
	withHoC ,
} from './enhancer';
import {observer} from './mobx-react';
const componentHasWrapped = Symbol( '' );

export const reaxper = <T extends {}>(component : T) : T => {
	
	if(component.hasOwnProperty(componentHasWrapped)){
		return component;
	}
	
	const wrappedComponent = compose( [
		withHoC ,
	] )(component);
	
	/*flag to prevent duplicated wrap*/
	wrappedComponent[componentHasWrapped] = true;
	return wrappedComponent;
};
