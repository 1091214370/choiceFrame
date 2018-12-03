#!/usr/bin/env node
const fs = require("fs");

const data = fs.readFileSync('./data.txt','utf-8');
console.log(data);
const modal = fs.readFileSync('./src/OrderDetail/index.jsx', 'utf-8');
const result = modal.replace(/const orderColumns = \[\]/g, data);
fs.writeFileSync("./data.jsx",result);