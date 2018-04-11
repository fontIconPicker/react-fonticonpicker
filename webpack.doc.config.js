const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // eslint-disable-line
const ExtractTextPlugin = require('extract-text-webpack-plugin'); // eslint-disable-line
const CleanWebpackPlugin = require('clean-webpack-plugin'); // eslint-disable-line
const FaviconsWebpackPlugin = require('favicons-webpack-plugin'); // eslint-disable-line
const HtmlWebpackInlineSVGPlugin = require('html-webpack-inline-svg-plugin'); // eslint-disable-line
const CopyWebpackPlugin = require('copy-webpack-plugin'); // eslint-disable-line
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
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

Copyright (c) ${new Date().getFullYear()} Swashata Ghosh <swashata@wpquark.com>

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
	filename: 'style-[name].css',
});

module.exports = {
	entry: path.join(__dirname, 'src/docs/index.jsx'),
	output: {
		path: path.join(__dirname, 'docs'),
		filename: 'bundle-[name].js',
		publicPath: 'https://fonticonpicker.github.io/react-fonticonpicker/',
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
					use: [
						{
							loader: 'css-loader',
							options: {
								importLoaders: 1,
								sourceMap: true,
							},
						},
						{
							loader: 'postcss-loader',
							options: {
								sourceMap: true,
							},
						},
					],
				}),
			},
			{
				test: /\.scss$/,
				use: extractSass.extract({
					fallback: 'style-loader',
					use: [
						{
							loader: 'css-loader',
							options: {
								importLoaders: 1,
								sourceMap: true,
							},
						},
						{
							loader: 'postcss-loader',
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
				}),
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf|svg|png|jpg|gif)(\?v=\d+\.\d+\.\d+)?$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: 'asset-[hash].[ext]',
							outputPath: 'assets/',
						},
					},
				],
			},
			{
				test: /\.(md)$/,
				use: 'raw-loader',
			},
		],
	},
	plugins: [
		new CleanWebpackPlugin(['docs']),
		new FaviconsWebpackPlugin({
			logo: path.join(__dirname, 'src/docs/picker.png'),
			prefix: 'favicons/',
			background: 'transparent',
			theme_color: '#E3F2FD',
			title: 'React fontIconPicker',
		}),
		addBanner,
		new UglifyJSPlugin({
			sourceMap: true,
		}),
		new HtmlWebpackPlugin({
			template: path.join(__dirname, 'src/docs/index.html'),
			svgoConfig: {
				removeHiddenElems: false,
			},
		}),
		new HtmlWebpackInlineSVGPlugin({
			runPreEmit: true,
		}),
		extractSass,
		new CopyWebpackPlugin([
			{
				from: './src/docs/404.html',
				to: './404.html',
			},
			{
				from: './fonticonpicker.png',
				to: './fonticonpicker.png',
			},
		]),
		new BundleAnalyzerPlugin({
			analyzerMode: 'static',
		}),
	],
	resolve: {
		extensions: ['.js', '.jsx'],
	},
	optimization: {
		splitChunks: {
			chunks: 'async',
			minSize: 30000,
			minChunks: 1,
			maxAsyncRequests: 5,
			maxInitialRequests: 3,
			automaticNameDelimiter: '~',
			name: true,
			cacheGroups: {
				vendors: {
					test: /[\\/]node_modules[\\/]/,
					name: 'vendors',
					chunks: 'all',
				},
				library: {
					test: /[\\/]src\/js[\\/]/,
					name: 'library',
					chunks: 'all',
				},
				docs: {
					test: /[\\/]src\/docs[\\/]/,
					name: 'docs',
					chunks: 'all',
				},
			},
		},
	},
	mode: 'production',
};
