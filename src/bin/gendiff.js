#!/usr/bin/env node
import program from 'commander';
import genDiff from '..';

program
  .version('1.6.0')
  .arguments('<firstConfig> <secondConfig>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'Output format', 'tree')
  .action((firstConfig, secondConfig, options) => {
    console.log(genDiff(firstConfig, secondConfig, options.format));
  })
  .parse(process.argv);
