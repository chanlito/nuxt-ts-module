const os = require('os');
const combineLoaders = require('webpack-combine-loaders');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = async function TypeScriptModule(moduleOptions) {
  const options = Object.assign(
    {
      useThreads: false,
    },
    this.options.typescript,
    moduleOptions,
  );

  const forkTSCheckerOptions = {
    checkSyntacticErrors: true,
    workers: ForkTsCheckerWebpackPlugin.ONE_CPU,
    formatter: 'codeframe',
    watch: ['client'],
    vue: true,
    ...options.forkTSCheckerOptions,
  };

  // Add .ts extension for store, middleware and more
  this.nuxt.options.extensions.push('ts');
  this.nuxt.options.extensions.push('tsx');

  // Extend build
  this.extendBuild(config => {
    const loaders = [];

    if (options.useThreads) {
      loaders.push(
        { loader: 'cache-loader' },
        {
          loader: 'thread-loader',
          options: {
            workers: os.cpus().length - forkTSCheckerOptions.workers,
          },
        },
      );
    }

    loaders.push({
      loader: 'ts-loader',
      options: {
        appendTsSuffixTo: [/\.vue$/],
        transpileOnly: true,
        happyPackMode: options.useThreads,
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
    for (const rule of config.module.rules) {
      if (rule.loader === 'vue-loader') {
        rule.options.loaders = rule.options.loaders || {};
        rule.options.loaders.ts = rule.options.loaders.tsx = loader;
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
    if (config.name === 'server') {
      config.plugins.push(new ForkTsCheckerWebpackPlugin(forkTSCheckerOptions));
    }
  });
};

module.exports.meta = require('./package.json');
