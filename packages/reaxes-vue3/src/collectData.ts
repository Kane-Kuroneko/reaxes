import { isObservable } from 'mobx';
import Vue , { } from 'vue';
import type {ComponentInternalInstance} from 'vue';

/**
 * collect the data which defined for vue
 * and filter the mobx data to avoid duplicated watching by vue
 * @param {Vue} vm
 * @param {DefaultData<Vue>} data
 * @returns {any} filtered data for vue definition
 */
export function collectVueData( vm: ComponentInternalInstance , data?: ( this:ComponentInternalInstance ) => object ) {
	const dataDefinition = typeof data === 'function' ? data.call( vm , vm ) : (data || {});
	const filteredData = Object.keys( dataDefinition ).reduce( ( result: any , field ) => {
		
		const value = dataDefinition[field];
		if( isObservable( value ) ) {
			Object.defineProperty( vm , field , {
				configurable : true ,
				get() {
					return value;
				} ,
				// @formatter:off
				// tslint:disable-next-line
				set() {},
				// @formatter:on
			} );
		} else {
			Object.defineProperty( result , field , {
				enumerable : true ,
				get() {
					return data?.call( vm , vm )[field];
				} ,
			} );
		}
		return result;
		
	} , {} );
	
	return filteredData;
}

