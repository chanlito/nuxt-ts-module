# Nuxt Typescript Module

Use Typescript within Nuxt.js application seamlessly.

## Setup

* Install the module.
```bash
npm install nuxt-ts-module
```

* Install its peer dependencies.
```bash
npm install nuxt-ts-module
```

```js
// inside nuxt.config.js

{
  // ...
  modules: [
    'nuxt-ts-module'
  ],
  typescript: {
    useThreads: true, // default is false
    forkTSCheckerOptions: {
      tsconfig: resolve('.', 'client/tsconfig.json'), // use your own config file
      tslint: resolve('.', 'tslint.json'), // use your own config file
      // ... check fork-ts-checker-plugins docs for more options
    },
  },
  // ...
}
```
