const path = require('path');
const TerserJSPlugin = require('terser-webpack-plugin'); // Оптимизирует js файлы
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin'); // Оптимизирует css файлы
const HtmlWebpackPlugin = require('html-webpack-plugin');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: { bundle: './src/App.js' },

  // and output it into /dist as bundle.js
  output: {
    path: path.join(__dirname, '/web'),
    filename: '[name].[hash].js',
  },
  mode: 'development',
  optimization: {
    minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
  devServer: {
    overlay: true,
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanStaleWebpackAssets: true,
      dirty: true,
    }),
    new HtmlWebpackPlugin({
      template: './index_template.html',
    }),
  ],
};
