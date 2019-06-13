const helpers = require('confi-helpers');
const fs = require('fs');
const aug = require('aug');
const varson = require('varson');

const loadConfig = (fileName) => {
  if (fs.existsSync(fileName)) {
    return JSON.parse(fs.readFileSync(fileName));
  }
  return {};
};
module.exports = (path = `${__dirname}/conf`, env = process.env.NODE_ENV || 'dev') => {
  const envFile = `${path}/${env}.json`;
  const defaultFile = `${path}/default.json`;
  let envConfig = loadConfig(envFile);
  let defaultConfig = loadConfig(defaultFile);
  const config = aug(defaultConfig, envConfig, process.env);
  return varson(config, helpers);
};
