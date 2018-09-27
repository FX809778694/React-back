import React from 'react'
import {Badge, Button, Card, Icon, Pagination, Table} from 'antd';
import PropTypes from 'prop-types'
import {Link} from 'react-router';
import {ARTICLE_TYPE, FRONT_DOMAIN} from "../../../../utils/config"
import {CONFIG_TOPICS} from '../../../../utils/routePath'

export default function TableData ({loading, data, meta, sorter, filByForumId, filByEnabled, onTableChange, onPaginationChange,
  resetLoading, selectedRowKeys, cancelAllSelected, onSelectChange, handleAddIndex, handleBatchAddIndex, handleDeleteIndex}) {
  const rowSelection = { selectedRowKeys, onChange: onSelectChange };
  const hasSelected = selectedRowKeys.length > 0;
  const valueForForumFilter = []
  ARTICLE_TYPE.map(i => valueForForumFilter.push({text: i.name, value: i.id}))
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      render: (text, record) => (
        <a href={`${FRONT_DOMAIN}/p/${record.id}`} target="_blank">{text}</a>
      ),
      sorter: true,
      sortOrder: sorter.match(/-id/)? 'descend': sorter.match(/id/) ? 'ascend' : false,
    }, {
      title: '主题标题',
      dataIndex: 'title',
      key: 'title',
      width: '30%',
      render: (text, record) => (
        <span style={{WebkitBoxOrient: 'vertical'}}>
          <a href={`${FRONT_DOMAIN}/p/${record.id}`} target="_blank">{text}</a>
        </span>
      ),
    }, {
      title: '板块',
      dataIndex: 'forumId',
      key: 'forumId',
      render: text => ARTICLE_TYPE.find(i => i.id === text).name,
      filters: valueForForumFilter,
      filteredValue: filByForumId ? [filByForumId] : null,
    }, {
      title: '搜索引擎助推数',
      dataIndex: 'boost',
      key: 'boost',
      sorter: true,
      sortOrder: sorter.match(/-boost/)? 'descend': sorter.match(/boost/) ? 'ascend' : false,
    }, {
      title: '训练样本',
      dataIndex: 'trainSample',
      key: 'trainSample',
      sorter: true,
      sortOrder: sorter.match(/-trainSample/)? 'descend': sorter.match(/trainSample/) ? 'ascend' : false,
    }, {
      title: '是否人工标注',
      dataIndex: 'categoryId',
      key: 'categoryId',
      sorter: true,
      sortOrder: sorter.match(/-categoryId/)? 'descend': sorter.match(/categoryId/) ? 'ascend' : false,
    }, {
      title: '是否可用',
      dataIndex: 'enabled',
      key: 'enabled',
      render: text => (
        text === 0
          ? <Badge status="error" text={'不可用'}/>
          : text === 1
          ? <Badge status="processing" text={'可用'}/>
          : text
      ),
      filters: [
        { text: '可用', value: 1 },
        { text: '不可用', value: 0 },
      ],
      filterMultiple: false,
      filteredValue: filByEnabled ? [filByEnabled] : null,
    }, {
      title: '创建人',
      dataIndex: 'creator',
      key: 'creator',
    }, {
      title: '修改人',
      dataIndex: 'modifier',
      key: 'modifier',
    }, {
      title: '创建时间',
      dataIndex: 'created',
      key: 'created',
      sorter: true,
      sortOrder: sorter.match(/-created/)? 'descend': sorter.match(/created/) ? 'ascend' : false,
    }, {
      title: '修改时间',
      dataIndex: 'modified',
      key: 'modified',
      sorter: true,
      sortOrder: sorter.match(/-modified/)? 'descend': sorter.match(/modified/) ? 'ascend' : false,
    }, {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <span style={{fontSize: 16}}>
          <Link to={`${CONFIG_TOPICS}/modify/${record.id}`}>
            <Icon type="edit" title="编辑"/>
          </Link>
            <a>
              <span className="ant-divider"/>
              <Icon data-id={record.id} onClick={handleDeleteIndex} type="delete" title="删除主题索引"/>
            </a>
          <a>
            <span className="ant-divider"/>
            <Icon data-id={record.id} onClick={handleAddIndex} type="plus" title="新增主题索引"/>
          </a>
        </span>
      ),
    }
  ];
  return (
    <Card title="主题列表"  bordered={true} >
      <div className='mar-bottom-20'>
        <Button type="primary" onClick={cancelAllSelected} disabled={!hasSelected}  loading={resetLoading}>取消所有选择</Button>
        <span className='mar-left-10'>{hasSelected ? `已选中 ${selectedRowKeys.length} 条` : ''}</span>
        <Button className='mar-left-10' onClick={handleBatchAddIndex} title="批量增加主题索引">批量增加索引</Button>
      </div>
      <Table
        columns={columns}
        dataSource={data}
        rowKey={record => record.id}
        pagination={false}
        loading={loading}
        rowSelection={rowSelection}
        onChange={onTableChange}
        bordered
      />
      <Pagination
        showQuickJumper
        defaultCurrent={1}
        current={meta.number}
        total={meta.totalElements}
        onChange={onPaginationChange}
        style={{float: 'right', marginTop: '20px'}}
      />
    </Card>
  )
}
TableData.propTypes = {
  data: PropTypes.array.isRequired,
}
