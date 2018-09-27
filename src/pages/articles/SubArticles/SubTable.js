import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as Actions from '../../../store/articles/actions'
import {Badge, Button, Card, Icon, Modal, Table} from 'antd';
import PropTypes from 'prop-types'
import {Link} from 'react-router';
import {
  ARTICLE_BRAND, ARTICLE_BROADCAST, ARTICLE_EVALUATE, ARTICLE_NEWS, ARTICLE_PRODUCT, ARTICLE_TUNE, ARTICLE_VIDEO
} from '../../../utils/routePath'

const confirm = Modal.confirm;

class SubTableData extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      path: '',
      title: ''
    }
    this.getData = this.getData.bind(this)
    this.changeEnabled = this.changeEnabled.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleEnabled = this.handleEnabled.bind(this)
  }
  getData() {
    const {actions,params} = this.props
    actions.fetchSubDataByKey(params.id)
  }
  changeEnabled(id, enabled) {
    const {actions} = this.props
    actions.enabledSubData(id, enabled, this.getData)
  }
  handleEnabled(event) {
    const {id} = event.target.dataset
    this.changeEnabled(id, 1)
    this.setState({ loading: true })
  }
  handleDelete(event) {
    const {id} = event.target.dataset
    const that = this
    confirm({
      title: '确定要删除此条数据？',
      okText: '删除',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        that.changeEnabled(id, 0)
        that.setState({ loading: true })
      }
    })
  }
  componentDidMount() {
    this.getData()
  }
  componentWillReceiveProps({subData}) {
    const pathname = this.props.location.pathname
    if(pathname.match(/news/)){
      this.setState({ path: ARTICLE_NEWS, title: '新闻' })
    }else if(pathname.match(/products/)){
      this.setState({ path: ARTICLE_PRODUCT, title: '产品' })
    }else if(pathname.match(/brands/)){
      this.setState({ path: ARTICLE_BRAND, title: '品牌' })
    }else if(pathname.match(/videos/)){
      this.setState({ path: ARTICLE_VIDEO, title: '视频' })
    }else if(pathname.match(/evaluating/)){
      this.setState({ path: ARTICLE_EVALUATE, title: '评测' })
    }else if(pathname.match(/broadcast/)){
      this.setState({ path: ARTICLE_BROADCAST, title: '直播' })
    }else if(pathname.match(/tune/)){
      this.setState({ path: ARTICLE_TUNE, title: '美频' })
    }
  }
  componentWillUpdate(nextProps, nextState){
    this.props.subData !== nextProps.subData && this.setState({ loading: false })
  }
  componentWillUnmount(){
    const {actions} = this.props
    actions.clearSubArticleData()
  }
  render() {
    const {subData, params} = this.props
    const {path, title, loading} = this.state
    const columns = [
      {
        title: 'PostID',
        dataIndex: 'id',
        key: 'id',
        render: (text, record) => (
          <Link to={`${path}/${params.id}/subTable/id/${record.id}`}>{text}</Link>
        ),
      }, {
        title: '产品名',
        dataIndex: 'title',
        key: 'title',
        width: '30%',
        render: (text, record) => (
          <span style={{WebkitBoxOrient: 'vertical'}}>
            <Link to={`${path}/${params.id}/subTable/id/${record.id}`}>{text}</Link>
          </span>
        ),
      }, {
        title: '优先级',
        dataIndex: 'priority',
        key: 'priority',
      }, {
        title: '父标识',
        dataIndex: 'parentId',
        key: 'parentId',
      }, {
        title: '文章类型',
        dataIndex: 'postTypeValue',
        key: 'postTypeValue',
      }, {
        title: '语言',
        dataIndex: 'language',
        key: 'language',
        render: text => (
          text === 0
          ? '未知'
          : text === 1
          ? '中文'
          : text === 2
          ? '英语'
          : text
        )
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
      }, {
        title: '修改时间',
        dataIndex: 'modified',
        key: 'modified',
      }, {
        title: '操作',
        key: 'action',
        render: (text, record) => (
          <span style={{fontSize: 16}}>
            <Link to={`${path}/${params.id}/subTable/subModify/${record.id}`}>
              <Icon type="edit" title="修改文章"/>

            </Link>
            {
              record.parentId !== 0 &&
              <span>
                <span className="ant-divider"/>
                <a>
                  {
                    record.parentId !== 0 &&
                    record.enabled === 1
                    ? <Icon data-id={record.id} onClick={this.handleDelete} type="delete" title="删除"/>
                    : <Icon data-id={record.id} onClick={this.handleEnabled} type="reload" title="启用"/>
                  }
                </a>
              </span>
            }
          </span>
        ),
      }
    ];
    return (
      <div>
        <div onClick={() => { window.history.back() }} className="backToFirstLevelTable"> &lt;&lt; 返回一级列表</div>
        <Card title={`${title} -- 二级列表`} bordered={true}
              extra={<Link to={`${path}/${params.id}/subTable/add`}><Button>添加</Button></Link>}>
          <Table
            size="small"
            columns={columns}
            dataSource={subData}
            rowKey={record => record.id}
            pagination={false}
            loading={loading}
            bordered
          />
        </Card>
      </div>
    )
  }
}
SubTableData.propTypes = {
  actions: PropTypes.object.isRequired,
}

const mapStateToProps = state => {
  return {
    subData: state.articles.subTableData
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SubTableData)
