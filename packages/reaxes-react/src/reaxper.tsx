import {
	compose ,
	withHoC ,
	didrenderLifecycleHoC ,
} from './Wrappers';
import {observer} from '@@libs/mobx-react';
const componentHasWrapped = Symbol( '' );

export const reaxper = <T extends {}>(component : T) : T => {
	
	if(component.hasOwnProperty(componentHasWrapped)){
		return component;
	}
	
	const wrappedComponent = compose( [
		didrenderLifecycleHoC ,
		// observer ,
		withHoC ,
	] )(component);
	
	/*flag to prevent duplicated wrap*/
	wrappedComponent[componentHasWrapped] = true;
	return wrappedComponent;
};
