const Path = require('path');
const { merge } = require('webpack-merge');
const entry = require('./webpack.config');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = merge(entry, {
	mode: 'development',
	output: {
		clean: true,
		path: Path.resolve(__dirname, 'devPack'),
		filename: '[name].bundle.js',
		assetModuleFilename: 'assets/[name][ext]',
	},
	devtool: 'source-map',
	devServer: {
		static: {
			directory: Path.resolve(__dirname, 'devPack'),
		},
		watchFiles: ['./src/*.html'],
		port: 4500,
		open: true,
		hot: true,
		compress: true,
		historyApiFallback: true,
	},
	plugins: [
		new HtmlWebpackPlugin({
			filename: 'index.html',
			inject: 'head',
			scriptLoading: 'defer',
			template: './src/index.html',
		}),
		new MiniCssExtractPlugin({
			filename: 'bundle.css',
		}),
	],
	module: {
		rules: [
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader'],
			},
			{
				test: /\.html$/,
				use: ['html-loader'],
			},
			{
				test: /\.(png|jpg|gif|svg)$/,
				type: 'asset/resource',
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[name].[ext]',
							outputPath: 'assets/fonts/',
						},
					},
				],
			},
		],
	},
});
