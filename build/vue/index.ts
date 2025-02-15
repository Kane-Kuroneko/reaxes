import { vue as env_vue } from '../entrance.mjs';

if(env_vue === "vue2"){
	module.exports = require( './vue2/vue2js' );
}
if(env_vue === "vue3"){
	module.exports = require( './vue3/vue3js' );
}
