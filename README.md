# project-lvl2-s475
[![Maintainability](https://api.codeclimate.com/v1/badges/31863e92491f55bbfc40/maintainability)](https://codeclimate.com/github/AnastasiyaYS/project-lvl2-s475/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/31863e92491f55bbfc40/test_coverage)](https://codeclimate.com/github/AnastasiyaYS/project-lvl2-s475/test_coverage) [![Build Status](https://travis-ci.org/AnastasiyaYS/project-lvl2-s475.svg?branch=master)](https://travis-ci.org/AnastasiyaYS/project-lvl2-s475)

Compares two configuration files and shows a difference.

## Setup

```sh
$ sudo npm install -g @anastassin/difference-calculator
```

## Usage

### **CLI application**
```sh
Usage: gendiff [options] <firstConfig> <secondConfig>

Options:

  -V, --version        output the version number
  -f, --format [type]  Output format
  -h, --help           output usage information
```

### **Library**
```sh
import genDiff from 'genDiff';
const diff = genDiff(pathToFile1, pathToFile2);
console.log(diff);
```

## Run

### **Compare flat JSON files**
```sh
$ gendiff firstPath.json secondPath.json
```
[![asciicast](https://asciinema.org/a/264895.svg)](https://asciinema.org/a/264895)

### **Compare flat YAML files**
```sh
$ gendiff firstPath.yml secondPath.yml
```
[![asciicast](https://asciinema.org/a/267043.svg)](https://asciinema.org/a/267043)
