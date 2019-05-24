const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env, argv) => {
  const compressArgs = argv.mode === 'production' ? { 'drop_console': true } : false;
  const cssNamespacing = argv.mode !== 'production' ? '[path][local]' : '[folder][hash]';
  const chunkName = argv.mode !== 'production' ? '[name].' : '[chunkhash].';
  const cleanPatterns = ['*.js', '!*.config.js', '*.css', '!node_modules/**'];

  return {
    entry: `${__dirname}/src/index.tsx`,
    output: {
      filename: 'index.js',
      chunkFilename: chunkName + 'js',
      publicPath: '/',
      path: `${__dirname}/`,
    },
    devServer: {
      contentBase: __dirname,
      hot: true
    },
    plugins: [
      new CleanWebpackPlugin({
        cleanOnceBeforeBuildPatterns: cleanPatterns,
      }),
      new webpack.WatchIgnorePlugin([
        /\.d\.ts$/
      ]),
      new MiniCssExtractPlugin({
        filename: 'main.css',
        chunkFilename: chunkName + 'css',
      }),
      new OptimizeCssAssetsPlugin({
        assetNameRegExp: /.css$/g,
      }),
      new webpack.HotModuleReplacementPlugin(),
      new HtmlWebpackPlugin({
        title: 'PMKro'
      }),
    ],
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.css'],
      plugins: [new TsconfigPathsPlugin({ configFile: path.resolve(__dirname, 'tsconfig.json') })],
    },
    module: {
      rules: [
        {
          test: /\.scss$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'typings-for-css-modules-loader',
              options: {
                modules: true,
                namedExport: true,
                camelCase: true,
                localIdentName: cssNamespacing
              }
            },
            'sass-loader'
          ]
        },
        { test: /\.css$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'typings-for-css-modules-loader',
              options: {
                modules: true,
                namedExport: true,
                localIdentName: cssNamespacing
              }
            }
          ]
        },
        {
          test: /\.tsx?$/,
          loader: 'awesome-typescript-loader',
          options: {
            configFileName: path.resolve(__dirname, 'tsconfig.json'),
          }
        },
      ]
    },
    optimization: {
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            ecma: 8,
            warnings: false,
            parse: {},
            compress: compressArgs,
            mangle: true,
            module: false,
            output: null,
            toplevel: false,
            nameCache: null,
            ie8: false,
            'keep_classnames': false,
            'keep_fnames': false,
            safari10: false,
          }
        }),
      ],
      splitChunks: {
        maxSize: 200000,
        hidePathInfo: true,
        cacheGroups: {
          vendors: {
            reuseExistingChunk: true,
          }
        },
      },
    },
    stats: { children: false },
    devtool: argv.mode === 'production' ? 'source-map' : 'cheap-inline-source-map'
  };
};
