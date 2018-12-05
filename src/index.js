const fs = require('fs');
const path = require('path');
const shell = require('shelljs');

const dir = path.resolve(__dirname);

function autoCrateOrderDetail(type, src) {
  const configTxt = fs.readFileSync(src || `./${type}.js`,'utf-8');
  const modal = fs.readFileSync(`${dir}/template/OrderDetail/index.jsx`, 'utf-8');
  const result = modal.replace(/\{\{template\}\}/, configTxt);
  fs.writeFileSync(`./${type}.jsx`, result);
  shell.echo(`当前目录下生成文件成功 ${type}.jsx`);
}

function downloadOrderDetail(type) {
  const result = fs.readFileSync(`${dir}/config/OrderDetail.js`, 'utf-8');
  fs.writeFileSync(`./${type}.js`, result);
  shell.echo(`当前目录下载文件成功 ${type}.jsx`);
}

module.exports = {
  autoCrateOrderDetail,
  downloadOrderDetail,
};
