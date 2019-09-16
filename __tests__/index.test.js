import genDiff from '../src';

const path = require('path');
const fs = require('fs');

const buildPath = (fileName) => path.resolve(__dirname, `__fixtures__/${fileName}`);

test.each([['flat JSON', buildPath('flatBefore.json'), buildPath('flatAfter.json'), 'flatResult.txt'],
  ['flat YAML', buildPath('flatBefore.yml'), buildPath('flatAfter.yml'), 'flatResult.txt'],
  ['flat INI', buildPath('flatBefore.ini'), buildPath('flatAfter.ini'), 'flatResult.txt'],
  ['tree JSON', buildPath('treeBefore.json'), buildPath('treeAfter.json'), 'treeResult.txt'],
  ['tree YAML', buildPath('treeBefore.yml'), buildPath('treeAfter.yml'), 'treeResult.txt'],
  ['tree INI', buildPath('treeBefore.ini'), buildPath('treeAfter.ini'), 'treeResult.txt']])(
  'compare %s files',
  (format, pathToFile1, pathToFile2, result) => {
    expect(genDiff(pathToFile1, pathToFile2)).toEqual(fs.readFileSync(buildPath(result), 'utf8'));
  },
);
