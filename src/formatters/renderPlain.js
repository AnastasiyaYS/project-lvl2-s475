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
  const iter = (arr, parent) => arr.map((node) => {
    switch (node.type) {
      case 'unchanged':
        if (node.children) {
          return _.compact(iter(node.children, `${parent}${node.key}.`)).join('\n');
        }
        return null;
      case 'updated':
        return `Property '${parent}${node.key}' was updated. From ${getProcessedValue(node.beforeValue)} to ${getProcessedValue(node.afterValue)}`;
      case 'removed':
        return `Property '${parent}${node.key}' was removed`;
      case 'added':
        return `Property '${parent}${node.key}' was added with value: ${getProcessedValue(node.afterValue)}`;
    }
  });
  return _.compact(iter(ast, '')).join('\n');
};
