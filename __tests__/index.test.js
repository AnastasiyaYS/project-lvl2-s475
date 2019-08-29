import genDiff from '../src';

const path = require('path');
const fs = require('fs');

const pathToFile1 = path.resolve(__dirname, '__fixtures__/before.json');
const pathToFile2 = path.resolve(__dirname, '__fixtures__/after.json');
const result = path.resolve(__dirname, '__fixtures__/result.json');

test('compare flat files', () => {
  expect(genDiff(pathToFile1, pathToFile2)).toEqual(fs.readFileSync(result, 'utf8'));
});
