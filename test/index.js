const { resolve } = require('path');
const { expect } = require('chai');
const { Nuxt, Builder } = require('nuxt-edge');
const nuxtConfig = require('./nuxt.config');

let nuxt;

describe('Test #1 - Fork TS Checker + Cache + Thread', async () => {
  before(async () => {
    nuxtConfig.typescript = {
      cache: {
        cacheDirectory: resolve('.', '.cache-stuffs'),
      },
      thread: {
        workers: 2,
      },
    };
    nuxt = new Nuxt(nuxtConfig);
    await new Builder(nuxt).build();
    nuxt.listen(4000);
  });

  it('should respond `Hello World!`', async () => {
    const { html } = await nuxt.renderRoute('/');
    expect(html).to.have.string('<h1 class="green">Hello World!</h1>');
  });

  after(async () => {
    nuxt.close();
  });
});

describe('Test #2 - Without Fork TS Checker', async () => {
  before(async () => {
    nuxtConfig.typescript = {
      cache: true,
      thread: true,
      checker: false,
      loader: { tsconfig: resolve('.', 'tsconfig.default.json') },
    };
    nuxt = new Nuxt(nuxtConfig);
    await new Builder(nuxt).build();
    nuxt.listen(4000);
  });

  it('should respond `Hello World!`', async () => {
    const { html } = await nuxt.renderRoute('/');
    expect(html).to.have.string('<h1 class="green">Hello World!</h1>');
  });

  after(async () => {
    nuxt.close();
  });
});

describe('Test #3 - Silly', async () => {
  before(async () => {
    nuxtConfig.typescript.cache = '';
    nuxtConfig.typescript.thread = '';
    nuxtConfig.typescript.checker = false;
    nuxt = new Nuxt(nuxtConfig);
    await new Builder(nuxt).build();
    nuxt.listen(4000);
  });

  it('should respond `Hello World!`', async () => {
    const { html } = await nuxt.renderRoute('/');
    expect(html).to.have.string('<h1 class="green">Hello World!</h1>');
  });

  after(async () => {
    nuxt.close();
  });
});
