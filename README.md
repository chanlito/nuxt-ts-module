# Nuxt Typescript Module

A tiny module to use Typescript within Nuxt.js application.

## Setup

* Install the module.

```bash
npm install nuxt-ts-module
```

* Install its peer dependencies.

```bash
npm install -D cache-loader thread-loader fork-ts-checker-webpack-plugin webpack-combine-loaders ts-loader@3 # use ts-loader@4 for Nuxt 2
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
    useThreads: false, // set to `true` to use `cache-loader` & `thread-loader`
    forkTSCheckerOptions: {}, // options available here: https://github.com/Realytics/fork-ts-checker-webpack-plugin#options
  },
  // ...
}
```

## LICENSE
MIT
