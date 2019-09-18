import genDiff from '../src';

const path = require('path');
const fs = require('fs');

const buildPath = (fileName) => path.resolve(__dirname, `__fixtures__/${fileName}`);

test.each([['flat JSON', buildPath('flatBefore.json'), buildPath('flatAfter.json'), 'flatResult_treeFormat.txt'],
  ['flat YAML', buildPath('flatBefore.yml'), buildPath('flatAfter.yml'), 'flatResult_treeFormat.txt'],
  ['flat INI', buildPath('flatBefore.ini'), buildPath('flatAfter.ini'), 'flatResult_treeFormat.txt'],
  ['tree JSON', buildPath('treeBefore.json'), buildPath('treeAfter.json'), 'treeResult_treeFormat.txt'],
  ['tree YAML', buildPath('treeBefore.yml'), buildPath('treeAfter.yml'), 'treeResult_treeFormat.txt'],
  ['tree INI', buildPath('treeBefore.ini'), buildPath('treeAfter.ini'), 'treeResult_treeFormat.txt']])(
  'compare %s files with tree format',
  (format, pathToFile1, pathToFile2, result) => {
    expect(genDiff(pathToFile1, pathToFile2, 'tree')).toEqual(fs.readFileSync(buildPath(result), 'utf8'));
  },
);

test.each([['flat JSON', buildPath('flatBefore.json'), buildPath('flatAfter.json'), 'flatResult_plainFormat.txt'],
  ['flat YAML', buildPath('flatBefore.yml'), buildPath('flatAfter.yml'), 'flatResult_plainFormat.txt'],
  ['flat INI', buildPath('flatBefore.ini'), buildPath('flatAfter.ini'), 'flatResult_plainFormat.txt'],
  ['tree JSON', buildPath('treeBefore.json'), buildPath('treeAfter.json'), 'treeResult_plainFormat.txt'],
  ['tree YAML', buildPath('treeBefore.yml'), buildPath('treeAfter.yml'), 'treeResult_plainFormat.txt'],
  ['tree INI', buildPath('treeBefore.ini'), buildPath('treeAfter.ini'), 'treeResult_plainFormat.txt']])(
  'compare %s files with plain format',
  (format, pathToFile1, pathToFile2, result) => {
    expect(genDiff(pathToFile1, pathToFile2, 'plain')).toEqual(fs.readFileSync(buildPath(result), 'utf8'));
  },
);
