import path from 'path';
import fs from 'fs';
import genDiff from '../src';

const buildPath = (fileName) => path.resolve(__dirname, `__fixtures__/${fileName}`);

const table = [['JSON', buildPath('before.json'), buildPath('after.json'), 'Result.txt'],
  ['YAML', buildPath('before.yml'), buildPath('after.yml'), 'Result.txt'],
  ['INI', buildPath('before.ini'), buildPath('after.ini'), 'Result.txt']];

const makeTest = (format) => {
  test.each(table)(
    `compare %s files with ${format} format`,
    (outputFormat, pathToFile1, pathToFile2, result) => {
      expect(genDiff(pathToFile1, pathToFile2, `${format}`)).toEqual(fs.readFileSync(buildPath(`${format}${result}`), 'utf8'));
    },
  );
};

makeTest('tree');
makeTest('plain');
makeTest('json');
