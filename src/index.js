const fs = require('fs');
const path = require('path');

function autoCrateOrderDetail(type) {
  // const configTxt = fs.readFileSync('./src/config/orderDetail/orderDetail.txt','utf-8');
  const modal = fs.readFileSync(`${path.resolve(__dirname)}/template/OrderDetail/index.jsx`, 'utf-8');
  fs.writeFileSync(`./${type}.jsx`, modal);
}

module.exports = {
  autoCrateOrderDetail,
};
