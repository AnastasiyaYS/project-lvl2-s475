import _ from 'lodash/fp';

const objToStr = (obj, spaces) => {
  const res = Object.entries(obj).reduce((acc, [key, value]) => `${acc}${spaces}      ${key}: ${value}\n`, '{\n');
  return `${res}${spaces}  }`;
};

export default (ast) => {
  const space = '  ';
  const iter = (arr, depth) => arr.reduce((acc, value) => {
    const spacesCount = 2 * depth - 1;
    const beforeValue = _.isObject(value.beforeValue)
      ? objToStr(value.beforeValue, space.repeat(spacesCount)) : value.beforeValue;
    const afterValue = _.isObject(value.afterValue)
      ? objToStr(value.afterValue, space.repeat(spacesCount)) : value.afterValue;
    switch (value.type) {
      case 'unchanged':
        if (value.children instanceof Array) {
          return [...acc, `${space.repeat(spacesCount)}  ${value.key}: ${iter(value.children, depth + 1).join('\n')}\n${space.repeat(spacesCount)}  }`];
        }
        return [...acc, `${space.repeat(spacesCount)}  ${value.key}: ${value.beforeValue}`];
      case 'updated':
        return [...acc, `${space.repeat(spacesCount)}- ${value.key}: ${beforeValue}\n${space.repeat(spacesCount)}+ ${value.key}: ${afterValue}`];
      case 'removed':
        return [...acc, `${space.repeat(spacesCount)}- ${value.key}: ${beforeValue}`];
      case 'added':
        return [...acc, `${space.repeat(spacesCount)}+ ${value.key}: ${afterValue}`];
      default:
        return acc;
    }
  }, '{');
  return `${iter(ast, 1).join('\n')}\n}`;
};
