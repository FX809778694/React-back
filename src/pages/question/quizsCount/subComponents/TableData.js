import React from 'react'
import {Icon, Badge} from 'antd';
import PropTypes from 'prop-types'
import {Link} from 'react-router';
import {QUESTION_QUIZSCOUNT} from '../../../../utils/routePath'
import {TableComponent} from "../../../../component/TableComponent";

export default function TableData ({handleDelete, sorter, filByState, filByEnabled, ...props}) {
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      render: (text, record) => (
        <Link to={`${QUESTION_QUIZSCOUNT}/id/${record.id}`}>{text}</Link>
      ),
      sorter: true,
      sortOrder: sorter.match(/-id/) ? 'descend' : sorter.match(/id/) ? 'ascend' : false,
    }, {
      title: '问卷ID',
      dataIndex: 'quizId',
      key: 'quizId',
      render: (text, record) => (
        <Link to={`${QUESTION_QUIZSCOUNT}/id/${record.id}`}>{text}</Link>
      ),
      sorter: true,
      sortOrder: sorter.match(/-quizId/) ? 'descend' : sorter.match(/quizId/) ? 'ascend' : false,
    }, {
      title: '答题人数',
      dataIndex: 'peoples',
      key: 'peoples',
      render: (text, record) => (
        <Link to={`${QUESTION_QUIZSCOUNT}/id/${record.id}`}>{text}</Link>
      ),
      sorter: true,
      sortOrder: sorter.match(/-peoples/) ? 'descend' : sorter.match(/peoples/) ? 'ascend' : false,
    }, {
      title: '0-9%',
      dataIndex: 'first',
      key: 'first',
      sorter: true,
      sortOrder: sorter.match(/-first/) ? 'descend' : sorter.match(/first/) ? 'ascend' : false,
    }, {
      title: '10-19%',
      dataIndex: 'second',
      key: 'second',
      sorter: true,
      sortOrder: sorter.match(/-second/) ? 'descend' : sorter.match(/second/) ? 'ascend' : false,
    }, {
      title: '20-29%',
      dataIndex: 'third',
      key: 'third',
      sorter: true,
      sortOrder: sorter.match(/-third/) ? 'descend' : sorter.match(/third/) ? 'ascend' : false,
    }, {
      title: '30-39%',
      dataIndex: 'fourth',
      key: 'fourth',
      sorter: true,
      sortOrder: sorter.match(/-fourth/) ? 'descend' : sorter.match(/fourth/) ? 'ascend' : false,
    }, {
      title: '40-49%',
      dataIndex: 'fifth',
      key: 'fifth',
      sorter: true,
      sortOrder: sorter.match(/-fifth/) ? 'descend' : sorter.match(/fifth/) ? 'ascend' : false,
    }, {
      title: '50-59%',
      dataIndex: 'sixth',
      key: 'sixth',
      sorter: true,
      sortOrder: sorter.match(/-sixth/) ? 'descend' : sorter.match(/sixth/) ? 'ascend' : false,
    }, {
      title: '60-69%',
      dataIndex: 'seventh',
      key: 'seventh',
      sorter: true,
      sortOrder: sorter.match(/-seventh/) ? 'descend' : sorter.match(/seventh/) ? 'ascend' : false,
    }, {
      title: '70-79%',
      dataIndex: 'eighth',
      key: 'eighth',
      sorter: true,
      sortOrder: sorter.match(/-eighth/) ? 'descend' : sorter.match(/eighth/) ? 'ascend' : false,
    }, {
      title: '80-89%',
      dataIndex: 'ninth',
      key: 'ninth',
      sorter: true,
      sortOrder: sorter.match(/-ninth/) ? 'descend' : sorter.match(/ninth/) ? 'ascend' : false,
    }, {
      title: '90-100%',
      dataIndex: 'tenth',
      key: 'tenth',
      sorter: true,
      sortOrder: sorter.match(/-tenth/) ? 'descend' : sorter.match(/tenth/) ? 'ascend' : false,
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
          <Link to={`${QUESTION_QUIZSCOUNT}/modify/${record.id}`}>
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
    <TableComponent label="问卷统计列表" addLink={`${QUESTION_QUIZSCOUNT}/add`} columns={columns} {...props}/>
  )
}
TableData.propTypes = {
  data: PropTypes.array.isRequired,
}
