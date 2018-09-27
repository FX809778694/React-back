import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as Actions from '../../../../store/votes/actions/votesOptions'
import {Badge, Button, Card, Col, Icon, Modal, Pagination, Row, Table} from 'antd';
import PropTypes from 'prop-types'
import {Link} from 'react-router';
import {articleVotesOptUrl} from "../../../../api/url";

const confirm = Modal.confirm;

class SubVoteOption extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      page: ''
    }
    this.handleDelete = this.handleDelete.bind(this)
    this.onPaginationChange = this.onPaginationChange.bind(this)
  }

  getData(){
    const {actions,params} = this.props
    const {page} = this.state
    actions.fetchData(articleVotesOptUrl, page, params.id)
  }

  onPaginationChange(page) {
    this.setState({
      loading: true,
      page: page
    })
    setTimeout(()=>{this.getData()}, 500)
  }

  handleDelete(event) {
    const {id} = event.target.dataset
    const {actions,params} = this.props
    const {page} = this.state
    confirm({
      title: '确定要删除此条数据？',
      okText: '删除',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        actions.deleteVotesOptionsData(id)
        setTimeout(()=>{ actions.fetchData(articleVotesOptUrl, page, params.id) },500)
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  componentDidMount() {
    this.getData()
  }

  componentWillReceiveProps({votesOptions}) {
    this.setState({
      loading: false,
    })
  }

  componentWillUnmount(){
    const {actions} = this.props
    actions.clearData()
  }

  render() {
    const {params} = this.props
    const columns = [
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        width: '80px',
        render: (text, record) => (
          <Link to={`/app/configCenter/votes/${params.id}/subTable/id/${record.id}`}>{text}</Link>
        ),
      }, {
        title: '关联投票ID',
        dataIndex: 'voteId',
        key: 'voteId',
        width: '100px',
        render: (text, record) => (
          <Link to={`/app/configCenter/votes/${params.id}/subTable/id/${record.id}`}>{text}</Link>
        ),
      }, {
        title: '选项描述',
        dataIndex: 'voteOptionText',
        key: 'voteOptionText',
        width: '30%',
        render: (text, record) => (
          <span style={{WebkitBoxOrient: 'vertical'}}>
            <Link to={`/app/configCenter/votes/${params.id}/subTable/id/${record.id}`}>{text}</Link>
          </span>
        ),
      }, {
        title: '选项票数',
        dataIndex: 'voteOptionCount',
        key: 'voteOptionCount',
      }, {
        title: '选项排序',
        dataIndex: 'displayOrder',
        key: 'displayOrder',
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
        title: '操作',
        key: 'action',
        render: (text, record) => (
          <span style={{fontSize: 16}}>
            <Link to={`/app/configCenter/votes/${params.id}/subTable/subModify/${record.id}`}>
              <Icon type="edit" title="修改文章"/>
            </Link>
            <span className="ant-divider"/>
            <a><Icon data-id={record.id} onClick={this.handleDelete} type="delete" title="删除"/></a>
          </span>

        ),
      }
    ];
    const {votesOptions} = this.props
    return (
      <div>
        <div onClick={() => { window.history.back() }} className="backToFirstLevelTable"> &lt;&lt; 返回一级列表</div>
        <Card title={`投票选项`}
              extra={<Link to={`/app/configCenter/votes/${params.id}/subTable/add`}><Button>添加</Button></Link>}
              bordered={true}
        >
          <Row gutter={16}>
            <Col className="gutter-row" span={24}>
              <div className="gutter-box" >
                <Table
                  size="small"
                  columns={columns}
                  dataSource={votesOptions.items}
                  rowKey={record => record.id}
                  pagination={false}
                  loading={this.state.loading}
                  bordered
                />
                <Pagination
                  showQuickJumper
                  defaultCurrent={1}
                  current={votesOptions.meta.number}
                  total={votesOptions.meta.totalElements}
                  onChange={this.onPaginationChange}
                  style={{float: 'right', marginTop: '20px'}}
                />
              </div>
            </Col>
          </Row>
        </Card>
      </div>
    )
  }
}
SubVoteOption.propTypes = {
  actions: PropTypes.object.isRequired,
}

const mapStateToProps = state => {
  return {
    votesOptions: state.votesOptions
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SubVoteOption)
