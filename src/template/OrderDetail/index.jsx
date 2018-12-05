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
  {{template}}
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
