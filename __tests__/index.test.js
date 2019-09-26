import path from 'path';
import fs from 'fs';
import genDiff from '../src';

const buildPath = (fileName) => path.resolve(__dirname, `__fixtures__/${fileName}`);

const table = [['.json', 'tree'],
  ['.yml', 'tree'],
  ['.ini', 'tree'],
  ['.json', 'plain'],
  ['.yml', 'plain'],
  ['.ini', 'plain'],
  ['.json', 'json'],
  ['.yml', 'json'],
  ['.ini', 'json']];

test.each(table)(
  'compare %s files with %s format',
  (format, formatter) => {
    const pathToFile1 = buildPath(`before${format}`);
    const pathToFile2 = buildPath(`after${format}`);
    const resultFileName = `${formatter}Result.txt`;
    const actualValue = genDiff(pathToFile1, pathToFile2, formatter);
    const expectedValue = fs.readFileSync(buildPath(resultFileName), 'utf8');
    expect(actualValue).toEqual(expectedValue);
  },
);
