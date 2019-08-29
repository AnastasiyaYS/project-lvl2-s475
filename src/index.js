const _ = require('lodash/fp');
const fs = require('fs');
const path = require('path');

export default (firstConfig, secondConfig) => {
  const firstPath = path.resolve(process.cwd(), firstConfig);
  const secondPath = path.resolve(process.cwd(), secondConfig);
  const beforeObj = JSON.parse(fs.readFileSync(firstPath, 'utf8'));
  const afterObj = JSON.parse(fs.readFileSync(secondPath, 'utf8'));

  const resWithoutAdded = Object.entries(beforeObj).reduce((acc, [key, value]) => {
    if (_.has(key, afterObj)) {
      if (afterObj[key] === value) {
        return `${acc}    ${key}: ${value}\n`;
      }
      return `${acc}  + ${key}: ${afterObj[key]}\n  - ${key}: ${value}\n`;
    }
    return `${acc}  - ${key}: ${value}\n`;
  }, '{\n');

  const res = Object.entries(afterObj).reduce((acc, [key, value]) => {
    if (!_.has(key, beforeObj)) {
      return `${resWithoutAdded}  + ${key}: ${value}\n`;
    }
    return acc;
  }, resWithoutAdded);

  return `${res}}\n`;
};
