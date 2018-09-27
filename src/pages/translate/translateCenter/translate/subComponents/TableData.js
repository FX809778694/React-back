import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router';
import {TRANSLATE_TRANSLATECENTER_TRANSLATE} from "../../../../../utils/routePath"
import {TableComponent} from "../../../../../component/TableComponent";

export default function TableData ({sorter, filByState, filByEnabled, ...props}) {
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      render: (text, record) => (
        <Link to={`${TRANSLATE_TRANSLATECENTER_TRANSLATE}/id/${record.postId}`}>{text}</Link>
      ),
      sorter: true,
      sortOrder: sorter.match(/-id/)? 'descend': sorter.match(/id/) ? 'ascend' : false,
    }, {
      title: 'PostId',
      dataIndex: 'postId',
      key: 'postId',
      render: (text, record) => (
        <Link to={`${TRANSLATE_TRANSLATECENTER_TRANSLATE}/id/${record.postId}`}>{text}</Link>
      ),
      sorter: true,
      sortOrder: sorter.match(/-postId/)? 'descend': sorter.match(/postId/) ? 'ascend' : false,
    }, {
      title: '文章标题',
      dataIndex: 'title',
      key: 'title',
      width: '30%',
      render: (text, record) => (
        <span style={{WebkitBoxOrient: 'vertical'}}>
          <Link to={`${TRANSLATE_TRANSLATECENTER_TRANSLATE}/id/${record.postId}`}>{text}</Link>
        </span>
      ),
    }, {
      title: '状态',
      dataIndex: 'state',
      key: 'state',
      render: (text) => (
        text === 1 ? <span>草稿箱</span>
          : text === 2 ? <span>待审核</span>
          : text === 3 ? <span>审核通过</span>
            : text === 4 ? <span>审核失败</span>
              : text === 5 ? <span>被覆盖</span>
                : text === 9 ? <span>已删除</span>
                  : <span>{text}</span>
      ),
      filters: [
        { text: '草稿箱', value: 1 },
        { text: '待审核', value: 2},
        { text: '审核通过', value: 3},
        { text: '审核失败', value: 4},
        { text: '被覆盖', value: 5},
        { text: '已删除', value: 9},
      ],
      filterMultiple: false,
      filteredValue: filByState ? [filByState] : null,
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
    }, {
      title: '修改时间',
      dataIndex: 'modified',
      key: 'modified',
    }, {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <span>
          {
            record.state === 2 && <Link to={`${TRANSLATE_TRANSLATECENTER_TRANSLATE}/id/${record.postId}`}>审核</Link>
          }
        </span>
      ),
    }
  ];
  return (
    <TableComponent label="审核精翻列表" columns={columns} {...props}/>
  )
}
TableData.propTypes = {
  data: PropTypes.array.isRequired,
}
