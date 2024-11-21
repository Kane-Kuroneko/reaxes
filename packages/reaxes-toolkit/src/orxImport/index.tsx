/**
 * @description
 * 动态import模块,一般用于在reaxel中于不同的运行时环境加载不同的模块使用
 * @example Basic using:
 * orxImport({
 *    react : import('react'),
 *    reactDOM : import('react-dom')
 * }).then(({react,reactDOM}) => {
 *    react.createElement();
 *    reactDOM.createRoot();
 * });
 * @example Use in reaxel:
 * if(Runtime === 'wap'){
 *    orxImport({antdMobile : import('antd-mobile')}).then(({antdMobile}}) => {
 *       antdMobile.message.success();
 *    })
 * }else if(Runtime === 'pc'){
 *    orxImport({antd:import('antd')}).then(({antd}}) => {
 *       antd.message.success();
 *    })
 * }
 */
export const orxImport = <T extends { [p in keyof T]: T[p] }>
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
