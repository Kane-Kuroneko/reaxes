import React from 'react';
import './css/main.css';
import ReactDOM , { createRoot } from 'react-dom/client';
import { App } from './App';




const createReactRoot = () => {
	const divWithId = document.createElement('div');
	Object.assign(divWithId , {
		id : "react-root" ,
	});
	document.body.innerHTML = '';
	document.body.append(divWithId);
	return divWithId;
};


const root = createRoot(createReactRoot());

root.render(<App />);
