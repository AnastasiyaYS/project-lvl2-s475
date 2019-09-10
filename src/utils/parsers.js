const yaml = require('js-yaml');

const parse = {
  '.json': JSON.parse,
  '.yml': yaml.safeLoad,
};

export default (format, data) => parse[format](data);
