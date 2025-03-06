declare global {
	//@ts-ignore
	export const _ : typeof import('lodash');
	export const createReaxable : typeof import("reaxes").createReaxable;
	export const Reaxes : typeof import("reaxes").Reaxes;
	export const reaxel : typeof import("reaxes").reaxel;
	export const reaxper: typeof import('reaxes-react').reaxper;
	export const utils : typeof import("reaxes-utils");
	
	export const crayon : typeof import("reaxes-utils").crayon;
	export const logProxy : typeof import("reaxes-utils")['logProxy'];
	export const orzPromise : typeof import("reaxes-utils")['orzPromise'];
	
	export const toolkit : typeof import("reaxes-toolkit");
	export const orzPending : typeof import("reaxes-toolkit")['orzPending'];
	
	export const obsReaction : typeof import('reaxes').Reaxes['obsReaction'];
	export const collectDeps : typeof import('reaxes').Reaxes['collectDeps'];
	export const contrastedCallback : typeof import('reaxes').Reaxes['contrastedCallback'];
}

export {};
