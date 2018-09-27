import React from 'react'
import {Icon} from 'antd';
import PropTypes from 'prop-types'
import {TableComponent} from "../../../../component/TableComponent";

export default function TableData ({handleDelete, updateData, ...props}) {
    const columns = [
      {
        title: '主题ID',
        dataIndex: 'topicId',
        key: 'topicId',
        render: (text) => (
          <span style={{WebkitBoxOrient: 'vertical'}}>{text}</span>
        )
      }, {
        title: '主题标题',
        dataIndex: 'title',
        key: 'title',
        render: text => text ? text : '--'
      }, {
        title: '分数',
        dataIndex: 'score',
        key: 'score',
      }, {
        title: '操作',
        key: 'action',
        render: (text, record) => (
          <span style={{fontSize: 16}}>
            <a>
              <Icon data-id={record.topicId} onClick={handleDelete} type="delete" title="删除"/>
            </a>
          </span>
        ),
      }
    ];
    return (
      <TableComponent label="排行榜" addClick={updateData} extraText="更新" columns={columns} {...props}/>
    )
}
TableData.propTypes = {
  data: PropTypes.array.isRequired,
}
