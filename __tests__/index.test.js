import genDiff from '../src';

const path = require('path');
const fs = require('fs');

const buildPath = fileName => path.resolve(__dirname, `__fixtures__/${fileName}`);

test.each([['JSON', buildPath('before.json'), buildPath('after.json')],
  ['YAML', buildPath('before.yml'), buildPath('after.yml')],
  ['INI', buildPath('before.ini'), buildPath('after.ini')]])(
  'compare flat %s files',
  (format, pathToFile1, pathToFile2) => {
    expect(genDiff(pathToFile1, pathToFile2)).toEqual(fs.readFileSync(buildPath('result.txt'), 'utf8'));
  },
);
