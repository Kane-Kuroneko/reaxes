module.exports = {
	"presets": [
		"@babel/preset-env",
		"@babel/preset-react",
		"@babel/preset-typescript",
	],
	"plugins": [
		"@babel/plugin-proposal-do-expressions",
		"@babel/plugin-proposal-class-static-block",
		"@babel/plugin-proposal-export-default-from",
		"@babel/plugin-proposal-function-bind",
		"@babel/plugin-proposal-function-sent",
		"@babel/plugin-proposal-partial-application",
		["@babel/plugin-proposal-pipeline-operator" , {
			"proposal" : "hack",
			"topicToken": "^^"
		}],
		"@babel/plugin-proposal-throw-expressions",
		"@babel/plugin-proposal-private-property-in-object",
		"@babel/plugin-syntax-bigint",
		["@babel/plugin-proposal-decorators" , {
			"legacy": true,
		}],
	
	],
};


/*
 `
 
 npm install --save-dev
 
 @babel/plugin-proposal-do-expressions
 @babel/plugin-proposal-class-static-block
 @babel/plugin-proposal-decorators
 @babel/plugin-proposal-export-default-from
 @babel/plugin-proposal-function-bind
 @babel/plugin-proposal-function-sent
 @babel/plugin-proposal-partial-application
 @babel/plugin-proposal-pipeline-operator
 @babel/plugin-proposal-throw-expressions
 @babel/plugin-proposal-private-property-in-object
 @babel/plugin-proposal-record-and-tuple
 @babel/plugin-syntax-bigint
 
 
 
 
 `.replaceAll(/\n/g, " "); */
