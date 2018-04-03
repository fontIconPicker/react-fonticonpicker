const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // eslint-disable-line
const CleanWebpackPlugin = require('clean-webpack-plugin'); // eslint-disable-line
const FaviconsWebpackPlugin = require('favicons-webpack-plugin'); // eslint-disable-line

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
				test: /\.css$/,
				use: [
					{
						loader: 'style-loader',
					},
					{
						loader: 'css-loader',
						options: {
							sourceMap: true,
						},
					},
				],
			},
			{
				test: /\.scss$/,
				use: [
					{
						loader: 'style-loader',
					},
					{
						loader: 'css-loader',
						options: {
							sourceMap: true,
						},
					},
					{
						loader: 'sass-loader',
						options: {
							sourceMap: true,
						},
					},
				],
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf|svg|png|jpg|gif)(\?v=\d+\.\d+\.\d+)?$/,
				use: [
					{
						loader: 'file-loader',
						options: {},
					},
				],
			},
		],
	},
	plugins: [
		new CleanWebpackPlugin(['build']),
		new FaviconsWebpackPlugin(path.join(__dirname, 'src/docs/picker.png')),
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
