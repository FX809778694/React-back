import React, {Component} from 'react'
import {Button, Card, Col, Modal, Pagination, Row, Select, Table, Transfer} from 'antd';
import PropTypes from 'prop-types'
import {Link} from 'react-router';
import {USER_ACCOUNT} from '../../../../utils/routePath'
import {apiUserUrl} from "../../../../api/url";

const Option = Select.Option;

class TransferModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modalTitle: '',
      transferTitle: []
    }
  }

  componentWillReceiveProps({type}) {
    this.setState({
      modalTitle: type === 'roles' ? '用户角色管理' : '用户群组管理',
      transferTitle: type === 'roles' ? ['所有角色', '用户角色'] : ['所有群组', '用户群组']
    })
  }

  render() {
    const {visible, onCancel, onCreate} = this.props;
    const {userId, sitesValue, targetKeys, selectedKeys, handleChange, handleSelectChange, sites, sitesSelected, type, dataSource} = this.props
    return (
      <Modal visible={visible} title={this.state.modalTitle} okText="提交" onCancel={onCancel} onOk={onCreate}>
        <label style={{display: 'block', marginBottom: '10px'}}>
          用户ID： {userId}
        </label>
        {
          sites.items &&
          <label>
            站 点：
            <Select value={sitesValue} style={{width: 120}} onChange={sitesSelected}>
              {
                sites.items.map(item =>
                  <Option key={item.id} value={String(item.id)}>{item.name}</Option>
                )
              }
            </Select>
          </label>
        }
        <Transfer
          dataSource={dataSource}
          titles={this.state.transferTitle}
          targetKeys={targetKeys}
          selectedKeys={selectedKeys}
          onChange={handleChange}
          onSelectChange={handleSelectChange}
          notFoundContent='无数据'
          rowKey={record => record.id}
          render={item => type === 'roles' ? item.name : item.groupName}
          listStyle={{
            width: '45%',
            height: 300,
            marginTop: '20px'
          }}
        />
      </Modal>
    )
  }
}

