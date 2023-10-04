const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.tsx',
  devtool: 'source-map',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, './dist'),
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: ['ts-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.svg$/,
        exclude: [/node_modules/],
        loader: '@svgr/webpack',
        options: {
          svgo: false,
        }
      },
      {
        test: /\.svg$/,
        include: [/node_modules/],
        exclude: [/src/],
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'assets/'
        }
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'assets/'
        }
      }
    ]
  },
  devServer: {
    static: path.join(__dirname, '../../dist'),
    historyApiFallback: true,
    port: 5000,
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.FIREBASE_APP_ID': JSON.stringify(process.env.NEW_EDEN_APP_ID),
      'process.env.FIREBASE_MEASUREMENT_ID': JSON.stringify(process.env.NEW_EDEN_MEASUREMENT_ID),
    }),
    new webpack.EnvironmentPlugin([
      'NEW_EDEN_API_KEY',
    ]),
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
      chunkFilename: '[id].css',
    }),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      title: 'New Eden',
      filename: 'index.html',
      template: path.join(__dirname, './template.ejs'),
    }),
  ],
  resolve: {
    plugins: [
      new TsconfigPathsPlugin({
        configFile: path.resolve(__dirname, './tsconfig.json'),
      })
    ],
    extensions: ['.ts', '*.scss', '.tsx', '.js']
  }
};