const path = require('path')

module.exports = {
	entry: './src/index.js',
	output: {
		filename: 'medium-sharer.js',
		path: path.resolve(__dirname, 'docs')
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [
					'style-loader',
					'css-loader'
				]
			}
		]
	}
}