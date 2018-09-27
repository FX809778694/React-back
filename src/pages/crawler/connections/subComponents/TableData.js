import React, {Component} from 'react'
import {Card, Col, Row, Table} from 'antd';
import PropTypes from 'prop-types'

export default class TableData extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true
    }
  }

  componentWillReceiveProps({data}) {
    this.setState({
      loading: false,
    })
  }

  render() {
    const columns = [
      {
        title: '客户端名字',
        dataIndex: 'name',
        key: 'name',
      }, {
        title: '账户登陆名字',
        dataIndex: 'user',
        key: 'user'
      }, {
        title: '客户端IP',
        dataIndex: 'host',
        key: 'host',
      }, {
        title: '是否加密',
        dataIndex: 'ssl',
        key: 'ssl',
        render: text => (
          text ? '加密' : '未加密'
        )
      }, {
        title: '运行状态',
        dataIndex: 'state',
        key: 'state',
      }, {
        title: '心跳时间',
        dataIndex: 'timeout',
        key: 'timeout',
      }, {
        title: '协议名称',
        dataIndex: 'protocol',
        key: 'protocol',
      }, {
        title: '建立连接时间',
        dataIndex: 'connected_at',
        key: 'connected_at',
      }
    ];
    const {data} = this.props
    return (
      <Row gutter={16}>
        <Col className="gutter-row" span={24}>
          <div className="gutter-box">
            <Card title="连接状态列表"
                  bordered={true}
            >
              <Table
                columns={columns}
                dataSource={data}
                rowKey={record => record.name}
                pagination={false}
                loading={this.state.loading}
                bordered
              />

            </Card>
          </div>
        </Col>
      </Row>
    )
  }
}
TableData.propTypes = {
  data: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
}
