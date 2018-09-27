import React from 'react'
import {Badge, Icon} from 'antd';
import PropTypes from 'prop-types'
import {Link} from 'react-router';
import {DATA_LOGDICTIONARY} from '../../../../utils/routePath'
import {TableComponent} from "../../../../component/TableComponent";

export default function TableData ({handleDelete, sorter, filByEnabled, ...props}) {
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      render: (text, record) => (
        <Link to={`${DATA_LOGDICTIONARY}/id/${record.id}`}>{text}</Link>
      ),
      sorter: true,
      sortOrder: sorter.match(/-id/) ? 'descend' : sorter.match(/id/) ? 'ascend' : false,
    }, {
      title: '事件字典',
      dataIndex: 'eventCode',
      key: 'eventCode',
      render: (text, record) => (
        <Link to={`${DATA_LOGDICTIONARY}/id/${record.id}`}>{text}</Link>
      ),
    }, {
      title: '来源',
      dataIndex: 'eventType',
      key: 'eventType',
    }, {
      title: '描述',
      dataIndex: 'eventDescribe',
      key: 'eventDescribe',
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
      key: 'creator',
    }, {
      title: '创建时间',
      dataIndex: 'created',
      key: 'created',
      sorter: true,
      sortOrder: sorter.match(/-created/) ? 'descend' : sorter.match(/created/) ? 'ascend' : false,
    }, {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <span style={{fontSize: 16}}>
          <Link to={`${DATA_LOGDICTIONARY}/modify/${record.id}`}>
            <Icon type="edit" title="修改字典"/>
          </Link>
          {
            record.enabled !== 0 &&

            <a>
              <span className="ant-divider"/>
              <Icon data-id={record.id} onClick={handleDelete} type="delete" title="删除"/>
            </a>
          }
        </span>
      ),
    }
  ];
  return (
    <TableComponent label="日志字典列表" addLink={`${DATA_LOGDICTIONARY}/add`} columns={columns} {...props}/>
  )
}
TableData.propTypes = {
  data: PropTypes.array.isRequired,
}
