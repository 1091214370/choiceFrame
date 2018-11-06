import React from 'react';
import PropTypes from 'prop-types';
import { DetailTable } from 'hermes-react';
import { Form, Table, Button, Spin, Icon } from 'antd';

const OrderDetail = ({
  loading,
  formData,
  orderPage,
  onBack,
  onPage,
}) => {
  const state = {
    0: '已提交未处理',
    1: '生效未付款',
    2: '已付款',
    Y: '订单已生效',
    N: '订单下发中',
    3: '订单取消',
    4: '申请退款',
    5: '已退款',
    6: '订单结账',
    7: '已下单',
    51: '骑手已接单',
    52: '订单已送达',
    54: '骑手取餐中',
    55: '订单配送中',
    56: '等待骑手接单',
    57: '用户申请退单',
    58: '用户取消申请退单',
    59: '驳回申请退单',
    60: '等待用户支付',
    61: '百度物流下单失败',
    '': '全部',
  };
  const TAKEOUTTYPE = {
    ELEME: '饿了么',
    MEITUAN: '美团',
    meiTuanld: '美团录单',
    '': '全部',
  };
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
      value: TAKEOUTTYPE[formData.orderFrom],
    },
    {
      label: '流水号',
      value: formData.serialNumber,
    },
    {
      label: '订单状态',
      value: state[formData.orderState],
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
    { //
      label: '异常描述',
      value: formData.exceptionReason,
      colSpan: 5,
    },
  ];

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
          pagination={orderPage}
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
  formData: PropTypes.object,
  onBack: PropTypes.func,
  orderPage: PropTypes.func,
  onPage: PropTypes.func,
};

export default Form.create()(OrderDetail);
