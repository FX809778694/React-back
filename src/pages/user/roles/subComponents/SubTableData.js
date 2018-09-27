import React, {Component} from 'react'
import {Card, Col, Row, Table} from 'antd';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as Actions from '../../../../store/userCenter/roles/actions/index'
import {userAuthRolesUrl} from "../../../../api/url";


class SubTableData extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
    }
  }

  componentWillReceiveProps() {
    this.setState({
      loading: false,
    })
  }
  componentDidMount() {
    const {actions, params} = this.props
    actions.fetchRoleAuthData(`${userAuthRolesUrl}/${params.id}`)
  }

  componentWillUnmount() {
    const {actions} = this.props
    actions.clearRoleAuthData()
  }

  render() {
    const columns = [
      {
        title: '权限ID',
        dataIndex: 'id',
        key: 'id'
      }, {
        title: '站点ID',
        dataIndex: 'siteId',
        key: 'siteId'
      }, {
        title: '权限名',
        dataIndex: 'name',
        key: 'name'
      }, {
        title: '权限细则',
        dataIndex: 'permission',
        key: 'permission'
      },
    ];
    const {authForRole} = this.props
    return (
      <Row gutter={16}>
        <Col className="gutter-row" span={24}>
          <div className="gutter-box">
            <Card title="角色权限列表"
                  bordered={true}
            >
              <Table
                size="small"
                columns={columns}
                dataSource={authForRole.items}
                rowKey={record => record.id}
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

const mapStateToProps = state => {
  return {
    authForRole: state.authForRole
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SubTableData)
