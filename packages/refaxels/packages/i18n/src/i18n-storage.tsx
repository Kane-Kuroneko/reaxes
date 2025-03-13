export const i18n_language_symbol = Symbol('__reaxel--i18n__');
/*为reaxel-i18n勾入storage能力*/
export const reaxel_i18n_storage = function(){

	let ret = {
		writeToStorage(lang:string){
			localStorage.setItem(i18n_language_symbol.description , lang)
		},
		readFromStorage(callback){
			callback(localStorage.getItem(i18n_language_symbol.description));
			
		},
		clearI18nStorage(){
			localStorage.removeItem( i18n_language_symbol.description );
		},
	};
	
	return (changLang) => {
		ret.readFromStorage( ( lang : string ) => {
			if ( lang ) {
				changLang( lang );
			}
			
		} );
		
		return ret;
	}
}();
