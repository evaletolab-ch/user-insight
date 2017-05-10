var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	context: path.resolve('src'),
	entry: {
		default: './less/styles.less',
		polyfills: './polyfills.ts',
		vendors: './vendors.ts',
		client: './boot.ts'
	},
	output: {
		path: path.resolve('build/dev'),
		filename: '[name].js'
	},
	module: {
		loaders: [
			{
				test: /\.ts$/,
				loaders: ['awesome-typescript-loader']
			},
			{
				test: /.(png|jpg|jpeg|gif|svg|woff|woff2|eot|ttf)(.*)$/,
				loader: 'url-loader?limit=100000'
			},
			{
				test: /\.css$/, //font awesome
				loader: 'style-loader!css-loader'
			},
			{
				test: /\.less$/,
				exclude: /node_modules/,
				loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader")
			}
		]
	}, resolve: {
		extensions: ['', '.ts', '.html', '.js'],
		modulesDirectories: [
			'node_modules'
		]
	},
	plugins: [
		new ExtractTextPlugin("css/[name].css"),
		new webpack.optimize.CommonsChunkPlugin({
			name: ['vendors', 'polyfills']
		}),
		new HtmlWebpackPlugin({
			title: 'Application Development',
			template: 'index.html',
			inject: false,
			isDev: true
		}),
		new CopyWebpackPlugin([
			{from: '', to: ''}
		], {
			ignore: ['index.html', '*.js', '*.ts', 'less/**/*']
		})
	]
};
