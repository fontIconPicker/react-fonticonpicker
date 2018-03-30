const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // eslint-disable-line

module.exports = {
	entry: path.join(__dirname, 'src/docs'),
	devtool: 'inline-source-map',
	output: {
		path: path.join(__dirname, 'build'),
		filename: 'bundle.js',
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				use: ['babel-loader', 'eslint-loader'],
				exclude: /node_modules/,
			},
			{
				test: /\.scss$/,
				use: [{
					loader: 'style-loader',
				}, {
					loader: 'css-loader',
					options: {
						sourceMap: true,
					},
				}, {
					loader: 'sass-loader',
					options: {
						sourceMap: true,
					},
				}],
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.join(__dirname, 'src/docs/index.html'),
		}),
	],
	resolve: {
		extensions: ['.js', '.jsx'],
	},
	devServer: {
		contentBase: path.join(__dirname, 'build'),
		port: 7770,
		overlay: true,
	},
	mode: 'development',
};
