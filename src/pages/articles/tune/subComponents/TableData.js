import React from 'react'
import {Icon, Badge} from 'antd';
import PropTypes from 'prop-types'
import {Link} from 'react-router';
import {ARTICLE_TUNE} from '../../../../utils/routePath'
import {TableComponent} from "../../../../component/TableComponent";

export default function TableData ({searchText, handleDelete, ...props}) {
  const regText = new RegExp(searchText, 'gi');
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      render: (text, record) => (
        <Link to={`${ARTICLE_TUNE}/id/${record.id}`}>{text}</Link>
      ),
    }, {
      title: '美频标题',
      dataIndex: 'title',
      key: 'title',
      width: '30%',
      render: (text, record) => (
        <span style={{WebkitBoxOrient: 'vertical'}}>
          <Link to={`${ARTICLE_TUNE}/id/${record.id}`}>{
            ( text && searchText ) ? text.split(regText).map((i, index) => (
              index > 0 ? [<span className="highlight">{record.title.match(regText)[0]}</span>, i] : i)
            ) : text
          }</Link>
        </span>
      ),
    }, {
      title: '父标识',
      dataIndex: 'post.parentId',
      key: 'post.parentId',
    }, {
      title: '作者',
      dataIndex: 'document.author',
      key: 'document.author',
      width: '10%',
      render: (text) => (
        <span style={{WebkitBoxOrient: 'vertical'}}>{text}</span>
      )
    }, {
      title: '品牌',
      dataIndex: 'document.brand',
      key: 'document.brand',
      width: '10%',
      render: (text) => (
        <span style={{WebkitBoxOrient: 'vertical'}}>{text}</span>
      )
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
      )
    }, {
      title: '创建人',
      dataIndex: 'creator',
      key: 'creator',
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
          <Link to={`${ARTICLE_TUNE}/${record.post.topicId}/subTable`}>
            <Icon type="copy" title="二级列表"/>
          </Link>
          <span className="ant-divider"/>
          <Link to={`${ARTICLE_TUNE}/modify/${record.id}`}>
            <Icon type="edit" title="编辑原文"/>
          </Link>
          <span className="ant-divider"/>
          <a>
            <Icon data-id={record.id} onClick={handleDelete} type="delete" title="删除"/>
          </a>
        </span>
      ),
    }
  ];
  return (
    <TableComponent label="美频" addLink={`${ARTICLE_TUNE}/add`} columns={columns} {...props}/>
  )
}
TableData.propTypes = {
  searchText: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  data: PropTypes.array.isRequired,
  meta: PropTypes.object.isRequired,
  onPaginationChange: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
}
