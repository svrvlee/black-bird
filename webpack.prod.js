const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: './src/js/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'black-bird/static/js/bundle.[hash:8].min.js',
  },
  plugins: [
    new CleanWebpackPlugin('build'),
    new ExtractTextPlugin({
      filename: 'black-bird/static/css/styles.[hash:8].min.css'
    }),
    new HtmlWebpackPlugin({
      template: './src/index.pug',
      filename: 'index.html'
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      mangle: {
        screw_ie8: true,
        keep_fnames: true
      },
      compress: {
        screw_ie8: true
      },
      comments: false
    })
  ],
  module: {
    rules: [
      {
        test: /\.pug$/,
        loader: "pug-loader"
      },
      {
        test: /\.(jpg|png|svg)$/,
        loader: 'file-loader',
        query: {
          outputPath: 'black-bird/static/images/',
          name: '[name].[ext]',
        },
      },
      {
        test: /\.scss$/, 
        use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              'css-loader',
              { 
                loader: 'postcss-loader',
                options: { 
                  plugins: (loader) => [
                    require('autoprefixer')()
                  ]
                }
              },
              'sass-loader'
            ],
            publicPath: '/'
        })
      }
    ]
  }
}
