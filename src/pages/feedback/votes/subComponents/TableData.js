import React, {Component} from 'react'
import {Button, Card, Col, Icon, Modal, Pagination, Row, Table} from 'antd';
import PropTypes from 'prop-types'
import {Link} from 'react-router';
import {FEEDBACK_VOTES} from "../../../../utils/routePath"
import {articleVotesUrl} from "../../../../api/url";

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
    const {actions, searchId, searchText,} = this.props
    this.setState({
      loading: true,
    })
    actions.fetchData(articleVotesUrl, page, searchId, searchText)
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
        actions.deleteVotesData(id)
        actions.fetchData(articleVotesUrl, 1)
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  componentWillReceiveProps({data}) {
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
          <Link to={`${FEEDBACK_VOTES}/id/${record.id}`}>{text}</Link>
        ),
      }, {
        title: '投票描述',
        dataIndex: 'voteText',
        key: 'voteText',
        render: (text, record) => (
          <Link to={`${FEEDBACK_VOTES}/id/${record.id}`}>{text}</Link>
        ),
      }, {
        title: '投票类型',
        dataIndex: 'voteType',
        key: 'voteType',
      }, {
        title: '投票开始日期',
        dataIndex: 'voteStart',
        key: 'voteStart',
      }, {
        title: '投票期限',
        dataIndex: 'voteLength',
        key: 'voteLength',
        render: text => (
          text === 0 ? '无限制' : text + '天'
        )
      }, {
        title: '是否可用',
        dataIndex: 'enabled',
        key: 'enabled',
        render: text => (
          text === 0 ? '不可用' : text === 1 ? '可用' : text
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
            <Link to={`${FEEDBACK_VOTES}/${record.id}/subTable`}>
              <Icon type="bars" title="投票选项"/>
            </Link>
            <span className="ant-divider"/>
            <Link to={`${FEEDBACK_VOTES}/modify/${record.id}`}>
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
            <Card title="投票管理列表"
                  extra={<Link to={`${FEEDBACK_VOTES}/add`}><Button>添加</Button></Link>}
                  bordered={true}
                  noHovering
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
