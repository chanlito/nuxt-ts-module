const { resolve } = require('path');
const { expect } = require('chai');
const { Nuxt, Builder } = require('nuxt-edge');
const nuxtConfig = require('./nuxt.config');

let nuxt;

before(async () => {
  nuxt = new Nuxt(nuxtConfig);
  await new Builder(nuxt).build();
  await nuxt.listen(4000);
});

describe('Test #1', () => {
  it('should respond `Hello World!`', async () => {
    const { html } = await nuxt.renderRoute('/');
    expect(html).to.have.string('<h1 class="green">Hello World!</h1>');
  });
});
