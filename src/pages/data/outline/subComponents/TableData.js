import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router';
import {DATA_OUTLINE} from '../../../../utils/routePath'
import {TableComponent} from "../../../../component/TableComponent";

export default function TableData ({handleDelete, filByWechat, ...props}) {
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      render: (text, record) => (
        <Link to={`${DATA_OUTLINE}/id/${record.id}`}>{text}</Link>
      ),
    }, {
      title: '来源',
      dataIndex: 'source',
      key: 'source',
      render: (text, record) => (
        <Link to={`${DATA_OUTLINE}/id/${record.id}`}>{text}</Link>
      ),
    }, {
      title: '事件字典',
      dataIndex: 'eventCode',
      key: 'eventCode',
    }, {
      title: 'URL',
      dataIndex: 'urlLog',
      key: 'urlLog',
    }, {
      title: '微信',
      dataIndex: 'isWechat',
      key: 'isWechat',
      width: '10%',
      render: (text) => (
        <span style={{WebkitBoxOrient: 'vertical'}}>{text===1?'是':'否'}</span>
      ),
      filters: [
        { text: '是', value: 1 },
        { text: '否', value: 0 },
      ],
      filterMultiple: false,
      filteredValue: filByWechat ? [filByWechat] : null,
    }, {
      title: '会话标识',
      dataIndex: 'ssid',
      key: 'ssid',
    }, {
      title: 'IP地址',
      dataIndex: 'ip',
      key: 'ip',
    }, {
      title: '创建人',
      dataIndex: 'creator',
      key: 'creator',
    }, {
      title: '创建时间',
      dataIndex: 'created',
      key: 'created',
    }
  ];
  return (
    <TableComponent label="日志概要" columns={columns} {...props}/>
  )
}
TableData.propTypes = {
  data: PropTypes.array.isRequired,
}
