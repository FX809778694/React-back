import React from 'react'
import {Icon, Badge} from 'antd';
import PropTypes from 'prop-types'
import {Link} from 'react-router';
import {CONFIG_CHANNELS} from '../../../../utils/routePath'
import {TableComponent} from "../../../../component/TableComponent";

export default function TableData ({handleDelete, handleEnabled, sorter, filByChannelType, filByEnabled, ...props}) {
  const channelType = [
    { text: '版面频道', value: 1 },
    { text: '标签频道', value: 2 },
    { text: '用户频道', value: 3 },
    { text: '来源频道', value: 4 },
    { text: '排行频道', value: 5 }
  ]
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      render: (text, record) => (
        <Link to={`${CONFIG_CHANNELS}/id/${record.id}`}>{text}</Link>
      ),
      sorter: true,
      sortOrder: sorter.match(/-id/)? 'descend': sorter.match(/id/) ? 'ascend' : false,
    }, {
      title: '频道名称',
      dataIndex: 'channelName',
      key: 'channelName',
      render: (text, record) => (
        <Link to={`${CONFIG_CHANNELS}/id/${record.id}`}>{text}</Link>
      ),
    }, {
      title: '频道类型',
      dataIndex: 'channelType',
      key: 'channelType',
      render: text => (
        channelType.find(i => i.value === text).text
      ),
      filters: channelType,
      filtered: true,
      filteredValue: filByChannelType ? filByChannelType.split(',') : null,
    }, {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
      width: '30%',
      render: text => text ? <span style={{WebkitBoxOrient: 'vertical'}}>{text}</span> : '--'
    }, {
      title: '关注数',
      dataIndex: 'watched',
      key: 'watched'
    }, {
      title: '是否可取消关注',
      dataIndex: 'cancellable',
      key: 'cancellable',
      render: text => text === 0 ? '不可以' :  text === 1 ? '可以' : text,
    }, {
      title: '是否可用',
      dataIndex: 'enabled',
      key: 'enabled',
      render: text => (
        text === 0
          ? <Badge status="error" text='不可用'/>
          : text === 1
          ? <Badge status="processing" text='可用'/>
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
          <Link to={`${CONFIG_CHANNELS}/modify/${record.id}`}>
            <Icon type="edit" title="编辑"/>
          </Link>
          <span>
            <span className="ant-divider"/>
            {
              record.enabled === 1
              ? <a><Icon data-id={record.id} onClick={handleDelete} type="delete" title="删除"/></a>
              : <a><Icon data-id={record.id} onClick={handleEnabled} type="reload" title="启用"/></a>
            }
          </span>
        </span>
      ),
    }
  ];
  return (
    <TableComponent label="频道管理列表" addLink={`${CONFIG_CHANNELS}/add`} columns={columns} {...props}/>
  )
}
TableData.propTypes = {
  data: PropTypes.array.isRequired,
}
