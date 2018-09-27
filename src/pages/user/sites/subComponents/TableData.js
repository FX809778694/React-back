import React, {Component} from 'react'
import {Button, Card, Col, Icon, Pagination, Row, Table} from 'antd';
import PropTypes from 'prop-types'
import {Link} from 'react-router';
import {USER_SITES} from "../../../../utils/routePath"
import {userSitesUrl} from "../../../../api/url";

export default class TableData extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
    }
    this.onPaginationChange = this.onPaginationChange.bind(this)
  }

  onPaginationChange(page) {
    const {actions, name, selected} = this.props
    this.setState({
      loading: true,
    })
    actions.fetchData(userSitesUrl, page, name, selected)
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
        key: 'id'
      }, {
        title: '站点名',
        dataIndex: 'name',
        key: 'name'
      }, {
        title: '是否可用',
        dataIndex: 'enabled',
        key: 'enabled',
        render: (text, record) => (
          text === 0 ? '已删除' : text === 1 ? '已启用' : text
        )
      }, {
        title: 'appKey',
        dataIndex: 'appKey',
        key: 'appKey',
        width: 250
      }, {
        title: 'appSecret',
        dataIndex: 'appSecret',
        key: 'appSecret',
        width: 250
      }, {
        title: '站点描述',
        dataIndex: 'description',
        key: 'description',
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
            <Link to={`${USER_SITES}/modify/${record.id}`}>
              <Icon type="edit" title="编辑"/>
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
            <Card title="站点列表"
                  extra={<Link to={`${USER_SITES}/add`}><Button>添加</Button></Link>}
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
  name: PropTypes.string,
  selected: PropTypes.string,
  data: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
}
