const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const path = require("path");
const { InjectManifest } = require("workbox-webpack-plugin");

module.exports = () => {
	return {
		mode: "development",
		// Entry point for files.
		entry: {
			main: "./src/js/index.js",
			install: "./src/js/install.js",
		},
		// Output for our bundles.
		output: {
			filename: "[name].bundle.js",
			path: path.resolve(__dirname, "dist"),
		},
		plugins: [
			// Webpack plugin that generates our html file and injects our bundles.
			new HtmlWebpackPlugin({
				template: "./index.html",
				title: "Just Another Text Editor",
			}),

			// Injects our custom service worker.
			new InjectManifest({
				swSrc: "./src-sw.js",
				swDest: "src-sw.js",
			}),

			// Creates a manifest.json file.
			new WebpackPwaManifest({
				fingerprints: false,
				inject: true,
				name: "Just Another Text Editor",
				short_name: "J.A.T.E.",
				description: "Create notes with or without an internet connection!",
				background_color: "#272822",
				theme_color: "#272822",
				start_url: "./",
				publicPath: "./",
				icons: [
					{
						src: path.resolve("src/images/logo.png"),
						sizes: [96, 128, 192, 256, 384, 512],
						destination: path.join("assets", "icons"),
					},
				],
			}),
		],

		module: {
			rules: [
				// Add CSS loaders to webpack.
				{
					test: /\.css$/i,
					use: ["style-loader", "css-loader"],
				},
				// Add babel to webpack in order to use ES6.
				{
					test: /\.m?js$/,
					exclude: /node_modules/,
					use: {
						loader: "babel-loader",
						options: {
							presets: ["@babel/preset-env"],
							plugins: [
								"@babel/plugin-proposal-object-rest-spread",
								"@babel/transform-runtime",
							],
						},
					},
				},
			],
		},
	};
};
