import _ from 'lodash/fp';

const objToStr = (value, spaces) => {
  if (!_.isObject(value)) {
    return value;
  }
  const res = Object.entries(value).reduce((acc, [key, val]) => `${acc}${spaces}      ${key}: ${val}\n`, '{\n');
  return `${res}${spaces}  }`;
};

export default (ast) => {
  const space = '  ';
  const iter = (arr, depth) => arr.map((node) => {
    const spacesCount = 2 * depth - 1;
    const beforeValue = objToStr(node.beforeValue, space.repeat(spacesCount));
    const afterValue = objToStr(node.afterValue, space.repeat(spacesCount));
    switch (node.type) {
      case 'parent':
        return [`${space.repeat(spacesCount)}  ${node.key}: {`, iter(node.children, depth + 1), `${space.repeat(spacesCount)}  }`];
      case 'unchanged':
        return `${space.repeat(spacesCount)}  ${node.key}: ${node.beforeValue}`;
      case 'updated':
        return [`${space.repeat(spacesCount)}- ${node.key}: ${beforeValue}`, `${space.repeat(spacesCount)}+ ${node.key}: ${afterValue}`];
      case 'removed':
        return `${space.repeat(spacesCount)}- ${node.key}: ${beforeValue}`;
      case 'added':
        return `${space.repeat(spacesCount)}+ ${node.key}: ${afterValue}`;
      default:
        throw new Error(`Nonexistent node type: ${node.type}, node: ${node}`);
    }
  });
  return _.flattenDeep(['{', iter(ast, 1), '}']).join('\n');
};
