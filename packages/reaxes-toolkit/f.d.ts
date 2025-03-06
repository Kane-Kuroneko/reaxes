declare global {
	// export const _ : typeof import('lodash');
	export const React : typeof import("react");
	export const {
		useEffect ,
		useLayoutEffect ,
		useMemo ,
		useRef ,
		useState ,
		useContext ,
		useCallback ,
		useReducer ,
	} : typeof import('react');
	export const {
		// createReaxable ,
		// Reaxes,
	} : typeof import('reaxes');
	// export const utils : typeof import('reaxes-utils');
	// export const crayon : typeof import("reaxes-utils")['crayon'];
	// export const orzPromise : typeof import("reaxes-utils")['orzPromise'];
}
export {}
