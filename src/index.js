import path from 'path';
import _ from 'lodash/fp';
import fs from 'fs';
import parse from './utils/parsers';
import formatProperties from './formatters/index';

const generateDiff = (beforeObj, afterObj) => {
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

export default (firstConfig, secondConfig, format = 'tree') => {
  const firstPath = path.resolve(process.cwd(), firstConfig);
  const secondPath = path.resolve(process.cwd(), secondConfig);

  const beforeObj = parse(path.extname(firstPath), fs.readFileSync(firstPath, 'utf8'));
  const afterObj = parse(path.extname(secondPath), fs.readFileSync(secondPath, 'utf8'));

  const ast = generateDiff(beforeObj, afterObj);
  return formatProperties[format](ast);
};
