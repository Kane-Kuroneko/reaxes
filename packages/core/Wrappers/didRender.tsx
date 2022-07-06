/*provide "componentDidRender" lifeCycle in class component*/
export const didrenderLifecycleHoC = ( originalComponent: React.ComponentClass ) => {
	
	if ( !originalComponent.prototype?.render ) {
		return originalComponent;
	}
	
	const originalDidMount = originalComponent.prototype.componentDidMount;
	const originalDidUpdate = originalComponent.prototype.componentDidUpdate;
	const originalWillUnmount = originalComponent.prototype.componentWillUnmount;
	const originalDidRender = originalComponent.prototype.componentDidRender;
	
	/*delete instance's prop at itself*/
	if ( originalComponent.hasOwnProperty( 'componentDidMount' ) ) {
		delete originalComponent.prototype.componentDidMount;
	}
	if ( originalComponent.hasOwnProperty( 'componentDidUpdate' ) ) {
		delete originalComponent.prototype.componentDidUpdate;
	}
	
	originalComponent.prototype.componentDidMount = function ( ...args ) {
		originalDidMount?.call(
			this ,
			...args ,
		);
		originalComponent.prototype.componentDidRender?.call(
			this,
			"mount" ,
			...args,
		);
		
		this.mountedStack.forEach(( { callback }) => callback());
	};
	originalComponent.prototype.componentDidUpdate = function ( ...args ) {
		originalDidUpdate?.call(
			this ,
			...args ,
		);
		originalComponent.prototype.componentDidRender?.call(
			this,
			"update" ,
			...args,
		);
		this.updatedStack.forEach(( { callback }) => callback());
	};
	originalComponent.prototype.componentDidRender = function ( ...args ) {
		
		originalDidRender?.call(this,...args);
		
		this.renderedStack.forEach(( { callback }) => callback());
	};
	
	
	
	originalComponent.prototype.componentWillUnmount = function ( ...args ) {
		
		originalWillUnmount.call(this,...args);
		this.unmountStack.forEach(( { callback }) => callback());
	};
	
	return originalComponent;
};