export default class TableData extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      visible: false,
      userId: '',
      type: '',
      sitesSelected: '',
      targetKeys: [],
      selectedKeys: [],
      dataSource: []
    }
    this.onPaginationChange = this.onPaginationChange.bind(this)
    this.User_RolesManage = this.User_RolesManage.bind(this)
  }

  /*弹出框 start*/
  User_RolesManage = (event) => {
    const {actions} = this.props
    const {id} = event.target.dataset
    this.setState({
      visible: true,
      userId: id,
      type: event.target.getAttribute('id')
    });
    actions.getSites()//获取站点数据，保存在sites中
  }
  handleCancel = () => {
    const {actions} = this.props
    this.setState({
      visible: false,
      sitesSelected: '',
      selectedKeys: []
    });
    if (this.state.type === 'roles') {
      actions.clearRolesData()
      actions.clearRoleForUserData()
    } else if (this.state.type === 'groups') {
      actions.clearGroupsData()
      actions.clearGroupForUserData()
    }
  }
  handleCreate = () => {
    const {actions} = this.props
    const {type, userId, sitesSelected, targetKeys} = this.state
    if (type === 'roles') {
      const values = {
        data: {
          roleIds: targetKeys
        }
      }
      actions.addRolesForUser(sitesSelected, userId, values)//保存用户到多个角色
    } else if (type === 'groups') {
      const values = {
        data: {
          groupIds: targetKeys
        }
      }
      actions.addGroupsForUser(sitesSelected, userId, values)//保存用户到多个角色
    }
  }
  /*弹出框 end*/

  /*穿梭框 start*/
  sitesSelected = (value) => {//站点下拉框选择改变时
    const {actions} = this.props
    this.setState({
      sitesSelected: value,
      selectedKeys: []
    })
    if (this.state.type === 'roles') {
      actions.getSites_Roles(value)//获取站点下所有角色信息，保存在roles中
      actions.getRolesForUser(value, this.state.userId)//获取站点下某个用户所拥有的角色，保存在roleForUser中
    } else if (this.state.type === 'groups') {
      actions.getSites_Groups(value)//获取站点下所有角色信息，保存在groups中
      actions.getGroupsForUser(value, this.state.userId)//获取站点下某个用户所拥有的角色，保存在groupForUser中
    }
  }

  handleSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
    //穿梭框选中项改变时设置selectedKeys的值
    this.setState({selectedKeys: [...sourceSelectedKeys, ...targetSelectedKeys]});
  }

  handleChange = (nextTargetKeys) => {
    //穿梭框两栏之间数据转移时设置右边的数据
    this.setState({targetKeys: nextTargetKeys});
  }

  /*穿梭框 end*/

  onPaginationChange(page) {
    const {actions, searchUserName, selected} = this.props
    this.setState({
      loading: true,
    })
    actions.fetchData(apiUserUrl, page, searchUserName, selected)
  }

  componentWillReceiveProps({roles, roleForUser, groups, groupForUser}) {
    const {type} = this.state
    this.setState({
      loading: false,
      dataSource: type === 'roles' ? roles.items : groups.items,
      targetKeys: type === 'roles' ? roleForUser.items.map(item => item.id) : groupForUser.items.map(item => item.id)
    })
  }


  render() {
    const columns = [
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
      }, {
        title: '用户名',
        dataIndex: 'username',
        key: 'username',
      }, {
        title: '是否可用',
        dataIndex: 'enabled',
        key: 'enabled',
        render: (text, record) => (
          text === 0 ? '已删除' : text === 1 ? '已启用' : text
        )
      }, {
        title: '来源',
        dataIndex: 'regFrom',
        key: 'regFrom',
      }, {
        title: '登录次数',
        dataIndex: 'loginTimes',
        key: 'loginTimes',
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
            <Link to={`${USER_ACCOUNT}/modifyPassword/${record.id}`}>
              密码
            </Link>
            <span className="ant-divider"/>
            <Link to={`${USER_ACCOUNT}/modifyState/${record.id}`}>
              状态
            </Link>
            <span className="ant-divider"/>
            <a data-id={record.id} id="roles" onClick={this.User_RolesManage}>角色</a>
            <span className="ant-divider"/>
            <a data-id={record.id} id="groups" onClick={this.User_RolesManage}>群组</a>
            <span className="ant-divider"/>
            <Link to={`${USER_ACCOUNT}/${record.id}/subTable`}>
              账户
            </Link>
          </span>
        ),
      }
    ];
    const {data, meta, sites} = this.props
    return (
      <Row gutter={16}>
        <Col className="gutter-row" span={24}>
          <div className="gutter-box">
            <Card title="用户列表"
                  extra={<Link to={`${USER_ACCOUNT}/add`}><Button>添加</Button></Link>}
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

              <TransferModal
                visible={this.state.visible}//模态框是否可见
                onCancel={this.handleCancel}//模态框点击取消或者点击右上角x号时触发
                onCreate={this.handleCreate}//模态框点击提交时触发

                targetKeys={this.state.targetKeys}//穿梭框右边的数据
                selectedKeys={this.state.selectedKeys}//穿梭框中选中项

                handleChange={this.handleChange}//选项在两栏之间转移时的回调函数
                handleSelectChange={this.handleSelectChange}//选中项发生改变时设置this.state.selectedKeys中的值


                sitesValue={this.state.sitesSelected}//站点下拉选择框中的值
                sitesSelected={this.sitesSelected}//下拉选矿选中时触发去获取所有站点的方法
                sites={sites}//所有站点的数据

                userId={this.state.userId}
                type={this.state.type}//判断是角色管理还是群组管理
                dataSource={this.state.dataSource}//该站点下所有的角色数据，穿梭框左和右数据的总和
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
  searchUserName: PropTypes.string,
  selected: PropTypes.string,
  data: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
}
