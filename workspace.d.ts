declare global {
	// export const requester : typeof import('#src/requester').requester;
	
	//@ts-ignore
	export const _ : typeof import('lodash');
	export const reaxel : typeof import('reaxes')['reaxel'];
	export const orzMobx : typeof import('reaxes')['orzMobx'];
	export const contrastedCallback : typeof import('reaxes')['Reaxes']['contrastedCallback'];
	export const obsReaction : typeof import('reaxes')['Reaxes']['obsReaction'];
	export const collectDeps : typeof import('reaxes')['Reaxes']['collectDeps'];
	export const reaxper : typeof import('reaxes-react')['reaxper'];
	
	export const utils : typeof import('packages/reaxes-utils')['crayon'];
	export const orzPromise : typeof import('packages/reaxes-utils').orzPromise;
	export const crayon : typeof import('packages/reaxes-utils').crayon;
	export const logProxy : typeof import('packages/reaxes-utils').logProxy;
	export const makePair : typeof import('packages/reaxes-utils').makePair;
	export const assert : typeof import('packages/reaxes-utils').assert;
	export const decodeQueryString : typeof import('packages/reaxes-utils').decodeQueryString;
	export const encodeQueryString : typeof import('packages/reaxes-utils').encodeQueryString;
	export const stringify : typeof import('packages/reaxes-utils').stringify;
	
	export const useEffect : typeof import('react').useEffect;
	export const useRef : typeof import('react').useRef;
	export const useMemo : typeof import('react').useMemo;
	export const useState : typeof import('react').useState;
	
}

export {}
