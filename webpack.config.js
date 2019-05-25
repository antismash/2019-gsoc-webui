const HtmlWebPackPlugin = require('html-webpack-plugin');

const isProduction = typeof process.env.NODE_ENV !== 'undefined' && NODE_ENV === 'production';
const mode = isProduction ? 'production' : 'development';
const devtool = isProduction ? false : 'inline-source-map';

module.exports = {
  entry: "./src/index.ts",
  devtool: "source-map",
  mode,
  devtool,
  output: {
    path: __dirname + "/dist",
    filename: "bundle.js"
  },
  resolve: {
      // Add '.ts' and '.tsx' as resolvable extensions.
      extensions: [".ts", ".js", ".json"]
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: [/\.ts$/],
        exclude: /node_modules/,
        use: [
          {
            loader: "awesome-typescript-loader",
          }
        ],
      },
      {
        test: /\*.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
          }
        ],
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: { minimize: true }
          }
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader'
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html"
    }),
  ]
}