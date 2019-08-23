#!/usr/bin/env node
const commander = require('commander');

const program = new commander.Command();
program
  .arguments('<firstConfig> <secondConfig>')
  .description('Compares two configuration files and shows a difference.')
  .option('-V, --version', 'output the version number')
  .option('-f, --format [type]', 'Output format')
  .help()
  .parse(process.argv);
