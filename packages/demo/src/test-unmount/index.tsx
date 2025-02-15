const languageList = [
	{
		lang : "en",
		name : "English",
	},
	{
		lang : "zh-CN",
		name : "简体中文",
	},
	{
		lang : "zh-TC",
		name : "繁體中文",
	},
];

export const Test_Reaxel_i18n = reaxper( class extends Reaxlass {
	
	
	render() {
		const {changeLang,I18n,language,languageList} = reaxel_i18n();
		
		return <>
			<div>
				<select
					placeholder="select lang"
					value = {language}
					onChange={(e) => {
						const value = e.target.value;
						changeLang( value );
					}}
				>
					{ languageList.map( ( {
						lang ,
						name ,
					} ) => {
						return <option
							value = { lang }
							key = { lang }
						>{ name }</option>;
					} ) }
				</select>
				<p><I18n>By stakeholders, for stakeholders.</I18n></p>
				<p><I18n>We bring DAOs and Stakeholders together.</I18n></p>
			</div>
		</>;
	}
} );

export const reaxel_i18n = function(){
	
	const {store,setState} = orzMobx( {
		lang : "en" ,
	} );
	/*已经加载好的i18n文件*/
	const loadedLangMap = {};
	/*维护一个加载lang-json的列表,惰性加载*/
	const asyncLangMap = {
		"zh-CN" : () => import('./lang_zh-CN.json'),
		/*模拟测试: 当异步加载一个语言包很慢时,实现了先渲染上一次语言的缓存(防止空白),待加载lang-json成功后再渲染*/
		"zh-TC": () => {
			return orzPromise((resolve) => {
				setTimeout( () => {
					import('./lang_zh-TC.json').then( ( module ) => {
						resolve( module );
					} );
				} , 2500 );
			})
		},
	};
	
	const asyncLangLoader = () => {
		if(store.lang === 'en') return ;
		if(!loadedLangMap[store.lang]){
			return asyncLangMap[ store.lang ]().
			then( ( module ) => {
				const json = module.default;
				loadedLangMap[ store.lang ] = json;
			} );
		}
	}
	
	const I18n = reaxper((props:React.PropsWithChildren<{}>):React.ReactElement => {
		[store.lang];
		const children = props.children as React.ReactText;
		const forceUpdate = utils.useforceUpdate();
		const prevRef = useRef<React.ReactText>();
		useEffect( () => {
			asyncLangLoader()?.then?.(() => {
				forceUpdate();
			});
		} ,[store.lang]);
		
		/*暂时不要移除,监测组件是否被不正常地卸载*/
		useEffect(() => {
			console.log( 'mounted' );
			return () => console.log( 'unmounted' );
		},[])
		
		if(store.lang === 'en') {
			prevRef.current = children;
			return <>{children}</> ;
		};
		if(!loadedLangMap[store.lang]){
			return <>{ prevRef.current }</>;
		}else {
			prevRef.current = loadedLangMap[store.lang][children];
			return <>{loadedLangMap[store.lang][children]}</>;
		}
	});
	
	return () => {
		
		return {
			/*返回语言列表*/
			get languageList (){
				return languageList;
			},
			/*返回当前使用的语言缩写*/
			get language(){
				return store.lang;
			},
			/*修改语言方法,会重新渲染所有使用了此闭包内I18n的组件*/
			changeLang : ( lang : string ) => {
				setState( {lang} );
			},
			/*I18n组件,children直接放英语自然文本.*/
			I18n ,
		}
	}
}();
