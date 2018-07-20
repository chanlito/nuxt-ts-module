const { resolve } = require('path');

module.exports = {
  build: { progress: false, },
  rootDir: resolve(__dirname, '.'),
  modules: ['../'],
  typescript: {
    checker: {
      tsconfig: resolve(__dirname, 'tsconfig.json'),
    },
  },
};
