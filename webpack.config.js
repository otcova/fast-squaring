const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = mode => {
	const config = {
		entry: {
			index: path.resolve(__dirname, "src", "main.js")
		},
		resolve: {
			extensions: ['', '.js', '.jsx'],
		},
		module: {
			rules: [
				{
					test: /(?<!\.(off|worker))\.jsx?$/,
					exclude: /node_modules/,
					enforce: "pre",
					use: ["babel-loader"]
				},
				{
					test: /.+(?<!((?<!\.(off|worker))\.jsx?))$/i,
					use: [
						{
							loader: 'raw-loader',
							options: {
								esModule: false,
							},
						},
					],
				},
			]
		},
		plugins: [new HtmlWebpackPlugin({
			template: path.join("src", "index.html"),
			inject: "body"
		})],
	}
	const productionConfig = {
		mode: "production",
		devtool: "source-map",
		output: {
			path: path.resolve(__dirname, "dist"),
			filename: "[name].js",
			sourceMapFilename: "[name].js.map"
		},
	}
	const developmentConfig = {
		mode: "development",
		devtool: "source-map",
		output: {
			path: path.resolve(__dirname, "dist"),
			filename: "[name].js",
			sourceMapFilename: "[name].[fullhash].[chunkhash].[contenthash].js.map"
		},
		devServer: {
			hot: true, // no auto reload
			liveReload: true, // no auto reload
			static: {
				directory: path.join(__dirname, 'dist'),
			},
			// compress: true,
			port: 80,
			client: {
				logging: 'warn',
			},
			headers: {
				"Cross-Origin-Opener-Policy": "same-origin",
				"Cross-Origin-Embedder-Policy": "require-corp"
			},
		},
	}

	if (mode.production) return { ...config, ...productionConfig }
	else return { ...config, ...developmentConfig }
};