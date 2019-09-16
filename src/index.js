import parsingToObject from './utils/parsers';

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

const objToStr = (obj, spaces) => {
  const res = Object.entries(obj).reduce((acc, [key, value]) => `${acc}${spaces}      ${key}: ${value}\n`, '{\n');
  return `${res}${spaces}  }`;
};

const render = (ast) => {
  const space = '  ';
  const iter = (arr, depth) => arr.reduce((acc, value) => {
    const spacesCount = 2 * depth - 1;
    if (value.status === 'not changed') {
      if (value.children instanceof Array) {
        return `${acc}${space.repeat(spacesCount)}  ${value.key}: ${iter(value.children, depth + 1)}${space.repeat(spacesCount)}  }\n`;
      }
      return `${acc}${space.repeat(spacesCount)}  ${value.key}: ${value.beforeValue}\n`;
    }
    if (value.status === 'changed') {
      const beforeValue = _.isObject(value.beforeValue)
        ? objToStr(value.beforeValue, space.repeat(spacesCount)) : value.beforeValue;
      const afterValue = _.isObject(value.afterValue)
        ? objToStr(value.afterValue, space.repeat(spacesCount)) : value.afterValue;
      return `${acc}${space.repeat(spacesCount)}- ${value.key}: ${beforeValue}\n${space.repeat(spacesCount)}+ ${value.key}: ${afterValue}\n`;
    }
    if (value.status === 'deleted') {
      const beforeValue = _.isObject(value.beforeValue)
        ? objToStr(value.beforeValue, space.repeat(spacesCount)) : value.beforeValue;
      return `${acc}${space.repeat(spacesCount)}- ${value.key}: ${beforeValue}\n`;
    }
    if (value.status === 'added') {
      const afterValue = _.isObject(value.afterValue)
        ? objToStr(value.afterValue, space.repeat(spacesCount)) : value.afterValue;
      return `${acc}${space.repeat(spacesCount)}+ ${value.key}: ${afterValue}\n`;
    }
    return acc;
  }, '{\n');
  const res = iter(ast, 1);
  return `${res}}\n`;
};

export default (firstConfig, secondConfig) => {
  const firstPath = path.resolve(process.cwd(), firstConfig);
  const secondPath = path.resolve(process.cwd(), secondConfig);

  const beforeObj = parsingToObject(path.extname(firstPath), fs.readFileSync(firstPath, 'utf8'));
  const afterObj = parsingToObject(path.extname(secondPath), fs.readFileSync(secondPath, 'utf8'));

  const res = render(parse(beforeObj, afterObj));
  return res;
};
