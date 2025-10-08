/**
 * @description
 * Dynamically imports modules, typically used in reaxel to load different modules in different runtime environments.
 * 
 * @example Basic usage:
 * xImport({
 *   react: import('react'),
 *   reactDOM: import('react-dom')
 * }).then(({ react, reactDOM }) => {
 *   react.createElement();
 *   reactDOM.createRoot();
 * });
 * 
 * @example Usage in reaxel:
 * if (Runtime === 'wap') {
 *   xImport({ antdMobile: import('antd-mobile') }).then(({ antdMobile }) => {
 *     antdMobile.message.success();
 *   });
 * } else if (Runtime === 'pc') {
 *   xImport({ antd: import('antd') }).then(({ antd }) => {
 *     antd.message.success();
 *   });
 * }
 */
export const xImport = <T extends { [p in keyof T]: T[p] }>
( imports:T ):Promise<{[p in keyof T] : Awaited<T[p]>}> => {
	const moduleNameList = Object.keys( imports );
	const modulesList = moduleNameList.map( ( moduleName ) => imports[moduleName] );
	return Promise.all( modulesList ).
	then( ( modules ) => {
		const importsCopy = { ...imports };
		for( const moduleName of moduleNameList ){
			importsCopy[moduleName] = modules[moduleName];
		}
		return importsCopy;
	} );
};
