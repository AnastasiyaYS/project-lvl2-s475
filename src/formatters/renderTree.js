import _ from 'lodash/fp';

const objToStr = (value, spaces) => {
  if (_.isObject(value)) {
    const res = Object.entries(value).reduce((acc, [key, val]) => `${acc}${spaces}      ${key}: ${val}\n`, '{\n');
    return `${res}${spaces}  }`;
  }
  return value;
};

export default (ast) => {
  const space = '  ';
  const iter = (arr, depth) => arr.map((node) => {
    const spacesCount = 2 * depth - 1;
    const beforeValue = objToStr(node.beforeValue, space.repeat(spacesCount));
    const afterValue = objToStr(node.afterValue, space.repeat(spacesCount));
    switch (node.type) {
      case 'unchanged':
        if (node.children) {
          return `${space.repeat(spacesCount)}  ${node.key}: {\n${iter(node.children, depth + 1).join('\n')}\n${space.repeat(spacesCount)}  }`;
        }
        return `${space.repeat(spacesCount)}  ${node.key}: ${node.beforeValue}`;
      case 'updated':
        return `${space.repeat(spacesCount)}- ${node.key}: ${beforeValue}\n${space.repeat(spacesCount)}+ ${node.key}: ${afterValue}`;
      case 'removed':
        return `${space.repeat(spacesCount)}- ${node.key}: ${beforeValue}`;
      case 'added':
        return `${space.repeat(spacesCount)}+ ${node.key}: ${afterValue}`;
    }
  });
  return `{\n${iter(ast, 1).join('\n')}\n}`;
};
