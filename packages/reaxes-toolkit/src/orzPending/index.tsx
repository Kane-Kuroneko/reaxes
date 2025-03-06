
/**
 * pending状态和error状态
 */
export const orzPending = () => {
	const [, [pendingState, setPending,setError]] = utils.makePair(createReaxable({
		pending: false ,
		error : false ,
	}), ({ store, setState }) => {
		const qMicroTask = typeof queueMicrotask!=="undefined" && queueMicrotask;
		const getThen = () => {
			const promise = Promise.resolve();
			return promise.then.bind( promise );
		};
		return [
			store ,
			(pending : boolean) => {
				(qMicroTask || getThen())(() => setState({ pending }));
				return;
			},
			(error : boolean) => {
				(qMicroTask || getThen())(() => setState({ error }));
				return;
			},
		] as const;
	});
	return { pendingState, setPending, setError };
};


if(false){
	//@ts-ignore
	const TestRender = reaxper(() => {
		
		const { pending , error , setPending , setError } = reaxel();
		
		if( pending ) {
			return <span>pending.......</span>;
		}
		
		if( error ) {
			return <span>Error!</span>;
		}
		
		return <div
			onClick = { () => {
				setPending(true);
			} }
		>
			message
		</div>;
	});
	
	
	const reaxel = function(){
		const { pendingState , setPending , setError } = orzPending();
		
		
		utils.crayon.blue(pendingState.pending);
		setPending(true);
		
		utils.orzPromise((res , rej) => {
			setTimeout(() => {
				rej();
			} , 1400);
		}).then(() => {
			setPending(false);
		}).catch(() => {
			setPending(false);
			setError(true);
		});
		return () => {
			return {
				get pending(){
					return pendingState.pending;
				} ,
				get error(){
					return pendingState.error;
				} ,
				setPending ,
				setError ,
			};
		};
	}();
}
