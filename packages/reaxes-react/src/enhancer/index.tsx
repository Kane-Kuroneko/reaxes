export { withHoC } from './withHoC';
export { didrenderLifecycleHoC } from './componentDidInvoke';

export const compose = <T extends Function[]>( wrappers ) => {
	
	if ( wrappers.length === 0 ) {
		( arg ) => arg;
	}
	
	if ( wrappers.length === 1 ) {
		return wrappers[ 0 ];
	}
	
	return wrappers.reduce( ( accu , wrapper ) => ( ...args ) => accu( wrapper( ...args ) ) );
};

