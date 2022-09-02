import ReactDOM , { render } from 'react-dom';
import { App } from './App';
import React , {} from 'react';
console.log(window.a,render,window.a === render);

console.log(ReactDOM.version);
const createRoot = () => {
	const rootNode = document.createElement('div');
	rootNode.id = "react-app-root";
	document.body.append(rootNode);
	return rootNode;
};


render(
	<App /> ,
	createRoot() ,
);
