import webpack from 'webpack';
import path from 'path';

const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  entry: [
    path.join(__dirname, './app.js'),
  ],
  mode: "development",
  optimization: {
		minimizer: [
			new TerserPlugin({
				terserOptions: {
					output: {
						comments: false,
					},
				},
			})
		],
	},
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        options: { presets: ["@babel/env"] }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  resolve: { extensions: ["*", ".js", ".jsx"] },
  output: {
    path: path.resolve(__dirname, "src/dist/"),
    publicPath: "/dist/",
    filename: "bundle.js",
    hotOnly: true
  },
  devServer: {
    contentBase: path.join(__dirname, "public/"),
    port: 3000,
    publicPath: "http://localhost:3000/dist/",
    watchContentBase: true,
    progress: true,
		compress: true,
		hot: true,
		historyApiFallback: true
  },
  plugins: [new webpack.HotModuleReplacementPlugin()]
};
