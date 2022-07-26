var path = require('path');
var webpack = require('webpack');

module.exports = {
	context: path.resolve(__dirname__, './src'),
	entry: {
		app: './app.js'
	},
	output: {
		path: path.resolve(__dirname__, './dist'),
		filename: 'bundle.js'
	},
	plugins: [
		new webpack.optimize.UgligyJsPlugin() // 压缩
	]
}
