import React from 'react'
import {Icon, Badge} from 'antd';
import PropTypes from 'prop-types'
import {Link} from 'react-router';
import {QUESTION_QUIZS} from '../../../../utils/routePath'
import {TableComponent} from "../../../../component/TableComponent";

export default function TableData ({handleDelete, showBackImg, sorter, filByState, filByEnabled, ...props}) {
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      render: (text, record) => (
        <Link to={`${QUESTION_QUIZS}/id/${record.id}`}>{text}</Link>
      ),
      sorter: true,
      sortOrder: sorter.match(/-id/) ? 'descend' : sorter.match(/id/) ? 'ascend' : false,
    }, {
      title: '问卷标题',
      dataIndex: 'title',
      key: 'title',
      render: (text, record) => (
        <Link to={`${QUESTION_QUIZS}/id/${record.id}`}>{text}</Link>
      ),
    }, {
      title: '问卷描述',
      dataIndex: 'description',
      key: 'description',
      width: '30%',
      render: text => <span style={{WebkitBoxOrient: 'vertical'}}>{text}</span>
    }, {
      title: '问卷状态',
      dataIndex: 'state',
      key: 'state',
      render: (text, record) => (
        text === 0 ? '待发布' : text === 1 ? '发布中' : text === 2 ? '结束发布' : text
      ),
      filters: [
        { text: '待发布', value: 0 },
        { text: '发布中', value: 1 },
        { text: '结束发布', value: 2 },
      ],
      filterMultiple: false,
      filteredValue: filByState ? [filByState] : null,
    }, {
      title: '题目个数',
      dataIndex: 'questionNum',
      key: 'questionNum',
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
      key: 'creator'
    }, {
      title: '修改人',
      dataIndex: 'modifier',
      key: 'modifier'
    }, {
      title: '创建时间',
      dataIndex: 'created',
      key: 'created',
      sorter: true,
      sortOrder: sorter.match(/-created/) ? 'descend' : sorter.match(/created/) ? 'ascend' : false,
    }, {
      title: '修改时间',
      dataIndex: 'modified',
      key: 'modified',
      sorter: true,
      sortOrder: sorter.match(/-modified/) ? 'descend' : sorter.match(/modified/) ? 'ascend' : false,
    }, {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <span style={{fontSize: 16}}>
          <Icon data-id={record.backImg} type="picture" title="问卷背景图" onClick={showBackImg}/>
          <span className="ant-divider"/>
          <Link to={`${QUESTION_QUIZS}/modify/${record.id}`}>
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
    <TableComponent label="问卷列表" addLink={`${QUESTION_QUIZS}/add`} columns={columns} {...props}/>
  )
}
TableData.propTypes = {
  data: PropTypes.array.isRequired,
}
