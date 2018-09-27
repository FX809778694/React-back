import React, {Component} from 'react'
import {Button, Card, Col, Icon, Modal, Pagination, Row, Table, Transfer} from 'antd';
import PropTypes from 'prop-types'
import {Link} from 'react-router';
import {USER_GROUPS} from "../../../../utils/routePath"
import {userGroupsUrl} from "../../../../api/url";

class TransferModal extends Component {
  render() {
    const {visible, onCancel, onCreate} = this.props;
    const {siteId, groupId, targetKeys, selectedKeys, handleChange, handleSelectChange, dataSource} = this.props
    return (
      <Modal visible={visible} title='群组角色管理' okText="提交" onCancel={onCancel} onOk={onCreate}>
        <label style={{display: 'block', marginBottom: '10px'}}>
          群组ID： {groupId}
        </label>
        <label style={{display: 'block', marginBottom: '10px'}}>
          站点ID： {siteId}
        </label>

        <Transfer
          dataSource={dataSource}
          titles={['所有角色', '群组角色']}
          targetKeys={targetKeys}
          selectedKeys={selectedKeys}
          onChange={handleChange}
          onSelectChange={handleSelectChange}
          notFoundContent='无数据'
          rowKey={record => record.id}
          render={item => item.name}
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
      groupId: '',
      siteId: '',
      targetKeys: [],
      selectedKeys: [],
      dataSource: []
    }
    this.onPaginationChange = this.onPaginationChange.bind(this)
  }

  /*弹出框 start*/
  User_RolesManage = (event) => {
    const {actions} = this.props
    const {id} = event.target.dataset
    this.setState({
      visible: true,
      groupId: id,
      siteId: event.target.getAttribute('id'),
    });
    actions.getSites_Roles(event.target.getAttribute('id'))//获取站点下所有角色信息，保存在roles中
    actions.getRolesForGroup(id)//获取站点下某个群组所拥有的角色，保存在roleForGroup中
  }
  handleCancel = () => {
    const {actions} = this.props
    this.setState({
      visible: false,
      selectedKeys: []
    });
    // actions.clearData()//模态框取消或关闭时，清空选择状态和存储的数据
    actions.clearRolesData()
    actions.clearRoleForGroupData()
  }
  handleCreate = () => {
    const {actions} = this.props
    const {groupId, targetKeys} = this.state
    const values = {
      data: {
        roleIds: targetKeys
      }
    }
    actions.addRolesForGroup(groupId, values)//保存用户到多个角色
  }
  /*弹出框 end*/

  /*穿梭框 start*/
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
    const {actions, sitesSelected, name, selected} = this.props
    this.setState({
      loading: true,
    })
    actions.fetchData(userGroupsUrl, page, sitesSelected, name, selected)
  }

  componentWillReceiveProps({roles, roleForGroup}) {
    this.setState({
      loading: false,
      dataSource: roles.items,
      targetKeys: roleForGroup.items.map(item => item.id)
    })
  }

  render() {
    const columns = [
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id'
      }, {
        title: '站点id',
        dataIndex: 'siteId',
        key: 'siteId'
      }, {
        title: '群组名称',
        dataIndex: 'groupName',
        key: 'groupName'
      }, {
        title: '父群组id',
        dataIndex: 'parentId',
        key: 'parentId'
      }, {
        title: '是否可用',
        dataIndex: 'enabled',
        key: 'enabled',
        render: (text, record) => (
          text === 0 ? '已删除' : text === 1 ? '已启用' : text
        )
      }, {
        title: '群组描述',
        dataIndex: 'description',
        key: 'description',
      }, {
        title: '操作',
        key: 'action',
        render: (text, record) => (
          <span>
            <Link to={`${USER_GROUPS}/modify/${record.id}`}>
              <Icon type="edit" title="编辑"/>
            </Link>
            <span className="ant-divider"/>
            <a data-id={record.id} id={record.siteId} onClick={this.User_RolesManage}>角色</a>
          </span>
        ),
      }
    ];
    const {data, meta} = this.props
    return (
      <Row gutter={16}>
        <Col className="gutter-row" span={24}>
          <div className="gutter-box">
            <Card title="群组列表"
                  extra={<Link to={`${USER_GROUPS}/add`}><Button>添加</Button></Link>}
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

                groupId={this.state.groupId}
                siteId={this.state.siteId}
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
  sitesSelected: PropTypes.string,
  name: PropTypes.string,
  selected: PropTypes.string,
  data: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
}
