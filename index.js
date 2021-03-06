'use strict';

const path = require('path');
const combineLoaders = require('webpack-combine-loaders');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

function TypeScriptModule(moduleOptions) {
  const tsconfigDefault = path.resolve(__dirname, 'tsconfig.default.json');

  const moduleDefaultOptions = {
    cache: false,
    thread: false,
    tsconfig: tsconfigDefault,
    tslint: undefined,
  };

  const options = {
    ...moduleDefaultOptions,
    ...this.options.typescript,
    ...moduleOptions,
  };

  this.nuxt.options.extensions.push('ts');
  this.nuxt.options.extensions.push('tsx');

  this.extendBuild(config => {
    const loaders = [];

    if (options.cache === true) {
      loaders.push({ loader: 'cache-loader' });
    } else if (typeof options.cache === 'object') {
      loaders.push({ loader: 'cache-loader', options: options.cache });
    }

    if (options.thread === true) {
      loaders.push({ loader: 'thread-loader' });
    } else if (typeof options.thread === 'object') {
      loaders.push({ loader: 'thread-loader', options: options.thread });
    }

    loaders.push({
      loader: 'ts-loader',
      options: {
        appendTsSuffixTo: [/\.vue$/],
        configFile: options.tsconfig,
        transpileOnly: true,
        happyPackMode: !!options.thread,
      },
    });

    const loader = combineLoaders(loaders);

    // Apply loader
    config.module.rules.push({
      test: /\.tsx?$/,
      exclude: /node_modules/,
      loader,
    });

    // Add TypeScript loader for vue files
    /* eslint-disable-next-line */
    for (const rule of config.module.rules) {
      if (rule.loader === 'vue-loader') {
        rule.options.loaders = rule.options.loaders || {};
        rule.options.loaders.ts = loader;
        rule.options.loaders.tsx = loader;
      }
    }

    // Add .ts extension in webpack resolve
    if (config.resolve.extensions.indexOf('.ts') === -1) {
      config.resolve.extensions.push('.ts');
    }

    if (config.resolve.extensions.indexOf('.tsx') === -1) {
      config.resolve.extensions.push('.tsx');
    }

    // Add a fork ts checker webpack plugin
    if (config.name === 'client') {
      const tsCheckerDefaultOptions = {
        checkSyntacticErrors: !!options.thread,
        workers: ForkTsCheckerWebpackPlugin.ONE_CPU,
        formatter: 'codeframe',
        vue: true,
        tsconfig: options.tsconfig || tsconfigDefault,
      };
      config.plugins.push(
        new ForkTsCheckerWebpackPlugin(tsCheckerDefaultOptions),
      );
    }
  });
}

module.exports = TypeScriptModule;

module.exports.meta = require('./package.json');
