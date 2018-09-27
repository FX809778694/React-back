import React, {Component} from 'react'
import {Badge, Button, Card, Col, Icon, Modal, Pagination, Row, Table} from 'antd';
import PropTypes from 'prop-types'
import {Link} from 'react-router';
import {FEEDBACK_MESSAGE} from "../../../../utils/routePath"
import {articleMesUrl} from "../../../../api/url";

const confirm = Modal.confirm;

export default class TableData extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      page: null,
      sorter: '',
    }
    this.onPaginationChange = this.onPaginationChange.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.onTableChange = this.onTableChange.bind(this)
    this.getData = this.getData.bind(this)
  }

  getData() {
    const {actions} = this.props
    const { searchId } = this.props
    const { page, sorter } = this.state
    actions.fetchData(`${articleMesUrl}`, page, searchId, sorter)
  }

  onTableChange = (pagination, filters, sorter) => {
    this.setState({
      sorter: (sorter.order === 'descend' ? '-' : '') + sorter.field,
    })
    setTimeout(()=>{this.getData()}, 500)
  }

  onPaginationChange(page) {
    this.setState({
      loading: true,
      page
    })
    setTimeout(()=>{this.getData()}, 500)
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
        actions.deleteMessageData(id)
        actions.fetchData(`${articleMesUrl}`, 1)
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
          <Link to={`${FEEDBACK_MESSAGE}/id/${record.id}`}>{text}</Link>
        ),
      },{
        title: '留言内容',
        dataIndex: 'message',
        key: 'message',
        width: '30%',
        render: (text, record) => (
          <Link to={`${FEEDBACK_MESSAGE}/id/${record.id}`}>{text}</Link>
        ),
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
        sorter: true,
      }, {
        title: '修改时间',
        dataIndex: 'modified',
        key: 'modified',
      }, {
        title: '操作',
        key: 'action',
        render: (text, record) => (
          <span style={{fontSize: 16}}>
            <Link to={`${FEEDBACK_MESSAGE}/modify/${record.id}`}>
              <Icon type="edit" title="编辑留言"/>
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
    const {data, meta} = this.props
    return (
      <Row gutter={16}>
        <Col className="gutter-row" span={24}>
          <div className="gutter-box">
            <Card title="留言列表"
                  extra={<Link to={`${FEEDBACK_MESSAGE}/add`}><Button>添加</Button></Link>}
                  bordered={true}
            >
              <Table
                columns={columns}
                dataSource={data}
                rowKey={record => record.id}
                pagination={false}
                loading={this.state.loading}
                onChange={this.onTableChange}
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
  data: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
}
