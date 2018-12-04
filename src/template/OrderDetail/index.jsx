/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { DetailTable } from 'hermes-react';
import { Form, Table, Button, Spin } from 'antd';

const Page = ({
  loading,
  listData,
  formData,
  onBack,
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
  const orderColumns = [       // 菜品信息
    {
      title: '菜品名称',
      dataIndex: 'FOODSNAME',
      key: 'FOODSNAME',
      width: '30%',
    },
    {
      title: '数量',
      dataIndex: 'FOODNUM',
      key: 'FOODNUM',
      width: '10%',
    },
    {
      title: '单位',
      dataIndex: 'UNIT',
      key: 'UNIT',
      width: '10%',
    }, {
      title: '总价',
      dataIndex: 'TOTALPRICE',
      key: 'TOTALPRICE',
      width: '20%',
    }, {
      title: '附加项',
      dataIndex: 'VADDITEMNAME',
      key: 'VADDITEMNAME',
      width: '30%',
    },
  ];

  const orderInformation = [
    {
      label: '订单号',
      value: formData.RESV,
    },
    {
      label: '订单来源',
      value: TAKEOUTTYPE[formData.ORDFROM],
    },
    {
      label: '流水号',
      value: formData.VORDERNO,
    },
    {
      label: '订单状态',
      value: state[formData.STATE],
    },
    {
      label: '门店编码',
      value: formData.FIRMCODE,
    },
    {
      label: '所属门店',
      value: formData.FIRMNAME,
    },
    {
      label: '下单时间',
      value: formData.ORDERTIME,
    },
    {
      label: '送达时间',
      value: formData.DELIVERYTIME,
    },
    {
      label: '订单总金额',
      value: formData.SUMPRICE,
    },
    {
      label: '实付金额',
      value: formData.PAYMONEY,
    },
    {
      label: '客户名称',
      value: formData.NAM,
    },
    {
      label: '客户电话',
      value: formData.CONTACT,
    },
    {
      label: '发票抬头',
      value: formData.VINVOICETITLE,
    },
    {
      label: '备注',
      value: formData.REMARK,
    },
    {
      label: '送餐地址',
      value: formData.RECEIVERADDR,
    },
    {
      label: '调度员',
      value: formData.VDELIVERLEADER || '--',
    },
    {
      label: '调度员电话',
      value: formData.VDELIVERLEADERTELE || '--',
    },
    {
      label: '配送员',
      value: formData.VDELIVER || '--',
    },
    {
      label: '配送员电话',
      value: formData.SHIPPERPHONE || '--',
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
  const packageCol = [
    {
      title: '菜品名称',
      dataIndex: 'dishName',
      key: 'dishName',
      width: '30%',
    },
    {
      title: '数量',
      dataIndex: 'num',
      key: 'num',
      width: '10%',
    },
    {
      title: '单位',
      dataIndex: 'unit',
      key: 'unit',
      width: '10%',
    }, {
      title: '总价',
      dataIndex: 'total',
      key: 'total',
      width: '20%',
    }, {
      title: '附加项',
      dataIndex: 'additemName',
      key: 'additemName',
      width: '30%',
      render: text => text || '---',
    },
  ];
  const tableProps = {
    expandedRowRender: record =>
    (record.ISPACKAGE === '1' ? <Table
      dataSource={record.packageDetailList}
      pagination={false}
      columns={packageCol}
      showHeader={false}
      rowKey={() => Math.random()}
    /> : null),
  };
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
          {...tableProps}
          className="expandTable"
          columns={orderColumns}
          dataSource={listData}
          bordered
          rowKey={() => Math.random()}
          rowClassName={record => (record.ISPACKAGE === '0' ? 'noExpand' : '')}
        />
        <Button className="backBtn" onClick={onBack} value="返回" style={{ top: formData.dishList && formData.dishList.length > 0 ? '-49px' : '10px' }}>返回</Button>
      </div>
    </Spin>
  );
};
Page.propTypes = {
  loading: PropTypes.bool,
  listData: PropTypes.array,
  formData: PropTypes.object,
  onBack: PropTypes.func,
};

export default Form.create()(Page);
