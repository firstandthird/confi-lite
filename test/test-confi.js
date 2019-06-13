const tap = require('tap');
const confi = require('../index');

tap.test('loads default config', async t => {
  process.env.PORT = 8080;
  const config = confi(`${__dirname}`);
  t.match(config, { port: '8080', first: 'Dev', last: 'Smith', full: 'Dev Smith' });
  t.end();
});

tap.test('loads production config', async t => {
  process.env.NODE_ENV = 'production';
  const config = confi(`${__dirname}`);
  t.match(config, { port: '8080', first: 'Prod', last: 'Smith', full: 'Prod Smith' });
  t.end();
});

tap.test('loads production config from param', async t => {
  delete process.env.NODE_ENV;
  const config = confi(`${__dirname}`, 'production');
  t.match(config, { port: '8080', first: 'Prod', last: 'Smith', full: 'Prod Smith' });
  t.end();
});

tap.test('fine if file does not exist', async t => {
  const config = confi('nowhere');
  t.match(config, process.env);
  t.end();
});

tap.test('throws if file is invalid JSON', async t => {
  try {
    const config = confi(`${__dirname}/invalid`);
    t.fail();
  } catch (e) {
    t.ok(e);
    t.end();
  }
});
