export const useForceUpdate = () => {
	const [count,setCount] = useState(0);
	return () => setCount(count+1);
}

import { useState } from 'react';
