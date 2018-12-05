#!/usr/bin/env node
const program = require('commander');
const colors = require('colors');
const shell = require('shelljs');
const path = require('path');
const dir = path.resolve(__dirname);
const { downloadOrderDetail, autoCrateOrderDetail } = require(`${dir}/src/index`);
const packageJson = require(`${dir}/package.json`);

// 定义命令行命令
program
  .version(packageJson.version, '-v, --version')
  .usage('[options] <file ...>')
  .option('-t, --type <templatename>', 'Select a template')
  .option('-d, --download <templatename>', 'domnload a template configuration file')
  .option('-c, --config <file path>', 'Select a configuration file, like ./config.js')
  .option('-h, --help', 'output usage information')
  .parse(process.argv);

// 下载相应模板配置文件
if (program.download) {
  switch (program.download) {
    case 'orderDetail':
      downloadOrderDetail(program.download);
      break;
    default: shell.echo(colors.red('未找到指定模板 --download <templatename>'));
  }
}

// 使用模板生成文件
if (program.type) {
  switch (program.type) {
    case 'orderDetail':
      autoCrateOrderDetail(program.type, program.config);
      break;
    default: shell.echo(colors.red('未找到指定模板 --type <templatename>'));
  }
}
