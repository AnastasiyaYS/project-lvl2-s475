import yaml from 'js-yaml';
import ini from 'ini';

const parse = {
  '.json': JSON.parse,
  '.yml': yaml.safeLoad,
  '.ini': ini.parse,
};

export default (format, data) => parse[format](data);
