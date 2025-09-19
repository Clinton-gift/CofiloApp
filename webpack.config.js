/* eslint-disable no-undef */
/* eslint-disable no-undef */
// const createExpoWebpackConfigAsync = require('@expo/webpack-config');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const CopyWebpackPlugin = require('copy-webpack-plugin');
// const path = require('path');

// module.exports = async function(env, argv) {
//   const config = await createExpoWebpackConfigAsync(env, argv);

//   // Ensure only one instance of HtmlWebpackPlugin
//   config.plugins = config.plugins.filter(
//     plugin => !(plugin instanceof HtmlWebpackPlugin)
//   );

//   config.plugins.push(
//     new HtmlWebpackPlugin({
//       template: './src/index.html',
//       filename: 'index.html',
//       inject: 'body',
//       meta: {
//         viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no',
//         description: 'Child Behavior Check-in',
//       },
//       link: [
//         { rel: 'manifest', href: '/manifest.json' },
//         { rel: 'icon', href: '/assets/favicon.png', sizes: '192x192' },
//         { rel: 'icon', href: '/assets/favicon.png', sizes: '512x512' }
//       ]
//     }),
//     new CopyWebpackPlugin({
//       patterns: [
//         { from: path.resolve(__dirname, 'manifest.json'), to: config.output.path },
//         { from: path.resolve(__dirname, 'service-worker.js'), to: config.output.path },
//         { from: path.resolve(__dirname, 'assets'), to: path.join(config.output.path, 'assets') }
//       ]
//     })
//   );

//   return config;
// };
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
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/index.html'),
      filename: 'index.html',
      inject: 'body',
      meta: {
        viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no',
        description: 'Cofilo',
      },
      // NOTE: HtmlWebpackPlugin doesn't read a `link` array.
      // Put <link rel="manifest" ...> and icons directly in src/index.html.
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
    process: require.resolve('process/browser'),
    buffer: require.resolve('buffer'),
  };
  return config;
};



// webpack.config.js
// const createExpoWebpackConfigAsync = require('@expo/webpack-config');
// const webpack = require('webpack');

// module.exports = async function (env, argv) {
//   // Get the default Expo Webpack config
//   const config = await createExpoWebpackConfigAsync(env, argv);

//   // --- 1) SVGs as React components on web (match Metro's svg transformer) ---
//   // import Icon from '../assets/icon.svg';  -> <Icon />
//   config.module.rules.push({
//     test: /\.svg$/i,
//     issuer: /\.[jt]sx?$/,
//     use: [
//       {
//         loader: require.resolve('@svgr/webpack'),
//         options: {
//           // keep viewBox so icons stay scalable
//           svgo: true,
//           svgoConfig: { plugins: [{ name: 'removeViewBox', active: false }] },
//           titleProp: true,
//           ref: true,
//         },
//       },
//     ],
//   });

//   // --- 2) Polyfills for Node core modules some deps use on web ---
//   config.resolve.fallback = {
//     ...(config.resolve.fallback || {}),
//     crypto: require.resolve('crypto-browserify'),
//     stream: require.resolve('stream-browserify'),
//     vm: require.resolve('vm-browserify'),
//     buffer: require.resolve('buffer/'),
//     process: require.resolve('process/browser'),
//     util: require.resolve('util/'),
//     assert: require.resolve('assert/'),
//     path: require.resolve('path-browserify'),
//   };

//   // Provide globals
//   config.plugins = [
//     ...(config.plugins || []),
//     new webpack.ProvidePlugin({
//       Buffer: ['buffer', 'Buffer'],
//       process: ['process'],
//     }),
//   ];

//   return config;
// };


// // webpack.config.js
// const createExpoWebpackConfigAsync = require('@expo/webpack-config');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const CopyWebpackPlugin = require('copy-webpack-plugin');
// const webpack = require('webpack');
// const path = require('path');

// module.exports = async function (env, argv) {
//   const config = await createExpoWebpackConfigAsync(env, argv);

//   // 1) De-dupe the default HtmlWebpackPlugin
//   config.plugins = (config.plugins || []).filter(
//     (p) => !(p instanceof HtmlWebpackPlugin)
//   );

//   // 2) Our HtmlWebpackPlugin (let it inject scripts)
//   config.plugins.push(
//     new HtmlWebpackPlugin({
//       template: path.resolve(__dirname, 'src/index.html'),
//       filename: 'index.html',
//       inject: 'body',
//       meta: {
//         viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no',
//         description: 'Cofilo',
//       },
//       favicon: path.resolve(__dirname, 'assets/images/favicon.png'),
//     })
//   );

//   // 3) Copy static PWA bits (optional)
//   config.plugins.push(
//     new CopyWebpackPlugin({
//       patterns: [
//         { from: path.resolve(__dirname, 'manifest.json'), to: config.output.path },
//         { from: path.resolve(__dirname, 'service-worker.js'), to: config.output.path },
//         { from: path.resolve(__dirname, 'assets'), to: path.join(config.output.path, 'assets') },
//       ],
//     })
//   );

//   // 4) Node polyfills some deps expect on web
//   config.resolve = {
//     ...config.resolve,
//     fallback: {
//       ...(config.resolve?.fallback || {}),
//       crypto: require.resolve('crypto-browserify'),
//       stream: require.resolve('stream-browserify'),
//       vm: require.resolve('vm-browserify'),
//       buffer: require.resolve('buffer/'),
//       process: require.resolve('process/browser'),
//       util: require.resolve('util/'),
//       assert: require.resolve('assert/'),
//       path: require.resolve('path-browserify'),
//     },
//   };

//   config.plugins.push(
//     new webpack.ProvidePlugin({
//       Buffer: ['buffer', 'Buffer'],
//       process: ['process'],
//     })
//   );

//   // 5) Ensure correct asset URLs
//   config.output = {
//     ...config.output,
//     publicPath: '/',
//   };

//   return config;
// };
