import React from 'react'
import {Icon, Badge} from 'antd';
import PropTypes from 'prop-types'
import {Link} from 'react-router';
import {CONFIG_CATEGORYMANAGE} from '../../../../utils/routePath'
import {TableComponent} from "../../../../component/TableComponent";
import {ARTICLE_TYPE} from "../../../../utils/config";

export default function TableData ({sorter, filByForumId, filByEnabled, handleDelete, ...props}) {
  const valueForForumFilter = []
  ARTICLE_TYPE.map(i => valueForForumFilter.push({text: i.name, value: i.id}))
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      render: (text, record) => (
        <Link to={`${CONFIG_CATEGORYMANAGE}/id/${record.id}`}>{text}</Link>
      ),
      sorter: true,
      sortOrder: sorter.match(/-id/)? 'descend': sorter.match(/id/) ? 'ascend' : false,
    }, {
      title: '类别名称',
      dataIndex: 'title',
      key: 'title',
      render: (text, record) => (
        <Link to={`${CONFIG_CATEGORYMANAGE}/id/${record.id}`}>{text}</Link>
      ),
    }, {
      title: '模块ID',
      dataIndex: 'forumId',
      key: 'forumId',
      render: text => ARTICLE_TYPE.find(i => i.id === text).name,
      filters: valueForForumFilter,
      filteredValue: filByForumId ? [filByForumId] : null,
    }, {
      title: '根节点ID',
      dataIndex: 'rootId',
      key: 'rootId'
    }, {
      title: '父节点ID',
      dataIndex: 'parentId',
      key: 'parentId'
    }, {
      title: '节点路径',
      dataIndex: 'path',
      key: 'path'
    }, {
      title: '深度',
      dataIndex: 'depth',
      key: 'depth'
    }, {
      title: '叶子节点',
      dataIndex: 'leaf',
      key: 'leaf',
      render: text => (
        text === 0 ? '否' : text === 1 ? '是' : text
      )
    }, {
      title: '排序字段',
      dataIndex: 'displayOrder',
      key: 'displayOrder'
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
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <span style={{fontSize: 16}}>
          <Link to={`${CONFIG_CATEGORYMANAGE}/modify/${record.id}`}>
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
    <TableComponent label="分类管理列表" addLink={`${CONFIG_CATEGORYMANAGE}/add`} columns={columns} {...props}/>
  )
}
TableData.propTypes = {
  data: PropTypes.array.isRequired,
}
