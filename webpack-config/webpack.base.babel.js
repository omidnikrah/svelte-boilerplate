import HtmlWebPackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import FaviconsWebpackPlugin from 'favicons-webpack-plugin';
import path from 'path';

export default {
  entry: [path.resolve(__dirname, '../src/app/index.js')],
  output: {
    filename: '[name].[chunkhash].bundle.js',
    chunkFilename: '[name].[chunkhash].bundle.js',
    path: path.resolve(__dirname, '../dist'),
  },
  resolve: {
    extensions: ['.js', '.json', '.svelte'],
    modules: [path.resolve('./node_modules')],
    alias: {
      src: path.resolve(__dirname, '../src/'),
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          },
          'eslint-loader',
        ],
      },
      {
        test: /\.svelte$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'svelte-loader',
            options: {
              hotReload: true,
            },
          },
          'eslint-loader',
        ],
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: { minimize: true },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(png|jpg|woff|woff2|eot|ttf|svg)(\?.*$|$)/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './src/app/index.ejs',
      filename: './index.html',
    }),
    new MiniCssExtractPlugin({
      filename: '[hash].css',
      chunkFilename: '[hash].css',
    }),
    new FaviconsWebpackPlugin(path.resolve(__dirname, '../favicon.png')),
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all',
        },
      },
    },
  },
  devServer: {
    contentBase: path.join(__dirname, '../../dist'),
    compress: true,
    port: 2222,
    host: '0.0.0.0',
    historyApiFallback: true,
  },
};
