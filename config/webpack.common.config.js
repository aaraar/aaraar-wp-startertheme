const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const webpack = require("webpack");

module.exports = {
	entry: "./src/js/index.js",
	output: {
		path: path.resolve(__dirname, "../assets/js"),
		filename: "[name].js"
	},
	resolve: {
		extensions: [".js"]
	},
	module: {
		rules: [
			{
				test: [/.js$/],
				exclude: /(node_modules)/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ["@babel/preset-env"]
					}
				}
			},
			{
				test: [/.css$|.scss$/],
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options:{
							publicPath: "../"
						}
					},
					{
						loader: "css-loader",
						options: {
							importLoaders: 2,
						},

					},
					{loader: "postcss-loader"},
					{loader: "sass-loader"}
				]
			},
			{
				test: /\.(png|jpg|gif|svg)$/,
				use: [
					{
						loader: "file-loader",
						options: {
							name: "[name].[ext]",
							outputPath: "assets/images"
						}
					}
				]
			}
		]
	},
	plugins: [
		new CleanWebpackPlugin(),
		new MiniCssExtractPlugin({
			filename: "../../style.css"
		}),
		new CopyWebpackPlugin([
			{
				from: "./src/images",
				to: "assets/images"
			}
		])
	]
};
