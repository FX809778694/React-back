import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router';
import {TRANSLATE_TRANSLATECENTER_ARTICLE} from '../../../../../utils/routePath'
import {TableComponent} from "../../../../../component/TableComponent";

export default function TableData ({sorter, filByState, filByEnabled, ...props}) {
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      render: (text, record) => (
        <Link to={`${TRANSLATE_TRANSLATECENTER_ARTICLE}/id/${record.id}`}>{text}</Link>
      ),
      sorter: true,
      sortOrder: sorter.match(/-id/)? 'descend': sorter.match(/id/) ? 'ascend' : false,
    }, {
      title: '主题标识ID',
      dataIndex: 'topicId',
      key: 'topicId',
      render: (text, record) => (
        <Link to={`${TRANSLATE_TRANSLATECENTER_ARTICLE}/id/${record.id}`}>{text}</Link>
      ),
      sorter: true,
      sortOrder: sorter.match(/-topicId/)? 'descend': sorter.match(/topicId/) ? 'ascend' : false,
    }, {
      title: '文章标题',
      dataIndex: 'title',
      key: 'title',
      width: '60%',
      render: (text, record) => (
        <span style={{WebkitBoxOrient: 'vertical'}}>
          <Link to={`${TRANSLATE_TRANSLATECENTER_ARTICLE}/id/${record.id}`}>{text}</Link>
        </span>
      ),
    }, {
      title: '状态',
      dataIndex: 'state',
      key: 'state',
      render: (text) => (
        text === 0
          ? <span>待翻</span>
          : text === 1
          ? <span>已翻</span>
          : text === 2
          ? <span>已驳回</span>
          : text
      ),
      filters: [
        { text: '待翻', value: 0 },
        { text: '已翻', value: 1},
        { text: '已驳回', value: 2},
      ],
      filterMultiple: false,
      filteredValue: filByState ? [filByState] : null,
    }, {
      title: '多少人希望精翻',
      dataIndex: 'userCount',
      key: 'userCount',
    }, {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <span>
          { record.state === 0 && <Link to={`${TRANSLATE_TRANSLATECENTER_ARTICLE}/id/${record.id}`}>驳回</Link> }
        </span>
      ),
    }
  ];
  return (
    <TableComponent label="希望精翻文章列表" columns={columns} {...props}/>
  )
}
TableData.propTypes = {
  data: PropTypes.array.isRequired,
}
