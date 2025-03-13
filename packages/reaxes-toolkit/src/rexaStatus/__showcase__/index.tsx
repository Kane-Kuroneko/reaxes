const TestRender = reaxper(() => {
	const { current : {pendingState,setError,setPending} } = useRef(rexaStatus());
	const [ data , setData ] = useState(null);
		
	useEffect(() => {
		fetch(`api.com`).then(( data ) => {
			setPending(false);
		}).catch(e => {
			setError(e);
		});
	},[]);
	
	if( pendingState.pending ) {
		return <div>pending...</div>;
	}
	
	if( pendingState.error ) {
		return <div>Error!</div>;
	}
	
	return <div>{ data }</div>;
});

import { reaxper } from 'reaxes-react';
import { useEffect , useRef , useState } from 'react';
import { rexaStatus } from '../index';


import { createReaxable } from 'reaxes';
