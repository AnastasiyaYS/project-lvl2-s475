import path from 'path';
import _ from 'lodash/fp';
import fs from 'fs';
import parse from './parsers';
import formatProperties from './formatters';

const generateDiff = (beforeObj, afterObj) => {
  const unitedKeys = _.union(Object.keys(afterObj), Object.keys(beforeObj));
  return unitedKeys.map((key) => {
    if (_.has(key, beforeObj) && _.has(key, afterObj)) {
      if (beforeObj[key] instanceof Object && afterObj[key] instanceof Object) {
        return {
          key, type: 'parent', children: generateDiff(beforeObj[key], afterObj[key]),
        };
      }
      if (beforeObj[key] === afterObj[key]) {
        return {
          key, type: 'unchanged', beforeValue: beforeObj[key], afterValue: afterObj[key],
        };
      }
      return {
        key, type: 'updated', beforeValue: beforeObj[key], afterValue: afterObj[key],
      };
    }
    if (_.has(key, beforeObj) && !_.has(key, afterObj)) {
      return {
        key, type: 'removed', beforeValue: beforeObj[key],
      };
    }
    return {
      key, type: 'added', afterValue: afterObj[key],
    };
  });
};

export default (firstConfig, secondConfig, format = 'tree') => {
  const firstPath = path.resolve(process.cwd(), firstConfig);
  const secondPath = path.resolve(process.cwd(), secondConfig);

  const beforeObj = parse(path.extname(firstPath), fs.readFileSync(firstPath, 'utf8'));
  const afterObj = parse(path.extname(secondPath), fs.readFileSync(secondPath, 'utf8'));

  const ast = generateDiff(beforeObj, afterObj);
  return formatProperties(format, ast);
};
