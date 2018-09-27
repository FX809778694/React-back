import React from 'react'
import {Icon, Badge} from 'antd';
import PropTypes from 'prop-types'
import {Link} from 'react-router';
import {FRONT_DOMAIN} from "../../../../utils/config"
import {COMMON_RECOMMEND} from '../../../../utils/routePath'
import {TableComponent} from "../../../../component/TableComponent";

export default function TableData ({searchText, sorter, handleDelete, ...props}) {
  // const regText = new RegExp(searchText, 'gi');
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      render: (text, record) => (
        <a href={`${FRONT_DOMAIN}/p/${record.id}`} target="_blank">{text}</a>
      ),
    }, {
      title: '标题',
      dataIndex: 'post.title',
      key: 'post.title',
      width: '20%',
      render: (text, record) => (
        <span style={{WebkitBoxOrient: 'vertical'}}>
          <a href={`${FRONT_DOMAIN}/p/${record.id}`} target="_blank">{text}</a>
        </span>
      ),
    }, {
      title: '描述',
      dataIndex: 'post.description',
      key: 'post.description',
      width: '30%',
      render: (text, record) => (
        <span style={{WebkitBoxOrient: 'vertical'}}>{text}</span>
      ),
    }, {
      title: '类型',
      dataIndex: 'forumName',
      key: 'forumName',
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
      title: '创建人',
      dataIndex: 'creator',
      key: 'creator',
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
          <Link to={`${COMMON_RECOMMEND}/modify/${record.id}`}>
            <Icon type="edit" title="修改"/>
          </Link>
          <span className="ant-divider"/>
          <a>
            <Icon data-id={record.id} onClick={handleDelete} type="delete" title="删除"/>
          </a>
        </span>
      ),
    }
  ];
  return (
    <TableComponent label="周刊列表" addLink={`${COMMON_RECOMMEND}/add`} columns={columns} {...props}/>
  )
}
TableData.propTypes = {
  searchText: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  data: PropTypes.array.isRequired,
  meta: PropTypes.object.isRequired,
  onPaginationChange: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
}
