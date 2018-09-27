import React from 'react'
import {Badge, Icon} from 'antd';
import PropTypes from 'prop-types'
import {Link} from 'react-router';
import {CONFIG_SEARCH_LABELQUERY} from '../../../../../utils/routePath'
import {TableComponent} from "../../../../../component/TableComponent";

export default function TableData ({handleDelete, sorter, filByEnabled, ...props}) {
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      render: (text, record) => (
        <Link to={`${CONFIG_SEARCH_LABELQUERY}/id/${record.id}`}>{text}</Link>
      ),
      sorter: true,
      sortOrder: sorter.match(/-id/) ? 'descend' : sorter.match(/id/) ? 'ascend' : false,
    },{
      title: '查询建造器名称',
      dataIndex: 'title',
      key: 'title',
      render: (text, record) => (
        <Link to={`${CONFIG_SEARCH_LABELQUERY}/id/${record.id}`}>{text}</Link>
      ),
    }, {
      title: '是否可用',
      dataIndex: 'enabled',
      key: 'enabled',
      render: text => (
        text === 0
          ? <Badge status="error" text={'不可用'}/>
          : text === 1
          ? <Badge status="processing" text={'可用'}/>
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
      title: '修改人',
      dataIndex: 'modifier',
      key: 'modifier',
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
          <Link to={`${CONFIG_SEARCH_LABELQUERY}/modify/${record.id}`}>
            <Icon type="edit" title="编辑"/>
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
    <TableComponent label="标签查询列表" addLink={`${CONFIG_SEARCH_LABELQUERY}/add`} columns={columns} {...props}/>
  )
}
TableData.propTypes = {
  data: PropTypes.array.isRequired,
}
