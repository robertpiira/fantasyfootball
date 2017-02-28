var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var CopyWebpackPlugin = require('copy-webpack-plugin');
var phaserModule = path.join(__dirname, '/node_modules/phaser/')
var phaser = path.join(phaserModule, 'build/custom/phaser-split.js')
var pixi = path.join(phaserModule, 'build/custom/pixi.js')
var p2 = path.join(phaserModule, 'build/custom/p2.js')

module.exports = {

  entry: './src/index.js',

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'game.bundle.js'
  },

  module: {
    rules: [
      {
        test: /pixi.js/,
        loader: 'script-loader'
      },
      {
        test:  /p2.js/,
        loader: 'script-loader'
      },
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ['es2015']
          }
        }]
      },
      {
        test: /\.png$/,
        loader: 'file-loader'
      }
    ]
  },

  resolve: {
    alias: {
      'phaser': phaser,
      'pixijs': pixi,
      'p2': p2
    }
  },

  plugins: [
    new CopyWebpackPlugin([
      {
        from: 'src/assets',
        to: 'assets'
      }
    ]),
    new HtmlWebpackPlugin(
      {
        title: 'Fantasy Football Game',
        template: 'index.ejs'
      }
    )
  ]

}
