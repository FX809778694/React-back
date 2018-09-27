import React, {Component} from 'react'
import {Button, Card, Col, Icon, Modal, Pagination, Row, Table} from 'antd';
import PropTypes from 'prop-types'
import {Link} from 'react-router';
import {REWARD_NOTICES} from "../../../../utils/routePath"
import {rewardNoticesUrl} from "../../../../api/url";

const confirm = Modal.confirm;

export default class TableData extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
    }
    this.onPaginationChange = this.onPaginationChange.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }

  onPaginationChange(page) {
    const {actions, selected} = this.props
    this.setState({
      loading: true,
    })
    actions.fetchData(rewardNoticesUrl, page, selected)
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
        actions.deleteNoticesData(id)
        actions.fetchData(rewardNoticesUrl, 1)
      },
      onCancel() {
        console.log('Cancel');
      },
    });
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
          <Link to={`${REWARD_NOTICES}/id/${record.id}`}>{text}</Link>
        ),
      }, {
        title: '公告标题',
        dataIndex: 'title',
        key: 'title',
        width: '30%',
        render: (text, record) => (
          <span style={{WebkitBoxOrient: 'vertical'}}>
            <Link to={`${REWARD_NOTICES}/id/${record.id}`}>{text}</Link>
          </span>
        ),
      }, {
        title: '是否可用',
        dataIndex: 'enabled',
        key: 'enabled',
        render: (text, record) => (
          text === 0 ? '已删除' : text === 1 ? '已启用' : text
        )
      }, {
        title: '状态',
        dataIndex: 'state',
        key: 'state',
        render: (text, record) => (
          text === 2 ? '首页显示' : text === 3 ? '历史通知' : text
        )
      }, {
        title: '创建人',
        dataIndex: 'creator',
        key: 'creator',
      }, {
        title: '修改人',
        dataIndex: 'modifier',
        key: 'modifier',
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
            <Link to={`${REWARD_NOTICES}/modify/${record.id}`}>
              <Icon type="edit" title="编辑"/>
            </Link>
            {
              record.enabled === 1 &&
              <span>
                <span className="ant-divider"/>
                <a><Icon data-id={record.id} onClick={this.handleDelete} type="delete" title="删除"/></a>
              </span>
            }
          </span>
        ),
      }
    ];
    const {data, meta} = this.props
    return (
      <Row gutter={16}>
        <Col className="gutter-row" span={24}>
          <div className="gutter-box">
            <Card title="系统公告列表"
                  extra={<Link to={`${REWARD_NOTICES}/add`}><Button>添加</Button></Link>}
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
