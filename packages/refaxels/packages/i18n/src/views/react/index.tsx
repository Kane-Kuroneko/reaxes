/**
 * 
 * @param reaxel_I18n
 * @example
 * ```tsx
 * import {Refaxel_I18n} from 'refaxel-i18n';
 * import {createI18nReactComponent} from 'refaxel-i18n/react';
 * 
 * export const reaxel_I18n = Refaxel_I18n(...);
 * export const I18n = createI18nReactComponent(reaxel_I18n);
 * 
 * //use I18n in your components:
 * import {reaxper} from 'reaxes-react';
 * 
 * const Hello = reaxper(() => {
 *    const {language,setLanguage} = reaxel_I18n();
 *    return <div>
 *       <p><I18n>hello</I18n></p>
 *       <button disabled={language === 'en-US'} onClick = {() => setLanguage('en-US')}>set to English</button>
 *       <button disabled={language === 'ja-JP'} onClick = {() => setLanguage('ja-JP')}>set to Japanese</button>
 *    </div>
 * })
 * ```
 */
export const createI18nComponent = (reaxel_I18n:ReturnType<typeof Refaxel_I18n>) => {
	const {I18n_Store,statics} = reaxel_I18n();
	const sourceLanguage = statics.languages.find( conf => conf.isSource ).language;
		
	return reaxper( ( props: React.PropsWithChildren<{}> ): React.ReactElement => {
		[ I18n_Store.language ];
		const children = props.children as string;
		const forceUpdate = utils.useForceUpdate();

		/*暂时不要移除,监测组件是否被不正常地卸载*/
		useEffect( () => {
			// console.log( 'mounted' );
			// return () => console.log( 'unmounted' );
		} , [] );
		
		useEffect( () => {
			forceUpdate();
		} , [ I18n_Store.loading ] );
		
		if( I18n_Store.language === sourceLanguage ) {
			return <>{ children }</>;
		}
		
		if( !statics.languageMaps[I18n_Store.language] || !statics.languageMaps[I18n_Store.language][children] ) {
			return <>ERR_I18NComponent_MISS_{I18n_Store.language}({children})</>;
		} else {
			return <>{ statics.languageMaps[I18n_Store.language][children] }</>;
		}
	} );
}

import React,{ useEffect } from 'react';
import { reaxper } from 'reaxes-react';
import { Refaxel_I18n } from '../../';
import * as utils from 'reaxes-utils';
