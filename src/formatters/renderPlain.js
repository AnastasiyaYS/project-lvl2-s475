const _ = require('lodash/fp');

const getProcessedValue = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (typeof value === 'boolean') {
    return value;
  }
  if (value.toString().match(/^-{0,1}\d+$/)) {
    return +value;
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return value;
};

export default (ast) => {
  const iter = (arr, parent) => arr.reduce((acc, value) => {
    if (value.status === 'not changed') {
      if (value.children instanceof Array) {
        return `${acc}${iter(value.children, `${parent}${value.key}.`)}`;
      }
      return acc;
    }
    if (value.status === 'changed') {
      return `${acc}Property '${parent}${value.key}' was updated. From ${getProcessedValue(value.beforeValue)} to ${getProcessedValue(value.afterValue)}\n`;
    }
    if (value.status === 'deleted') {
      return `${acc}Property '${parent}${value.key}' was removed\n`;
    }
    if (value.status === 'added') {
      return `${acc}Property '${parent}${value.key}' was added with value: ${getProcessedValue(value.afterValue)}\n`;
    }
    return acc;
  }, '');
  return iter(ast, '');
};
