import React from 'react'
import {Icon, Badge} from 'antd';
import PropTypes from 'prop-types'
import {Link} from 'react-router';
import { CONFIG_LINKS} from '../../../../utils/routePath'
import {TableComponent} from "../../../../component/TableComponent";

export default function TableData ({handleDelete, sorter, filByType, ...props}) {
  const type = [
    { text: 'PC导航', value: 1 },
    { text: '手机快速入口', value: 2 },
    { text: '手机导航', value: 3 },
    { text: '友情链接', value: 4 },
    { text: '广告', value: 5 },
    { text: '新Banner图', value: 6 }
  ]
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      render: (text, record) => (
        <Link to={`${CONFIG_LINKS}/id/${record.id}`}>{text}</Link>
      ),
      sorter: true,
      sortOrder: sorter.match(/-id/)? 'descend': sorter.match(/id/) ? 'ascend' : false,
    }, {
      title: '新闻标题',
      dataIndex: 'title',
      key: 'title',
      render: (text, record) => (
        <Link to={`${CONFIG_LINKS}/id/${record.id}`}>{text}</Link>
      ),
    }, {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      render: (text) => (
        text === 1 ? <span>PC导航</span>
          : text === 2 ? <span>手机快速入口</span>
          : text === 3 ? <span>手机导航</span>
            : text === 4 ? <span>友情链接</span>
              : text === 5 ? <span>广告</span>
                : text === 6 ? <span>新Banner图</span>
                  : <span>{text}</span>
      ),
      filters: type,
      filtered: true,
      filteredValue: filByType ? filByType.split(',') : null,
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
      )
    }, {
      title: '排序',
      dataIndex: 'sort',
      key: 'sort',
      sorter: true,
      sortOrder: sorter.match(/-sort/)? 'descend': sorter.match(/sort/) ? 'ascend' : false,
    }, {
      title: '链接',
      dataIndex: 'href',
      key: 'href',
      width: '25%',
      render: (text) => (
        <span style={{WebkitBoxOrient: 'vertical'}}>{text}</span>
      )
    }, {
      title: '是否在新窗口打开',
      dataIndex: 'blank',
      width: 130,
      key: 'blank',
      render: (text) => (
        text === 0 ? <span>否</span>
          : text === 1 ? <span>是</span>
          : <span>{text}</span>
      )
    }, {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <span style={{fontSize: 16}}>
          <Link to={`${CONFIG_LINKS}/modify/${record.id}`}>
            <Icon type="edit" title="编辑"/>
          </Link>
          {
            record.enabled === 1 &&
            <span>
              <span className="ant-divider"/>
              <a><Icon data-id={record.id} onClick={handleDelete} type="delete" title="删除"/></a>
            </span>
          }
        </span>
      ),
    }
  ];
  return (
    <TableComponent label="链接管理列表" addLink={`${CONFIG_LINKS}/add`} columns={columns} {...props}/>
  )
}
TableData.propTypes = {
  data: PropTypes.array.isRequired
}
