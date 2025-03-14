export function useStateWithCallback<T>(initialState: T): [T, SetStateWithCallback<T>] {
	const [state, setState] = useState<T>(initialState);
	const callbackRef = useRef<((state: T) => void) | null>(null);
	
	const setStateWithCallback: SetStateWithCallback<T> = (newState, callback?) => {
		callbackRef.current = callback || null;
		setState(newState);
	};
	
	useEffect(() => {
		if (callbackRef.current) {
			callbackRef.current(state);
			// 调用后清空，避免重复调用
			callbackRef.current = null;
		}
	}, [state]);
	
	return [state, setStateWithCallback];
}

type SetStateWithCallback<T> = (newState: SetStateAction<T>, callback?: (state: T) => void) => void;

import { SetStateAction , useEffect , useRef , useState } from 'react';
