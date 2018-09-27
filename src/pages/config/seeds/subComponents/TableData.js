import React from 'react'
import {Icon, Badge} from 'antd';
import PropTypes from 'prop-types'
import {Link} from 'react-router';
import {CONFIG_SEEDS} from '../../../../utils/routePath'
import {TableComponent} from "../../../../component/TableComponent";

export default function TableData ({handleDelete, sorter, ...props}) {
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      render: (text, record) => (
        <Link to={`${CONFIG_SEEDS}/id/${record.id}`}>{text}</Link>
      ),
      sorter: true,
      sortOrder: sorter.match(/-id/)? 'descend': sorter.match(/id/) ? 'ascend' : false,
    }, {
      title: '种子来源名称/简称',
      dataIndex: 'source',
      key: 'source',
      render: (text, record) => (
        <Link to={`${CONFIG_SEEDS}/id/${record.id}`}>{text}</Link>
      ),
    }, {
      title: '种子URL',
      dataIndex: 'url',
      key: 'url',
      width: '30%',
      render: (text, record) => (
        <span style={{WebkitBoxOrient: 'vertical'}}>
          <a className="seedsUrl" href={text} target="_blank">{text}</a>
        </span>
      ),
    }, /* {
      title: '种子配置',
      dataIndex: 'conf',
      key: 'conf',
      width: '40%',
      render: text => (
        <span style={{WebkitBoxOrient: 'vertical'}}>
          <pre style={{whiteSpace: 'normal'}}>{JSON.stringify(text)}</pre>
          {/!*{text}*!/}
        </span>
      )
    }, */{
      title: '类型名称',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '代理IP',
      dataIndex: 'agencyIp',
      key: 'agencyIp',
    }, {
      title: '代理端口',
      dataIndex: 'agencyIpPort',
      key: 'agencyIpPort',
    }, {
      title: '字符集',
      dataIndex: 'charset',
      key: 'charset',
    }, {
      title: '种子描述',
      dataIndex: 'description',
      key: 'description',
    }, {
      title: '语言',
      dataIndex: 'language',
      key: 'language',
      render: text => (
        text === 1
          ? '中文'
          : text === 2
          ? '英文'
          : text
      )
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
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <span style={{fontSize: 16}}>
          <Link to={`${CONFIG_SEEDS}/modify/${record.id}`}>
            <Icon type="edit" title="编辑"/>
          </Link>
          { record.enabled !== 0 &&
            <span>
              <span className="ant-divider"/>
              <a>
              <Icon data-id={record.id} onClick={handleDelete} type="delete" title="删除"/>
              </a>
            </span>
          }
        </span>
      ),
    }
  ];
  return (
    <TableComponent label="爬虫种子网站列表" addLink={`${CONFIG_SEEDS}/add`} columns={columns} {...props}/>
  )
}
TableData.propTypes = {
  data: PropTypes.array.isRequired,
}
