import React, {Component} from 'react'
import {Row, Col, Card, Table, Pagination, Modal, Icon, Button} from 'antd';
import PropTypes from 'prop-types'
import {Link} from 'react-router';
import {REWARD_DBPRODUCT} from "../../../../utils/routePath"
import {rewardCateUrl} from "../../../../api/url";

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
    actions.fetchData(rewardCateUrl, page, selected)
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
        actions.deleteDbCategoriesData(id)
        actions.fetchData(rewardCateUrl, 1)
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
          <Link to={`${REWARD_DBPRODUCT}/id/${record.id}`}>{text}</Link>
        ),
      }, {
        title: '类别名称',
        dataIndex: 'name',
        key: 'name',
        width: '20%',
        render: (text, record) => (
          <span style={{WebkitBoxOrient: 'vertical'}}>
            <Link to={`${REWARD_DBPRODUCT}/id/${record.id}`}>{text}</Link>
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
        title: '排序',
        dataIndex: 'order',
        key: 'order',
      }, {
        title: '显示css的class',
        dataIndex: 'cssClass',
        key: 'cssClass',
        width: '15%',
        render: (text) => (
          <span style={{WebkitBoxOrient: 'vertical'}}>{text}</span>
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
            <Link to={`${REWARD_DBPRODUCT}/modify/${record.id}`}>
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
            <Card title="夺宝类别列表"
                  extra={<Link to={`${REWARD_DBPRODUCT}/add`}><Button>添加</Button></Link>}
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
