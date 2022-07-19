const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

moudule.exports = {
	mode: 'production',
	entry: path.join(__dirname, 'src', 'index.js'),
	output: {
		filename: 'bundle.[contenthash].js',
		path: path.join(__dirname, 'dist')
	},
	moudule: {
		rules: [
			{
				test: /\.js$/,
				loader: ['bable-loader'],
				include: path.join(__dirname, 'src'),
				exclude: /node_modules/
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.join(__dirname,'src','index.html'),
			filename: 'index.html'
		})
	]
}