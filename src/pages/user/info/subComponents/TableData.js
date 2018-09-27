import React, {Component} from 'react'
import {Card, Col, Icon, Pagination, Row, Table} from 'antd';
import PropTypes from 'prop-types'
import {Link} from 'react-router';
import {USER_INFORMATION} from "../../../../utils/routePath"
import {profilesAdminUrl} from "../../../../api/url";

export default class TableData extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
    }
    this.onPaginationChange = this.onPaginationChange.bind(this)
  }

  onPaginationChange(page) {
    const {actions, searchId, searchText} = this.props
    this.setState({
      loading: true,
    })
    actions.fetchData(profilesAdminUrl, page, searchId, searchText)
  }

  componentWillReceiveProps() {
    this.setState({
      loading: false,
    })
  }

  render() {
    const columns = [
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        render: (text, record) => (
          <Link to={`${USER_INFORMATION}/id/${record.id}`}>{text}</Link>
        ),
      }, {
        title: '用户昵称',
        dataIndex: 'nickname',
        key: 'nickname',
        render: (text, record) => (
          <span style={{WebkitBoxOrient: 'vertical'}}>
            <Link to={`${USER_INFORMATION}/id/${record.id}`}>{text}</Link>
          </span>
        ),
      }, {
        title: '真实姓名',
        dataIndex: 'fullname',
        key: 'fullname',
      }, {
        title: '手机',
        dataIndex: 'mobile',
        key: 'mobile',
      }, {
        title: '联系邮箱',
        dataIndex: 'email',
        key: 'email',
      }, {
        title: '用户积分',
        dataIndex: 'userKarma',
        key: 'userKarma',
      }, {
        title: '用户最后访问时间',
        dataIndex: 'userLastvisit',
        key: 'userLastvisit',
      }, {
        title: '修改人',
        dataIndex: 'modifier',
        key: 'modifier',
      }, {
        title: '修改时间',
        dataIndex: 'modified',
        key: 'modified',
      }, {
        title: '创建人',
        dataIndex: 'creator',
        key: 'creator',
      }, {
        title: '创建时间',
        dataIndex: 'created',
        key: 'created',
      }, {
        title: '操作',
        key: 'action',
        render: (text, record) => (
          <span style={{fontSize: 16}}>
            <Link to={`${USER_INFORMATION}/${record.id}/subTable`}>
              <Icon type="copy" title="地址管理"/>
            </Link>
            <span className="ant-divider"/>
            <Link to={`${USER_INFORMATION}/modify/${record.id}`}>
              <Icon type="edit" title="编辑信息"/>
            </Link>
          </span>
        ),
      }
    ];
    const {data, meta} = this.props
    return (
      <Row gutter={16}>
        <Col className="gutter-row" span={24}>
          <div className="gutter-box">
            <Card title="拓展信息列表"
                  bordered={true}
            >
              <Table
                columns={columns}
                dataSource={data}
                rowKey={record => record.id}
                pagination={false}
                loading={this.state.loading}
                bordered
              />

              <Pagination
                showQuickJumper
                defaultCurrent={1}
                current={meta.number}
                total={meta.totalElements}
                onChange={this.onPaginationChange}
                style={{float: 'right', marginTop: '20px'}}
              />
            </Card>
          </div>
        </Col>
      </Row>
    )
  }
}
TableData.propTypes = {
  searchId: PropTypes.string,
  searchText: PropTypes.string,
  data: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
}
