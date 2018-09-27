import React from 'react'
import {Icon} from 'antd'
import PropTypes from 'prop-types'
import {TableComponent} from "../../../../component/TableComponent"

export default function TableData ({addRemoval, handleDelete, ...props}) {
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    }, {
      title: '主题标识',
      dataIndex: 'topicId',
      key: 'topicId',
    }, {
      title: '目标主题标识',
      dataIndex: 'targetId',
      key: 'targetId',
    }, {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
    }, {
      title: '评分',
      dataIndex: 'score',
      key: 'score',
    }, {
      title: ' 是否可用',
      dataIndex: 'enabled',
      key: 'enabled',
    }, {
      title: ' 创建人',
      dataIndex: 'creator',
      key: 'creator',
    }, {
      title: ' 修改人',
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
        <span style={{fontSize: 16}}>
          <a>
            <Icon data-id={record.id} onClick={handleDelete} type="delete" title="删除"/>
          </a>
        </span>
      ),
    }
  ];
  return (
    <TableComponent label="去重列表" addClick={addRemoval} columns={columns} {...props}/>
  )
}
TableData.propTypes = {
  data: PropTypes.array.isRequired,
}
