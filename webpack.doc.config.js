const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // eslint-disable-line
const ExtractTextPlugin = require('extract-text-webpack-plugin'); // eslint-disable-line
const CleanWebpackPlugin = require('clean-webpack-plugin'); // eslint-disable-line
const webpack = require('webpack'); // eslint-disable-line
const UglifyJSPlugin = require('uglifyjs-webpack-plugin'); // eslint-disable-line
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
	filename: 'style-[hash].css',
});


module.exports = {
	entry: path.join(__dirname, 'src/docs/index.jsx'),
	output: {
		path: path.join(__dirname, 'docs'),
		filename: 'bundle.js',
	},
	devtool: 'source-map',
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				use: ['babel-loader'],
				exclude: /node_modules/,
			},
			{
				test: /\.css$/,
				use: extractSass.extract({
					fallback: 'style-loader',
					use:[{
						loader: 'css-loader',
						options: {
							importLoaders: 1,
							sourceMap: true,
						},
					}, {
						loader: 'postcss-loader',
						options: {
							sourceMap: true,
						},
					}],
				}),
			},
			{
				test: /\.scss$/,
				use: extractSass.extract({
					fallback: 'style-loader',
					use: [{
						loader: 'css-loader',
						options: {
							importLoaders: 1,
							sourceMap: true,
						},
					}, {
						loader: 'postcss-loader',
						options: {
							sourceMap: true,
						},
					}, {
						loader: 'sass-loader',
						options: {
							sourceMap: true,
						},
					}],
				}),
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf|svg|png|jpg|gif)(\?v=\d+\.\d+\.\d+)?$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: 'asset-[hash].[ext]',
						},
					},
				],
			},
		],
	},
	plugins: [
		new CleanWebpackPlugin(['docs']),
		addBanner,
		new UglifyJSPlugin({
			sourceMap: true,
		}),
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
