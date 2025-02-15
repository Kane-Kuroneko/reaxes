import { Reaction } from "mobx";
import {
	forwardRef ,
	memo ,
} from "react";
import { printDebugValue } from "./utils/printDebugValue";
import {
	addReactionToTrack ,
	IReactionTracking ,
	recordReactionAsCommitted ,
} from "./utils/reactionCleanupTracking";
import { isUsingStaticRendering } from "./staticRendering";


function observerComponentNameFor( baseComponentName : string ) {
	return `observer${ baseComponentName }`;
}

/**
 * We use class to make it easier to detect in heap snapshots by name
 */
class ObjectToBeRetainedByReact {
}

function objectToBeRetainedByReactFactory() {
	return new ObjectToBeRetainedByReact();
}

export function useObserver<T>( fn : () => T , baseComponentName : string = "observed" ,instance) : T {
	if ( isUsingStaticRendering() ) {
		return fn();
	}
	// console.log( instance );
	const [ objectRetainedByReact ] = React.useState( objectToBeRetainedByReactFactory );
	// Force update, see #2982
	const [ , setState ] = React.useState();
	const parentForceUpdate = () => instance.forceUpdate();
	const forceUpdate = () => setState([] as any);
	// StrictMode/ConcurrentMode/Suspense may mean that our component is
	// rendered and abandoned multiple times, so we need to track leaked
	// Reactions.
	const reactionTrackingRef = React.useRef<IReactionTracking | null>( null );
	
	if ( !reactionTrackingRef.current ) {
		// First render for this component (or first time since a previous
		// reaction from an abandoned render was disposed).
		
		const newReaction = new Reaction( observerComponentNameFor( baseComponentName ) , () => {
			// Observable has changed, meaning we want to re-render
			// BUT if we're a component that hasn't yet got to the useEffect()
			// stage, we might be a component that _started_ to render, but
			// got dropped, and we don't want to make state changes then.
			// (It triggers warnings in StrictMode, for a start.)
			if ( trackingData.mounted ) {
				// We have reached useEffect(), so we're mounted, and can trigger an update
				parentForceUpdate();
				forceUpdate();
			} else {
				// We haven't yet reached useEffect(), so we'll need to trigger a re-render
				// when (and if) useEffect() arrives.
				trackingData.changedBeforeMount = true;
			}
		} );
		
		const trackingData = addReactionToTrack(
			reactionTrackingRef ,
			newReaction ,
			objectRetainedByReact ,
		);
	}
	
	const { reaction } = reactionTrackingRef.current!;
	React.useDebugValue( reaction , printDebugValue );
	
	React.useEffect( () => {
		// Called on first mount only
		recordReactionAsCommitted( reactionTrackingRef );
		
		if ( reactionTrackingRef.current ) {
			// Great. We've already got our reaction from our render;
			// all we need to do is to record that it's now mounted,
			// to allow future observable changes to trigger re-renders
			reactionTrackingRef.current.mounted = true;
			// Got a change before first mount, force an update
			if ( reactionTrackingRef.current.changedBeforeMount ) {
				reactionTrackingRef.current.changedBeforeMount = false;
				parentForceUpdate();
			}
		} else {
			// The reaction we set up in our render has been disposed.
			// This can be due to bad timings of renderings, e.g. our
			// component was paused for a _very_ long time, and our
			// reaction got cleaned up
			
			// Re-create the reaction
			reactionTrackingRef.current = {
				reaction : new Reaction( observerComponentNameFor( baseComponentName ) , () => {
					// We've definitely already been mounted at this point
					parentForceUpdate();
				} ) ,
				mounted : true ,
				changedBeforeMount : false ,
				cleanAt : Infinity ,
			};
			parentForceUpdate();
		}
		
		return () => {
			reactionTrackingRef.current!.reaction.dispose();
			reactionTrackingRef.current = null;
		};
	} , [] );
	
	// render the original component, but have the
	// reaction track the observables, so that rendering
	// can be invalidated (see above) once a dependency changes
	let rendering! : T;
	let exception;
	reaction.track( () => {
		try {
			rendering = fn();
		} catch ( e ) {
			exception = e;
		}
	} );
	
	if ( exception ) {
		throw exception; // re-throw any exceptions caught during rendering
	}
	
	return rendering;
}


let warnObserverOptionsDeprecated = true;

const hasSymbol = typeof Symbol === "function" && Symbol.for;
// Using react-is had some issues (and operates on elements, not on types), see #608 / #609
const ReactForwardRefSymbol = hasSymbol
	? Symbol.for( "react.forward_ref" )
	: typeof forwardRef === "function" && forwardRef( ( props : any ) => null )[ "$$typeof" ];

