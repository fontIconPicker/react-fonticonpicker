const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // eslint-disable-line
const ExtractTextPlugin = require('extract-text-webpack-plugin'); // eslint-disable-line
const webpack = require('webpack'); // eslint-disable-line
const pkg = require('./package.json');

const banner = `
React FontIconPicker

React Component to show a picker element to pick font-icons & svg

@author Swashata Ghosh <swashata@wpquark.com>
@version ${pkg.version}
@link https://github.com/fontIconPicker/react-fonticonpicker
@license MIT

Copyright (c) ${(new Date()).getFullYear()} Swashata Ghosh <swashata@wpquark.com>

This software is released under the MIT License.
https://opensource.org/licenses/MIT
`;

const addBanner = new webpack.BannerPlugin({
	banner,
	raw: false,
	entryOnly: true,
	include: /\.(js|jsx|css)$/,
});
const extractSass = new ExtractTextPlugin({
	filename: 'style.css',
});


module.exports = {
	entry: path.join(__dirname, 'src/docs/index.jsx'),
	output: {
		path: path.join(__dirname, 'docs'),
		filename: 'bundle.js',
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				use: ['babel-loader'],
				exclude: /node_modules/,
			},
			{
				test: /\.scss$/,
				use: extractSass.extract({
					fallback: 'style-loader',
					use: [{
						loader: 'css-loader',
						options: {
							importLoaders: 1,
						},
					}, {
						loader: 'postcss-loader',
					}, {
						loader: 'sass-loader',
					}],
				}),
			},
		],
	},
	plugins: [
		addBanner,
		new HtmlWebpackPlugin({
			template: path.join(__dirname, 'src/docs/index.html'),
		}),
		extractSass,
	],
	resolve: {
		extensions: ['.js', '.jsx'],
	},
	mode: 'production',
};
