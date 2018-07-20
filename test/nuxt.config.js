const { resolve } = require('path');

module.exports = {
  modules: ['../'],
  rootDir: resolve(__dirname, '.'),
  typescript: {
    checker: {
      tsconfig: resolve(__dirname, 'tsconfig.json'),
    },
  },
};
