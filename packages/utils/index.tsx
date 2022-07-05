import shallowequal from 'shallowequal';
import {
	Outlet ,
	useNavigate ,
	To ,
	NavigateOptions,
	useParams,
	UNSAFE_RouteContext as RouteContext ,
	UNSAFE_NavigationContext as NavigationContext ,
	NavigateFunction,
} from 'react-router-dom';
let util;

export default util = Object.freeze( new class {
	/**
	 * note: this fn will change original object!
	 * @param object
	 * @param keys
	 */
	
	originalPick = <O extends {} , K extends Array<keyof O>>(object:O , keys:K) : Pick<O,ArrayElement<K>> => {
		
		
		Object.keys(object).forEach((k) => {/*@ts-ignore*/
			if(!keys.includes(k)){
				delete object[ k ];
			}
		})
		return object as Pick<O,ArrayElement<K>> ;
	};
	
	shallowEqual = shallowequal;
	
	__temp__Token_rect_bgc = (activing) => {
		
		try {
			activing && this.__temp__NFT_rect_bgc( false );
			/*@ts-ignore*/
			document.getElementsByClassName( 'Plugin-SideBar_component_svg__token' )[ 0 ].style.fill = activing ? '#F5F5F6' : '';
		} catch ( e ) {
		}
	};
	__temp__NFT_rect_bgc = (activing) => {
		try {
			activing && this.__temp__Token_rect_bgc( false );
			/*@ts-ignore*/
			document.getElementsByClassName( 'Plugin-SideBar_component_svg__nft' )[ 0 ].style.fill = activing ? '#F5F5F6' : '';
		} catch ( e ) {
		}
	};
	
} );



/*无依赖@@utils的放上面*/
export * from './debounce.utility';
export * from './stringify.utility';
export * from './crayon.utility';
export * from './checkGenericNull.utility';
export * from './runOnlyOnce.utility';
export * from './ConditionRender.utility';
export * from './makePair.utility';
export * from './timer.utility';
export * from './replaceStr.utility';
export * from './queryString.utility';
export * from './orzPromise.utility';

export * from './withRouter';
export * from './assert-group.utility';
export * from './dataflow.utility';

export * from './logProxy.utility';

export * from "./components";
export * from "./hooks";

export {default as Cookie} from './cookie.utility';
export {default as checkType} from './checkType.utility';
export {default as getNestedValue} from './getNestedValue.utility';
export {default as Random} from './random.utility';
export {default as throttle} from './throttle.utility';



