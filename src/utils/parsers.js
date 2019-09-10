const yaml = require('js-yaml');
const ini = require('ini');

const parse = {
  '.json': JSON.parse,
  '.yml': yaml.safeLoad,
  '.ini': ini.parse,
};

export default (format, data) => parse[format](data);
