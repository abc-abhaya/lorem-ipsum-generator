const Path = require('path');
const { merge } = require('webpack-merge');
const entry = require('./webpack.config');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = merge(entry, {
	mode: 'production',
	output: {
		clean: true,
		path: Path.resolve(__dirname, 'dist'),
		filename: '[name].bundle[contenthash:8].js',
		assetModuleFilename: 'assets/[name][contenthash:8][ext]',
	},
	plugins: [
		new HtmlWebpackPlugin({
			filename: 'index.html',
			inject: 'head',
			scriptLoading: 'defer',
			template: './src/index.html',
			minify: {
				removeComments: true,
				collapseWhitespace: true,
				removeRedundantAttributes: true,
				useShortDoctype: true,
				removeEmptyAttributes: true,
				removeStyleLinkTypeAttributes: true,
				keepClosingSlash: true,
				minifyJS: true,
				minifyCSS: true,
				minifyURLs: true,
			},
		}),
		new MiniCssExtractPlugin({
			filename: 'bundle[contenthash:8].css',
		}),
	],
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [MiniCssExtractPlugin.loader, 'css-loader'],
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
