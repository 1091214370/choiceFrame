import React from 'react';
import PropTypes from 'prop-types';
import { DetailTable } from 'hermes-react';
import { Form, Table, Button, Spin, Icon } from 'antd';
import { STATE, TAKEOUTTYPE } from '../../utils/index';

const OrderDetail = ({
  loading, // loading
  isOutlier, // 是否是异常单
  formData, // 页面数据
  onBack, // 返回
  onPage, // 翻页
}) => {
  const orderColumns = [ // 点菜列表
    {
      title: '菜品名称',
      dataIndex: 'dishName',
      key: 'dishName',
      render: (text, record) => (record.isException === '1' ? <span>{text || '---'} <Icon type="exclamation-circle" style={{ color: '#F04134 ' }} /></span> : text),
    },
    {
      title: '数量',
      dataIndex: 'num',
      key: 'num',
    },
    {
      title: '单位',
      dataIndex: 'unit',
      key: 'unit',
    }, {
      title: '总价',
      dataIndex: 'total',
      key: 'total',
    }, {
      title: '附加项',
      dataIndex: 'additemName',
      key: 'additemName',
      render: text => text || '---',
    },
  ];

  const orderInformation = [
    {
      label: '订单号',
      value: formData.resv,
    },
    {
      label: '订单来源',
      value: TAKEOUTTYPE[formData.orderFrom.toUpperCase()],
    },
    {
      label: '流水号',
      value: formData.serialNumber,
    },
    {
      label: '订单状态',
      value: STATE[formData.orderState],
    },
    {
      label: '门店编码',
      value: formData.storeCode,
    },
    {
      label: '所属门店',
      value: formData.storeName,
    },
    {
      label: '下单时间',
      value: formData.orderTime,
    },
    {
      label: '送达时间',
      value: formData.deliveryTime,
    },
    {
      label: '订单总金额',
      value: formData.originalPrice,
    },
    {
      label: '实付金额',
      value: formData.totalPrice,
    },
    {
      label: '平台补贴',
      value: formData.platformSubsidy,
    },
    { //
      label: '商家优惠',
      value: formData.businessPreferences,
    },
    {
      label: '客户名称',
      value: formData.consignee,
    },
    {
      label: '客户电话',
      value: formData.phone,
    },
    {
      label: '发票抬头',
      value: formData.invoicetitle,
    },
    {
      label: '备注',
      value: formData.description,
    },
    {
      label: '送餐地址',
      value: formData.address,
    },
    {
      label: '调度员',
      value: formData.deliverLeader || '--',
    },
    {
      label: '调度员电话',
      value: formData.deliverLeaderTele || '--',
    },
    {
      label: '配送员',
      value: formData.deliver || '--',
    },
    {
      label: '配送员电话',
      value: formData.deliverTele || '--',
    },
  ];
  // 异常描述
  const outlierInfo = {
      label: '异常描述',
      value: formData.exceptionReason,
      colSpan: 5,
    },
  // 如果是异常订单，增加异常描述
  if (isOutlier) orderInformation.push(outlierInfo);
  const title = text => (<span
    style={{
      color: '#666',
      display: 'inline-block',
      margin: '24px 0 16px 0',
      fontFamily: 'MicrosoftYaHei',
      fontSize: 16,
    }}
  >
    {text}
  </span>);

  return (
    <Spin spinning={loading}>
      <div className="detailModal search">
        {title('订单信息')}
        <DetailTable
          dataSource={orderInformation}
          columnCount={6}
        />
        {title('菜品信息')}
        <Table
          columns={orderColumns}
          dataSource={formData.dishList}
          size="small"
          onChange={onPage}
          bordered
          rowKey={record => record.ID}
        />
        <Button className="backBtn" onClick={onBack} value="返回" style={{ top: formData.dishList && formData.dishList.length > 0 ? '-49px' : '10px' }}>返回</Button>
      </div>
    </Spin>
  );
};
OrderDetail.propTypes = {
  loading: PropTypes.bool,
  isOutlier: PropTypes.bool,
  formData: PropTypes.object,
  onBack: PropTypes.func,
  onPage: PropTypes.func,
};

export default Form.create()(OrderDetail);
