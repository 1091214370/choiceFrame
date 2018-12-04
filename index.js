#!/usr/bin/env node
const argv = require('yargs').argv;
const colors = require('colors');
const { autoCrateOrderDetail } = require('./src/index');

if (argv.type) {
  switch(argv.type) {
    case 'orderDetail':
      autoCrateOrderDetail(argv.type);
      break;
    default: console.log(colors.red('未找到指定模板 --type'));
  }
}
