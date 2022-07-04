import {
	Routes ,
	Route,
} from 'react-router-dom';
import {
	Button ,
	Input ,
} from 'antd';


// import './style.module.less';


export interface store {
	
}

export const {
	store ,
	setState ,
} = orzMobx<store>( {
	
} );

/* replace "ReactTemplate" once cloned from this template file. */
const _ReactTemplate = class extends ReactComponentClass<any , any>    {
	
	/*it will be invoked after "didMount"&"didUpdate"*/
	// componentDidRender( stage: "mount" | "update" , prevProps?: Readonly<any> , prevState?: Readonly<any> , snapshot?: any ): any {
	// 	console.log( stage );
	// }
	
	componentDidRender( stage: "mount" | "update" , prevProps?: Readonly<any> , prevState?: Readonly<any> , snapshot?: any ): any {
		
	}
	
	render() {
		/* you can use react-hooks here if you want, but it was not recommended  */
		const [ count , setCount ] = useState( 10 );
		
		return <>
			
		</>;
	}
};




/*every component which gonna be instantiated must be wrapped , it contains various basic supoort */
const InputPrinter = ComponentWrapper(( props: { } ) => {
	
	useEffect( () => {} ,[] );
	
	return <>
		
	</>;
}) ;

export const ReactTemplate = ComponentWrapper( _ReactTemplate );

