import React, { PropTypes } from 'react';
import { Row, Col, Input, Tree, Table, message, Spin } from 'antd';
import _ from 'lodash';
import '../../static/index.less';

const Search = Input.Search;
const TreeNode = Tree.TreeNode;
const treeTable = ({
  loading, // confirmLoading
  spinning,  // 门店数加载状态
  codeName, // 编号名称
  selectedShops,  // 所选中的门店
  allStore,   // 所有门店列表
  expandedKeys, // 树形结构需要展开的key
  searchValue,  // 查询关键字
  autoExpandParent, // 是否自定展开
  tableTitle, // 表格标题
  onSelect, // 左侧树形结构选择方法
  onDelete, // 右侧删除方法
  onDeleteAll,  // 右侧清除所有方法
  onSearch, // 搜索方法
  onExpand, // 展开/收起产生的事件
  disableSelect, // 不可勾选
  isTree, // 仅左侧树结构展示已勾选内容
}) => {
  const dataList = [];
  const generateList = (data) => {
    data.forEach((item) => {
      const key = item.id;
      dataList.push({ key, title: item.name });
      if (item.children) {
        generateList(item.children, item.id);
      }
    });
  };
  generateList(allStore);
  const getParentKey = (key, tree) => {
    let parentKey;
    tree.forEach((ele) => {
      const node = ele;
      if (node.children) {
        if (node.children.some(item => item.id === key)) {
          parentKey = node.id;
        } else if (getParentKey(key, node.children)) {
          parentKey = getParentKey(key, node.children);
        }
      }
    });
    return parentKey;
  };
  // 监听搜索框
  const handleSearch = (value) => {
    if (value === '') { return; }
    const Keys = dataList.map((item) => {
      if (item.title.indexOf(value) > -1) {
        return getParentKey(item.key, allStore);
      }
      return null;
    }).filter((item, i, self) => item && self.indexOf(item) === i);
    if (Keys.length) {
      onSearch(value, Keys);
    } else {
      message.warning('很抱歉，暂未搜索到结果');
    }
  };
  const checkedIds = isTree ?
          _.concat(selectedShops.map(item => item.id), disableSelect) // 已选择的始终处于选中状态
          : selectedShops.map(item => item.id);

  // 渲染左侧门店树结构
  const loopTree = data => data.map((item) => {
    const temp = disableSelect || []; // 节点是否可选择
    const index = item.name.indexOf(searchValue); // 判断查询的关键字是否在当前条目name中出现
    const beforeStr = item.name.substr(0, index); // name中关键字前面部分
    const afterStr = item.name.substr(index + searchValue.length);  // 关键字后面部分
    const treeTitle = index > -1 ? (  // 对关键字进行标红处理
      <span>
        {beforeStr}
        <span style={{ color: '#f50' }}>{searchValue}</span>
        {temp.indexOf(item.id) !== -1 ? `${afterStr}(已添加)` : afterStr}
      </span>
    ) : <span>{temp.indexOf(item.id) !== -1 ? `${item.name}(已添加)` : item.name}</span>;
    if (item.children) {  // 如果下面还有子集，即children，则进行递归调用
      const childrenIds = item.children.map(i => i.id); // 获取子级id数组用于判断当下所有子级是否全选中
      // _.difference(childrenIds, temp) 返回空数组则所有子级均被选中
      return (
        <TreeNode title={treeTitle} key={item.id} value={item.id} dataRef={item} className={_.difference(childrenIds, temp).length === 0 ? 'disabledSelect' : ''}>
          {loopTree(item.children)}
        </TreeNode>
      );
    }
    return (<TreeNode // 返回树节点结构树
      title={treeTitle}
      key={item.id}
      value={item.id}
      dataRef={item}
      className={temp.indexOf(item.id) !== -1 ? 'disabledSelect' : ''}
    />);
  });
  // 选择门店树结构触发的事件
  const handleSelect = (selectedKeys, info) => {
    const selectedArray = [];
    const { checkedNodes } = info;
    checkedNodes.forEach((item) => {
      if (!item.props.children) {
        selectedArray.push(item.props.dataRef);
      }
      return null;
    });
    onSelect(selectedArray);
  };
  // 渠道筛选所触发的事件
  const handleChange = () => {
    // console.log(value);
  };

  const columns = [
    {
      title: '编号',
      dataIndex: codeName,
      key: codeName,
    },
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '操作',
      key: 'operating',
      render: record => (<button className="btn-link" onClick={() => { onDelete(record.id); }}>删除</button>),
    },
  ];
  return (
    <Row gutter={10}>
      <Col span={12}>
        <div style={{ border: '1px solid #ccc', padding: '5px 5px 5px 15px', height: '320px' }} >
          <Search
            placeholder="搜索"
            onSearch={value => handleSearch(value)}
            style={{ width: 280 }}
          />
          <Spin tip="加载中" spinning={spinning}>
            <div style={{ height: '250px', overflow: 'auto', marginTop: '20px' }}>
              {allStore.length === 0 ? <div style={{ textAlign: 'center', color: '#888' }}>暂无数据</div> : <Tree
                checkable="true"
                onExpand={onExpand}
                onCheck={handleSelect}
                checkedKeys={checkedIds}
                expandedKeys={expandedKeys}
                autoExpandParent={autoExpandParent}
              >
                {loopTree(allStore)}
              </Tree>}
            </div>
          </Spin>
        </div>
      </Col>
      <Col span={12}>
        <div style={{ border: '1px solid #ccc', height: '320px', overflow: 'auto' }} >
          <div style={{ height: '38px', lineHeight: '38px', padding: '0 20px' }}>
            <span style={{ float: 'left' }}>{tableTitle} {selectedShops.length}</span>
            <button className="btn-link" style={{ float: 'right' }} onClick={onDeleteAll}>清除</button>
          </div>
          <Table
            columns={columns}
            dataSource={selectedShops}
            bordered
            loading={loading}
            rowKey={record => record[codeName]}
            pagination={{ size: 'small' }}
            style={{ marginLeft: '1px' }}
          />
        </div>
      </Col>
    </Row>
  );
};

treeTable.propTypes = {
  bindModalVisible: PropTypes.bool,
  loading: PropTypes.bool,
  isTree: PropTypes.bool,
  spinning: PropTypes.bool,
  codeName: PropTypes.string,
  title: PropTypes.string,
  tableTitle: PropTypes.string,
  expandedKeys: PropTypes.array,
  autoExpandParent: PropTypes.bool,
  searchValue: PropTypes.string,
  selectedShops: PropTypes.array,
  allStore: PropTypes.array,
  disableSelect: PropTypes.array,
  onCancel: PropTypes.func,
  onConfirm: PropTypes.func,
  onSelect: PropTypes.func,
  onDelete: PropTypes.func,
  onDeleteAll: PropTypes.func,
  onSearch: PropTypes.func,
  onExpand: PropTypes.func,
};

export default treeTable;
