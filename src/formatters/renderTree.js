const _ = require('lodash/fp');

const objToStr = (obj, spaces) => {
  const res = Object.entries(obj).reduce((acc, [key, value]) => `${acc}${spaces}      ${key}: ${value}\n`, '{\n');
  return `${res}${spaces}  }`;
};

export default (ast) => {
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
