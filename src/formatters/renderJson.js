const _ = require('lodash/fp');

const getProcessedValue = (value) => {
  if (_.isObject(value)) {
    const obj = Object.entries(value).reduce((acc, [key, val]) => `${acc} ${key}: '${val}'`, '"{');
    return `${obj} }"`;
  }
  if (value.toString().match(/^-{0,1}\d+$/)) {
    return +value;
  }
  if (typeof value === 'string') {
    return `"${value}"`;
  }
  return value;
};

const renderJson = (ast) => {
  const iter = (arr) => {
    const res = arr.reduce((acc, value) => {
      if (value.status === 'not changed') {
        if (value.children instanceof Array) {
          return `${acc}{"key":"${value.key}","status":"not changed","children":${iter(value.children)}},`;
        }
        return `${acc}{"key":"${value.key}","status":"not changed"},`;
      }
      if (value.status === 'changed') {
        return `${acc}{"key":"${value.key}","status":"changed","beforeValue":${getProcessedValue(value.beforeValue)},"afterValue":${getProcessedValue(value.afterValue)}},`;
      }
      if (value.status === 'deleted') {
        return `${acc}{"key":"${value.key}","status":"deleted","beforeValue":${getProcessedValue(value.beforeValue)}},`;
      }
      if (value.status === 'added') {
        return `${acc}{"key":"${value.key}","status":"added","afterValue":${getProcessedValue(value.afterValue)}},`;
      }
      return acc;
    }, '[');
    return `${res.slice(0, -1)}]`;
  };
  return `${iter(ast)}\n`;
};

export default renderJson;
