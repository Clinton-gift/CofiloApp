/* eslint-disable no-undef */
const createExpoWebpackConfigAsync = require('@expo/webpack-config');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
const path = require('path');

module.exports = async (env, argv) => {
  const config = await createExpoWebpackConfigAsync(env, argv);

  // Remove Expo's HtmlWebpackPlugin and WebpackManifestPlugin to avoid duplication/mismatch
  config.plugins = (config.plugins || []).filter(
    (p) => !['HtmlWebpackPlugin', 'WebpackManifestPlugin'].includes(p?.constructor?.name)
  );

  // Re-add *one* HtmlWebpackPlugin (use constructor name test to avoid "two copies" issues)
  config.plugins.push(
    // new HtmlWebpackPlugin({
    //   template: path.resolve(__dirname, 'src/index.html'),
    //   filename: 'index.html',
    //   inject: 'body',
    //   meta: {
    //     viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no',
    //     description: 'Cofilo',
    //   },
    //   // NOTE: HtmlWebpackPlugin doesn't read a `link` array.
    //   // Put <link rel="manifest" ...> and icons directly in src/index.html.
    // }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      inject: 'body',
      meta: {
        viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no',
        description: 'Cofilo',
      },
      link: [
        { rel: 'manifest', href: '/manifest.json' },
        { rel: 'icon', href: '/assets/images/cofilologo192x192.png', sizes: '192x192' },
        { rel: 'icon', href: '/assets/images/cofilologo512x512.png', sizes: '512x512' }
      ]
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: path.resolve(__dirname, 'manifest.json'), to: config.output.path },
        { from: path.resolve(__dirname, 'service-worker.js'), to: config.output.path },
        { from: path.resolve(__dirname, 'assets'), to: path.join(config.output.path, 'assets') }
      ]
    }),
    new NodePolyfillPlugin(),
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer'],
    })
  );

  // Keep existing resolve and add fallbacks
  config.resolve = {
    ...config.resolve,
    fallback: {
      ...config.resolve?.fallback,
      crypto: require.resolve('crypto-browserify'),
      stream: require.resolve('stream-browserify'),
      vm: require.resolve('vm-browserify'),
    },
  };

    // Provide Node polyfills for browser
  config.resolve.fallback = {
    ...(config.resolve.fallback || {}),
    stream: require.resolve('stream-browserify'),
    crypto: require.resolve('crypto-browserify'),
    vm: require.resolve('vm-browserify'),
  };
  return config;
};
