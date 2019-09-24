import path from 'path';
import fs from 'fs';
import genDiff from '../src';

const buildPath = (fileName) => path.resolve(__dirname, `__fixtures__/${fileName}`);

const table = [['JSON', buildPath('before.json'), buildPath('after.json'), 'Result.txt'],
  ['YAML', buildPath('before.yml'), buildPath('after.yml'), 'Result.txt'],
  ['INI', buildPath('before.ini'), buildPath('after.ini'), 'Result.txt']];

test.each(table)(
  'compare %s files with tree format',
  (format, pathToFile1, pathToFile2, result) => {
    expect(genDiff(pathToFile1, pathToFile2, 'tree')).toEqual(fs.readFileSync(buildPath(`tree${result}`), 'utf8'));
  },
);

test.each(table)(
  'compare %s files with plain format',
  (format, pathToFile1, pathToFile2, result) => {
    expect(genDiff(pathToFile1, pathToFile2, 'plain')).toEqual(fs.readFileSync(buildPath(`plain${result}`), 'utf8'));
  },
);

test.each(table)(
  'compare %s files with json format',
  (format, pathToFile1, pathToFile2, result) => {
    expect(genDiff(pathToFile1, pathToFile2, 'json')).toEqual(fs.readFileSync(buildPath(`json${result}`), 'utf8'));
  },
);
