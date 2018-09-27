import React, {Component} from 'react'
import Screening from '../../../../component/Screening'
import TableData from './TableData'
import PropTypes from 'prop-types'
import {Modal} from 'antd';

const confirm = Modal.confirm;

export default class Evaluating extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      searchId: '',
      searchText: '',
      page: 1,
      reset: false
    }
    this.getData = this.getData.bind(this)
    this.onTitleInputChange = this.onTitleInputChange.bind(this)
    this.onIdInputChange = this.onIdInputChange.bind(this)
    this.onSearch = this.onSearch.bind(this)
    this.handleReset = this.handleReset.bind(this)
    this.onPaginationChange = this.onPaginationChange.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }
  getData() {
    const { searchId, searchText, page } = this.state
    const { actions } = this.props
    actions.fetchArticlesData(4, page, searchId, searchText)
  }
  onTitleInputChange = (e) => {
    this.setState({ searchText: e.target.value });
  }
  onIdInputChange = (e) => {
    this.setState({ searchId: e.target.value });
  }
  onSearch = () => {
    this.setState({ loading: true })
    this.getData()
  }
  handleReset = () => {
    this.setState({
      loading: true,
      searchText: '',
      searchId: '',
      reset: !this.state.reset
    })
  }
  onPaginationChange(page) {
    this.setState({
      loading: true,
      page
    })
  }
  handleDelete(event) {
    const { id } = event.target.dataset
    const { actions } = this.props
    const that = this
    confirm({
      title: '确定要删除此条数据？',
      content: '删除后无法恢复',
      okText: '删除',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        actions.deleteArticlesData(id, that.getData)
        that.setState({ loading: true })
      }
    });
  }
  componentDidMount() {
    this.getData()
  }
  componentWillUpdate(nextProps, nextState){
    this.props.data !== nextProps.data && this.setState({ loading: false })
  }
  componentDidUpdate(nextProps, nextState){
    const { reset, page } = this.state
    reset !== nextState.reset && this.getData()
    page !== nextState.page && this.getData()
  }
  render() {
    const { data, meta } = this.props
    const { loading, searchId, searchText } = this.state
    return (
      <div style={{marginTop: '20px'}}>
        <Screening
          title='评测标题：'
          searchId={searchId}
          searchText={searchText}
          onIdInputChange={this.onIdInputChange}
          onTitleInputChange={this.onTitleInputChange}
          onSearch={this.onSearch}
          handleReset={this.handleReset}
        />
        <TableData
          loading={loading}
          searchText={searchText}
          data={data}
          meta={meta}
          onPaginationChange={this.onPaginationChange}
          handleDelete={this.handleDelete}
        />
      </div>
    )
  }
}
Evaluating.PropTypes = {
  data: PropTypes.array.isRequired,
  meta: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
}

