'use strict';

const combineLoaders = require('webpack-combine-loaders');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

function TypeScriptModule(moduleOptions) {
  const moduleDefaultOptions = {
    cache: false,
    thread: false,
    checker: {
      checkSyntacticErrors: false,
      workers: ForkTsCheckerWebpackPlugin.ONE_CPU,
      formatter: 'codeframe',
      vue: true,
    },
  };

  const options = Object.assign(
    moduleDefaultOptions,
    this.options.typescript,
    moduleOptions,
  );

  this.nuxt.options.extensions.push('ts');
  this.nuxt.options.extensions.push('tsx');

  this.extendBuild(config => {
    const loaders = [];

    if (options.cache === true) {
      loader.push({ loader: 'cache-loader' });
    } else if (typeof options.cache === 'object') {
      loader.push({ loader: 'cache-loader', options: options.cache });
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
      if (
        options.thread &&
        options.checker &&
        options.checker.checkSyntacticErrors
      ) {
        options.checker.checkSyntacticErrors = true;
      }
      config.plugins.push(new ForkTsCheckerWebpackPlugin(options.checker));
    }
  });
}

module.exports = TypeScriptModule;

module.exports.meta = require('./package.json');
