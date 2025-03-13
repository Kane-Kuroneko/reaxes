/**
 * 🌟 **Pending & Error States in the Application** <br>
 * These states are **not limited** to data fetching scenarios
 * and can be used **in any suitable context**.
 *
 * 🔹 **Flexible Types:**
 * - `Pending (P)` and `Error (E)` **default to `any`**.
 * - **Default values:** `false`.
 * - **Customizable:** Use generics `<P, E>` to **enforce type constraints**.
 */
export const rexaStatus = <P = any,E = any>() => {
	const {store,setState,mutate} = createReaxable<{
		pending:P,
		error:E,
	}>({
		pending: false as P ,
		error : false as E ,
	});
	return {
		status:store,
		setStatus(status:Partial<typeof store>){
			setState(status);
		}
	}
};

import { createReaxable } from 'reaxes';
