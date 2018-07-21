# Nuxt Typescript Module


[![npm](https://img.shields.io/npm/v/nuxt-ts-module.svg)](https://www.npmjs.com/package/nuxt-ts-module)
[![npm](https://img.shields.io/npm/dt/nuxt-ts-module.svg)](https://www.npmjs.com/package/nuxt-ts-module)
[![Build Status](https://travis-ci.org/chanlito/nuxt-ts-module.svg?branch=master)](https://travis-ci.org/chanlito/nuxt-ts-module)
[![Coverage Status](https://coveralls.io/repos/github/chanlito/nuxt-ts-module/badge.svg?branch=master)](https://coveralls.io/github/chanlito/nuxt-ts-module?branch=master)

A tiny module to use Typescript within Nuxt 2.

## Setup

* Install the module.

```bash
npm install nuxt-ts-module
```

## Usage

* inside `nuxt.config.js`
```js
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
