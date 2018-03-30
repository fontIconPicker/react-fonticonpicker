const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin'); // eslint-disable-line // eslint-disable-line
const UglifyJSPlugin = require('uglifyjs-webpack-plugin'); // eslint-disable-line
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
	filename: 'react-fonticonpicker.css',
});


module.exports = {
	entry: path.join(__dirname, 'src/js/FontIconPicker.js'),
	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'react-fonticonpicker.js',
		library: 'FontIconPicker',
		libraryTarget: 'umd',
	},
	devtool: 'source-map',
	externals: {
		react: {
			commonjs: 'react',
			commonjs2: 'react',
			amd: 'react',
			root: 'React',
		},
		'react-dom': {
			commonjs: 'react-dom',
			commonjs2: 'react-dom',
			amd: 'react-dom',
			root: 'ReactDOM',
		},
		'prop-types': {
			commonjs: 'prop-types',
			commonjs2: 'prop-types',
			amd: 'prop-types',
			root: 'PropTypes',
		},
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
		],
	},
	plugins: [
		addBanner,
		new UglifyJSPlugin({
			sourceMap: true,
		}),
		extractSass,
	],
	resolve: {
		extensions: ['.js', '.jsx'],
	},
	mode: 'production',
};
