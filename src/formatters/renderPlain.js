import _ from 'lodash/fp';

const getProcessedValue = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return value;
};

export default (ast) => {
  const iter = (arr, parent) => arr.reduce((acc, value) => {
    switch (value.type) {
      case 'unchanged':
        if (value.children instanceof Array) {
          return [...acc, iter(value.children, `${parent}${value.key}.`).join('\n')];
        }
        return acc;
      case 'updated':
        return [...acc, `Property '${parent}${value.key}' was updated. From ${getProcessedValue(value.beforeValue)} to ${getProcessedValue(value.afterValue)}`];
      case 'removed':
        return [...acc, `Property '${parent}${value.key}' was removed`];
      case 'added':
        return [...acc, `Property '${parent}${value.key}' was added with value: ${getProcessedValue(value.afterValue)}`];
      default:
        return acc;
    }
  }, []);
  return iter(ast, '').join('\n');
};
