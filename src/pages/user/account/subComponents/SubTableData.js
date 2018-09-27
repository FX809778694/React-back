import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as Actions from '../../../../store/userCenter/user/actions/index'
import {Card, Col, Row, Table,} from 'antd';
import PropTypes from 'prop-types'
import {userAccountsUrl} from "../../../../api/url";


class SubTableData extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      path: ''
    }
  }

  componentDidMount() {
    const {actions,params} = this.props
    const userid = params.id
    actions.fetchSubData(userAccountsUrl, 1, userid )
  }

  componentWillUnmount(){
    const {actions} = this.props
    actions.clearData()
  }

  componentWillReceiveProps({users}) {
    users.items &&
    this.setState({
      loading: false,
    })
  }

  render() {
    const columns = [
      {
        title: '帐号标识',
        dataIndex: 'id',
        key: 'id',
      }, {
        title: '用户标识',
        dataIndex: 'userId',
        key: 'userId',
        width: '30%',
      }, {
        title: '账号类型',
        dataIndex: 'accountType',
        key: 'accountType',
        render: text => (
          text === 0
            ? 'mobile'
            : text === 1
            ? 'email'
            : text === 2
              ? '微信'
              : text
        )
      }, {
        title: '登陆账号',
        dataIndex: 'account',
        key: 'account',
      }, {
        title: 'openid',
        dataIndex: 'openid',
        key: 'openid',
      }, {
        title: '语言',
        dataIndex: 'language',
        key: 'language',
        render: text => (
          text === 0
            ? '未知'
            : text === 1
            ? '中文'
            : text === 2
              ? '英语'
              : text
        )
      }, {
        title: '是否绑定主账号',
        dataIndex: 'isbind',
        key: 'isbind',
        render: text => (
          text === 0
            ? '否'
            : text === 1
            ? '是'
            : text
        )
      }, {
        title: 'CRC',
        dataIndex: 'accountCrc',
        key: 'accountCrc',
      }, {
        title: '创建时间',
        dataIndex: 'created',
        key: 'created',
      }, {
        title: '修改时间',
        dataIndex: 'modified',
        key: 'modified',
      }
    ];
    const {users} = this.props
    return (
      <div>
        <div onClick={() => { window.history.back() }} className="backToFirstLevelTable"> &lt;&lt; 返回一级列表</div>
        <Card title="用户列表 -- 二级列表"
              bordered={true}
        >
          <Row gutter={16}>
            <Col className="gutter-row" span={24}>
              <div className="gutter-box" >
                <Table
                  size="small"
                  columns={columns}
                  dataSource={users.items}
                  rowKey={record => record.id}
                  onRowClick={this.onRowClick}
                  pagination={false}
                  loading={this.state.loading}
                  bordered
                />
              </div>
            </Col>
          </Row>
        </Card>
      </div>
    )
  }
}
SubTableData.propTypes = {
  actions: PropTypes.object.isRequired,
}

const mapStateToProps = state => {
  return {
    users: state.users
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SubTableData)

