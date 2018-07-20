# Nuxt Typescript Module

[![Build Status](https://travis-ci.org/chanlito/nuxt-ts-module.svg?branch=master)](https://travis-ci.org/chanlito/nuxt-ts-module)
[![Coverage Status](https://coveralls.io/repos/github/chanlito/nuxt-ts-module/badge.svg?branch=master)](https://coveralls.io/github/chanlito/nuxt-ts-module?branch=master)

A tiny module to use Typescript within Nuxt.js application.

## Setup

* Install the module.

```bash
npm install nuxt-ts-module
```

* Install its peer dependencies.

```bash
npm install -D cache-loader thread-loader fork-ts-checker-webpack-plugin webpack-combine-loaders ts-loader # use ts-loader@3 for Nuxt version 1
```

I'll assume that you have already installed `Typescript` and possibly `TSLint`.

```js
// inside nuxt.config.js
{
  // ...
  modules: ['nuxt-ts-module'],
  // ...
}
```

```js
// or with some options
{
  // ...
  modules: ['nuxt-ts-module'],
  typescript: {
    cache: false, // set to `true` to use `cache-loader`
    thread: false, // set to `true` to use `thread-loader`
    checker: {}, // options available here: https://github.com/Realytics/fork-ts-checker-webpack-plugin#options
  },
  // ...
}
```

## LICENSE
MIT
