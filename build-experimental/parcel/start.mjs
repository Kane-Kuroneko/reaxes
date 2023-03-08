import { getPort } from '../../build/toolkit.mjs';

const port = await getPort(8000);
const bundler = new Parcel({
	entries: `./index.html`,
	watch:true,
	serveOptions : {
		port,
		https:true,
		
	},
	hmrOptions : {
		port,
		https:true,
	},
	defaultConfig: '@parcel/config-default'
});
const subscription = await bundler.watch((err, event) => {
	if (err) {
		// fatal error
		throw err;
	}
	
	if (event.type === 'buildSuccess') {
		let bundles = event.bundleGraph.getBundles();
		console.log(`parcel servering at https://127.0.0.1:${port}`);
		console.log(`✨ Built ${bundles.length} bundles in ${event.buildTime}ms!`);
	} else if (event.type === 'buildFailure') {
		console.log(event.diagnostics);
	}
});

import {Parcel} from '@parcel/core';
