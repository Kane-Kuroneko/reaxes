import {
	compose ,
	withHoC ,
	didrenderLifecycleHoC ,
} from './Wrappers';
import {observer} from '@@packages/reaxes/libs/mobx-react';
const componentHasWrapped = Symbol( '' );

export const Reaxper = <T extends {}>(component : T) : T => {
	
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
