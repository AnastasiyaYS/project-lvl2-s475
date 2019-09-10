import genDiff from '../src';

const path = require('path');
const fs = require('fs');

const pathToFileJson1 = path.resolve(__dirname, '__fixtures__/before.json');
const pathToFileJson2 = path.resolve(__dirname, '__fixtures__/after.json');
const pathToFileYaml1 = path.resolve(__dirname, '__fixtures__/before.yml');
const pathToFileYaml2 = path.resolve(__dirname, '__fixtures__/after.yml');
const result = path.resolve(__dirname, '__fixtures__/result.json');

test('compare flat JSON files', () => {
  expect(genDiff(pathToFileJson1, pathToFileJson2)).toEqual(fs.readFileSync(result, 'utf8'));
});

test('compare flat YAML files', () => {
  expect(genDiff(pathToFileYaml1, pathToFileYaml2)).toEqual(fs.readFileSync(result, 'utf8'));
});
