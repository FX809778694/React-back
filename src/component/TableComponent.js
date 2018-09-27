import React from 'react'
import {Button, Card, Pagination, Table} from 'antd';
import {Link} from 'react-router';
import PropTypes from 'prop-types'

export const TableComponent = ({label, addLink, addClick, columns, loading, data, meta, onTableChange, onPaginationChange, extraText}) => (
  <Card title={label} extra={(addLink || addClick) && <Link to={addLink}><Button onClick={addClick}>{extraText || '添加'}</Button></Link>} bordered={true} >
    <Table
      columns={columns}
      dataSource={data}
      rowKey={record => record.id}
      pagination={false}
      loading={loading}
      onChange={onTableChange}
      bordered
    />
    <Pagination
      showQuickJumper
      defaultCurrent={1}
      current={meta.number}
      total={meta.totalElements}
      onChange={onPaginationChange}
      style={{float: 'right', marginTop: '20px'}}
    />
  </Card>
)
TableComponent.propTypes = {
  label: PropTypes.string.isRequired,
  addLink: PropTypes.string,
  topicId: PropTypes.func,
  columns: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  data: PropTypes.array.isRequired,
  meta: PropTypes.object.isRequired,
  onPaginationChange: PropTypes.func.isRequired
}
