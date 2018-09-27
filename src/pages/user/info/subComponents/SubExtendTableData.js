/**
 * Created by Administrator on 2017/12/13/013.
 */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Badge, Button, Card, Col, Icon, Modal, Row, Table} from 'antd';
import PropTypes from 'prop-types'
import * as Actions from '../../../../store/extendInfomation/actions/SubIndex'
import {Link} from 'react-router'
import {USER_INFORMATION} from "../../../../utils/routePath"
import {addressUrl} from "../../../../api/url";

const confirm = Modal.confirm;

class SubExtendTableData extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
    }
    this.handleDelete = this.handleDelete.bind(this)
  }

  componentDidMount() {
    const {actions, params} = this.props
    const id = params.id
    actions.fetchData(addressUrl, 1, id)
  }

  componentWillUnmount(){
    const {actions} = this.props
    actions.clearData()
  }

  componentWillReceiveProps({extendInfomationData}) {
    extendInfomationData.items &&
    this.setState({
      loading: false,
    })
  }

  handleDelete(event) {
    const {id} = event.target.dataset
    const {actions} = this.props
    confirm({
      title: '确定要删除此条数据？',
      content: '删除后无法恢复',
      okText: '删除',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        console.log(id);
        actions.deleteSubExtendData(id)
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  render() {
    const {params} = this.props
    const columns = [
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        render: (text, record) => (
          <Link to={`${USER_INFORMATION}/${params.id}/subTable/id/${record.id}`}>{text}</Link>
        ),
      }, {
        title: '用户标识',
        dataIndex: 'userId',
        key: 'userId',
        render: (text, record) => (
          <Link to={`${USER_INFORMATION}/${params.id}/subTable/id/${record.id}`}>{text}</Link>
        ),
      }, {
        title: '省',
        dataIndex: 'province',
        key: 'province',
      }, {
        title: '市',
        dataIndex: 'city',
        key: 'city',
      }, {
        title: '区',
        dataIndex: 'district',
        key: 'district',
      }, {
        title: '手机',
        dataIndex: 'mobile',
        key: 'mobile',
      }, {
        title: '收件人',
        dataIndex: 'consignee',
        key: 'consignee',
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
        )
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
            <Link to={`${USER_INFORMATION}/${params.id}/subTable/subModify/${record.id}`}>
              <Icon type="edit" title="修改地址"/>
            </Link>
            {
              record.enabled !== 0 &&
              <a>
                <span className="ant-divider"/>
                <Icon data-id={record.id} onClick={this.handleDelete} type="delete" title="删除"/>
              </a>
            }
          </span>
        ),
      }
    ];
    const {extendInfomationData} = this.props
    return (
      <div>
        <div onClick={() => { window.history.back() }} className="backToFirstLevelTable"> &lt;&lt; 返回一级列表</div>
        <Card title={`扩展信息列表 -- 二级列表`}
              extra={<Link to={`${USER_INFORMATION}/${params.id}/subTable/add`}><Button>添加</Button></Link>}
              bordered={true}
        >
          <Row gutter={16}>
            <Col className="gutter-row" span={24}>
              <div className="gutter-box" >
                <Table
                  size="small"
                  columns={columns}
                  dataSource={extendInfomationData.items}
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

SubExtendTableData.propTypes = {
  actions: PropTypes.object.isRequired,
}

const mapStateToProps = state => {
  return {
    extendInfomationData: state.extendInfomationData
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SubExtendTableData)
