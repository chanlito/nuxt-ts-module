# Nuxt Typescript Module

Use Typescript within Nuxt.js application seamlessly.

## Setup

* Install the module.

```bash
npm install nuxt-ts-module
```

* Install its peer dependencies.

```bash
npm install cache-loader thread-loader fork-ts-checker-webpack-plugin ts-loader@3.5.0 webpack-combine-loaders --save-dev
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
    useThreads: false,
    forkTSCheckerOptions: {},
  },
  // ...
}
```

## LICENSE
MIT
