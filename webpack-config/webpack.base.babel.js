import HtmlWebPackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import FaviconsWebpackPlugin from 'favicons-webpack-plugin';
import path from 'path';

export default {
  entry: ['babel-polyfill', path.resolve(__dirname, '../../src/client/app/index.jsx')],
  output: {
    filename: '[name].[chunkhash].bundle.js',
    chunkFilename: '[name].[chunkhash].bundle.js',
    path: path.resolve(__dirname, '../../dist'),
  },
  resolve: {
    extensions: ['.js', '.json', '.jsx'],
    modules: [path.resolve('./node_modules')],
    alias: {
      client: path.resolve(__dirname, '../../src/client/'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              plugins: ['lodash'],
            },
          },
          'eslint-loader',
          'stylelint-custom-processor-loader',
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
      template: './src/client/app/index.ejs',
      filename: './index.html',
    }),
    new MiniCssExtractPlugin({
      filename: '[hash].css',
      chunkFilename: '[hash].css',
    }),
    new FaviconsWebpackPlugin(path.resolve(__dirname, '../../favicon.png')),
    new LodashModuleReplacementPlugin({
      paths: true,
    }),
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
    port: 2828,
    host: '0.0.0.0',
    historyApiFallback: true,
  },
};
