import React, {Component} from 'react'
import {Badge, Button, Card, Col, Icon, Modal, Pagination, Row, Table} from 'antd';
import PropTypes from 'prop-types'
import {Link} from 'react-router';
import {CRAWLER_DISPATCH} from "../../../../utils/routePath"
import {quartzJobsUrl} from "../../../../api/url";

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
    actions.fetchData(quartzJobsUrl, page, searchId, searchText)
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
        actions.deleteDispatchData(id)
        actions.fetchData(quartzJobsUrl, 1)
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
          <Link to={`${CRAWLER_DISPATCH}/id/${record.id}`}>{text}</Link>
        ),
      }, {
        title: '任务名称',
        dataIndex: 'jobName',
        key: 'jobName',
        render: (text, record) => (
          <Link to={`${CRAWLER_DISPATCH}/id/${record.id}`}>{text}</Link>
        ),
      }, {
        title: '任务组',
        dataIndex: 'jobGroup',
        key: 'jobGroup'
      }, {
        title: '任务状态值',
        dataIndex: 'jobStatusValue',
        key: 'jobStatusValue',
        render: text => (
          text === '新建'
            ? <Badge status="default" text={text}/>
            : text === '暂停'
            ? <Badge status="warning" text={text}/>
            : text === '运行中'
              ? <Badge status="processing" text={text}/>
              : text === '终止'
                ? <Badge status="error" text={text}/>
                : text
        )
      }, {
        title: '触发器组',
        dataIndex: 'triggerGroup',
        key: 'triggerGroup',
      }, {
        title: '触发器名称',
        dataIndex: 'triggerName',
        key: 'triggerName',
      }, {
        title: 'cron表达式',
        dataIndex: 'triggerCronExpression',
        key: 'triggerCronExpression',
      }, {
        title: '自动部署',
        dataIndex: 'auto',
        key: 'auto',
        render: text => (
          text === 0
          ? '否'
          : text === 1
          ? '是'
          : text
        )
      }, {
        title: '是否可用',
        dataIndex: 'enabled',
        key: 'enabled',
        render: text => (
          text === 0
            ? '不可用'
            : text === 1
            ? '可用'
            : text
        )
      }, {
        title: '操作',
        key: 'action',
        render: (text, record) => (
          <span style={{fontSize: 16}}>
            <Link to={`${CRAWLER_DISPATCH}/modify/${record.id}`}>
              <Icon type="edit" title="编辑"/>
            </Link>
            {
              record.jobStatus !== 'TERMINATED' &&
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
            <Card title="调度任务列表"
                  extra={<Link to={`${CRAWLER_DISPATCH}/add`}><Button>添加</Button></Link>}
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
