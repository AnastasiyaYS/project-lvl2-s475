import parsingToObject from './utils/parsers';
import renderTree from './formatters/renderTree';
import renderPlain from './formatters/renderPlain';
import renderJson from './formatters/renderJson';

const fs = require('fs');

const _ = require('lodash/fp');
const path = require('path');

const parse = (beforeObj, afterObj) => {
  const resWithoutAdded = Object.entries(beforeObj).reduce((acc, [key, value]) => {
    if (_.has(key, afterObj)) {
      if (value instanceof Object && afterObj[key] instanceof Object) {
        return [...acc, {
          key, status: 'not changed', beforeValue: '', afterValue: '', children: parse(value, afterObj[key]),
        }];
      }
      if (value === afterObj[key]) {
        return [...acc, {
          key, status: 'not changed', beforeValue: value, afterValue: value, children: '',
        }];
      }
      return [...acc, {
        key, status: 'changed', beforeValue: value, afterValue: afterObj[key], children: '',
      }];
    }
    return [...acc, {
      key, status: 'deleted', beforeValue: value, afterValue: '', children: '',
    }];
  }, []);

  const res = Object.entries(afterObj).reduce((acc, [key, value]) => {
    if (!_.has(key, beforeObj)) {
      return [...acc, {
        key, status: 'added', beforeValue: '', afterValue: value, children: '',
      }];
    }
    return acc;
  }, resWithoutAdded);
  return res;
};

const formatProperties = {
  tree: renderTree,
  plain: renderPlain,
  json: renderJson,
};

export default (firstConfig, secondConfig, format = 'tree') => {
  const firstPath = path.resolve(process.cwd(), firstConfig);
  const secondPath = path.resolve(process.cwd(), secondConfig);

  const beforeObj = parsingToObject(path.extname(firstPath), fs.readFileSync(firstPath, 'utf8'));
  const afterObj = parsingToObject(path.extname(secondPath), fs.readFileSync(secondPath, 'utf8'));

  const ast = parse(beforeObj, afterObj);
  return formatProperties[format](ast);
};