const ReactMemoSymbol = hasSymbol
	? Symbol.for( "react.memo" )
	: typeof memo === "function" && memo( ( props : any ) => null )[ "$$typeof" ];

export interface IObserverOptions {
	readonly forwardRef? : boolean;
}


// n.b. base case is not used for actual typings or exported in the typing files
export function parentObserver<P extends object , TRef = {}>(
	baseComponent :
		| React.ForwardRefRenderFunction<TRef , P>
		| React.FunctionComponent<P>
		| React.ForwardRefExoticComponent<React.PropsWithoutRef<P> & React.RefAttributes<TRef>> ,
	// TODO remove in next major
	options? : IObserverOptions ,
) {
	if ( process.env.NODE_ENV !== "production" && warnObserverOptionsDeprecated && options ) {
		warnObserverOptionsDeprecated = false;
		console.warn(
			`[mobx-react-lite] \`observer(fn, { forwardRef: true })\` is deprecated, use \`observer(React.forwardRef(fn))\`` ,
		);
	}
	
	if ( ReactMemoSymbol && baseComponent[ "$$typeof" ] === ReactMemoSymbol ) {
		throw new Error(
			`[mobx-react-lite] You are trying to use \`observer\` on a function component wrapped in either another \`observer\` or \`React.memo\`. The observer already applies 'React.memo' for you.` ,
		);
	}
	
	// The working of observer is explained step by step in this talk: https://www.youtube.com/watch?v=cPF4iBedoF0&feature=youtu.be&t=1307
	if ( isUsingStaticRendering() ) {
		return baseComponent;
	}
	
	let useForwardRef = options?.forwardRef ?? false;
	let render = baseComponent;
	
	const baseComponentName = baseComponent.displayName || baseComponent.name;
	
	// If already wrapped with forwardRef, unwrap,
	// so we can patch render and apply memo
	if ( ReactForwardRefSymbol && baseComponent[ "$$typeof" ] === ReactForwardRefSymbol ) {
		useForwardRef = true;
		render = baseComponent[ "render" ];
		if ( typeof render !== "function" ) {
			throw new Error(
				`[mobx-react-lite] \`render\` property of ForwardRef was not a function` ,
			);
		}
	}
	let observerComponent = ( props : any , ref : React.Ref<TRef> ) => {
		return useObserver( () => render( props , ref ) , baseComponentName ,props.instance);
	};
	
	// Don't set `displayName` for anonymous components,
	// so the `displayName` can be customized by user, see #3192.
	if ( baseComponentName !== "" ) {
		;(
			observerComponent as React.FunctionComponent
		).displayName = baseComponentName;
	}
	
	// Support legacy context: `contextTypes` must be applied before `memo`
	if ( (
		baseComponent as any
	).contextTypes ) {
		;(
			observerComponent as React.FunctionComponent
		).contextTypes = (
			baseComponent as any
		).contextTypes;
	}
	
	if ( useForwardRef ) {
		// `forwardRef` must be applied prior `memo`
		// `forwardRef(observer(cmp))` throws:
		// "forwardRef requires a render function but received a `memo` component. Instead of forwardRef(memo(...)), use memo(forwardRef(...))"
		observerComponent = forwardRef( observerComponent );
	}
	
	// memo; we are not interested in deep updates
	// in props; we assume that if deep objects are changed,
	// this is in observables, which would have been tracked anyway
	observerComponent = ( observerComponent );
	
	copyStaticProperties( baseComponent , observerComponent );
	
	if ( "production" !== process.env.NODE_ENV ) {
		Object.defineProperty( observerComponent , "contextTypes" , {
			set() {
				throw new Error(
					`[mobx-react-lite] \`${
						this.displayName || this.type?.displayName || "Component"
					}.contextTypes\` must be set before applying \`observer\`.` ,
				);
			} ,
		} );
	}
	
	return observerComponent;
}

// based on https://github.com/mridgway/hoist-non-react-statics/blob/master/src/index.js
const hoistBlackList : any = {
	$$typeof : true ,
	render : true ,
	compare : true ,
	type : true ,
	// Don't redefine `displayName`,
	// it's defined as getter-setter pair on `memo` (see #3192).
	displayName : true ,
};

function copyStaticProperties( base : any , target : any ) {
	Object.keys( base ).
	forEach( key => {
		if ( !hoistBlackList[ key ] ) {
			Object.defineProperty( target , key , Object.getOwnPropertyDescriptor( base , key )! );
		}
	} );
}
