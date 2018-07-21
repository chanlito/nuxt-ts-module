const { resolve } = require('path');

module.exports = {
  build: { progress: false },
  rootDir: resolve(__dirname, '.'),
  modules: ['../'],
};
