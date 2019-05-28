const helpers = require('confi-helpers');
const fs = require('fs');
const aug = require('aug');
const varson = require('varson');

const loadConfig = (fileName) => {
  if (fs.existsSync(fileName)) {
    return JSON.parse(fs.readFileSync(fileName));
  }
};
module.exports = (path = `${__dirname}/conf`) => {
  const env = process.env.NODE_ENV || 'dev';
  const envFile = `${path}/${env}.json`;
  const defaultFile = `${path}/default.json`;
  console.log(`Loading config from ${envFile} and ${defaultFile}`);
  let envConfig = loadConfig(envFile);
  let defaultConfig = loadConfig(defaultFile);
  const config = aug(defaultConfig, envConfig);
  return varson(config, helpers);
};
