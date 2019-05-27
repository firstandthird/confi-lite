const tap = require('tap');
const confi = require('../index');

tap.test('loads default config', async t => {
  process.env.PORT = 8080;
  const config = confi(`${__dirname}`);
  t.match(config, { port: '8080', first: 'Dev', last: 'Smith', full: 'Dev Smith' });
  t.end();
});

tap.test('loads default config', async t => {
  process.env.PORT = 8080;
  const config = confi(`${__dirname}`);
  t.match(config, { port: '8080', first: 'Dev', last: 'Smith', full: 'Dev Smith' });
  t.end();
});
