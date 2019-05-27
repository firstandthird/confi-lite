const helpers = require('confi-helpers');
const fs = require('fs');
const aug = require('aug');
const varson = require('varson');

module.exports = (path = '@architect/shared/conf') => {
  const env = process.env.NODE_ENV || 'dev';
  const envFile = `${path}/${env}.json`;
  const defaultFile = `${path}/default.json`;
  let envConfig = {};
  console.log(`Loading config from ${envFile} and ${defaultFile}`);
  if (fs.existsSync(envFile)) {
    try {
      envConfig = JSON.parse(fs.readFileSync(envFile));
    } catch (e) {
      console.log(e);
    }
  }
  let defaultConfig = {};
  if (fs.existsSync(defaultFile)) {
    try {
      defaultConfig = JSON.parse(fs.readFileSync(defaultFile));
    } catch (e) {
      console.log(e);
    }
  }
  const config = aug(defaultConfig, envConfig);
  return varson(config, helpers);
};
