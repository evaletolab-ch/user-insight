var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var devConfig = require('./webpack.config.js');


devConfig.output = {
	path: path.resolve('build/web'),
	filename: '[name]_[chunkhash].js'
};
devConfig.plugins = [
	new ExtractTextPlugin("css/[name]_[chunkhash].css"),
	new webpack.optimize.CommonsChunkPlugin({
		name: ['vendors', 'polyfills']
	}),
	new HtmlWebpackPlugin({
		title: 'Production Application',
		template: 'index.html',
		inject: false,
		isDev: false
	}),
	new CopyWebpackPlugin([
		{from: '', to: ''}
	], {
		ignore: ['index.html', '*.js', '*.ts', 'less/**/*']
	}),
	new webpack.optimize.UglifyJsPlugin({
			sourceMap: false,
			mangle: true
		}
	)
];
module.exports = devConfig;