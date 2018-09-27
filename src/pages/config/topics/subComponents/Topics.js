import React, {Component} from 'react'
import Screening from '../../../../component/Screening'
import TableData from './TableData'
import PropTypes from 'prop-types'
import {Modal} from 'antd';

const confirm = Modal.confirm;

export default class Topics extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      page: null,
      searchId: '',
      searchText: '',
      reset: false,
      sorter: '',
      filByForumId: '',
      filByEnabled: '',
      resetLoading: false,
      selectedRowKeys: [],
    }
    this.getData = this.getData.bind(this)
    this.onTitleInputChange = this.onTitleInputChange.bind(this)
    this.onIdInputChange = this.onIdInputChange.bind(this)
    this.onTableChange = this.onTableChange.bind(this)

    this.cancelAllSelected = this.cancelAllSelected.bind(this)
    this.onSelectChange = this.onSelectChange.bind(this)
    this.handleAddIndex = this.handleAddIndex.bind(this)
    this.handleBatchAddIndex = this.handleBatchAddIndex.bind(this)

    this.onPaginationChange = this.onPaginationChange.bind(this)
    this.handleDeleteIndex = this.handleDeleteIndex.bind(this)
    this.handleReset = this.handleReset.bind(this)
  }
  getData() {
    const { actions } = this.props
    const { page, searchId, searchText, sorter, filByForumId, filByEnabled } = this.state
    actions.fetchTopicsData(page, searchId, searchText, sorter, filByForumId, filByEnabled)
  }
  onTitleInputChange = (e) => {
    this.setState({searchText: e.target.value});
  }
  onIdInputChange = (e) => {
    this.setState({searchId: e.target.value});
  }
  onSearch = () => {
    this.getData()
  }
  handleReset = () => {
    this.setState({
      searchText: '',
      searchId: '',
      sorter: '',
      filByForumId: '',
      filByEnabled: '',
      reset: !this.state.reset
    })
  }
  onPaginationChange(page) {
    this.setState({
      page
    })
  }
  handleDeleteIndex(e) {
    const {id} = e.target.dataset
    const {actions} = this.props
    const that = this
    confirm({
      title: '确定要删除此主题的索引？',
      okText: '删除',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        actions.deleteTopicIndex(id, that.getData)
        that.setState({ loading: true })
      }
    })
  }
  onTableChange = (pagination, filters, sorter) => {
    this.setState({
      sorter: (sorter.order === 'descend' ? '-' : '') + sorter.field,
      filByForumId: filters.forumId ? filters.forumId.join(',') : '',
      filByEnabled: filters.enabled ? filters.enabled.join(',') : ''
    })
  }
  cancelAllSelected = () => {
    this.setState({ resetLoading: true });
    setTimeout(() => {
      this.setState({
        selectedRowKeys: [],
        resetLoading: false,
      });
    }, 500);
  }
  onSelectChange = (selectedRowKeys) => {
    this.setState({ selectedRowKeys });
  }
  handleAddIndex(event) {
    const {id} = event.target.dataset
    const {actions} = this.props
    actions.addTopicIndex(id)
  }
  handleBatchAddIndex() {
    const { selectedRowKeys }=this.state
    const { actions } = this.props
    actions.addTopicIndex(selectedRowKeys)
  }
  componentDidMount() {
    this.getData()
  }
  componentWillUpdate(nextProps, nextState){
    this.props.data !== nextProps.data && this.setState({ loading: false })
  }
  componentDidUpdate(nextProps, nextState){
    const { reset, page, sorter, filByForumId, filByEnabled } = this.state
    const condition = reset !== nextState.reset
      || page !== nextState.page || sorter !== nextState.sorter
      || filByForumId !== nextState.filByForumId || filByEnabled !== nextState.filByEnabled
    condition && this.getData()
    condition && this.setState({ loading: true })
  }
  render() {
    const {data, meta} = this.props
    const {loading, searchId, searchText, sorter, filByForumId, filByEnabled, resetLoading, selectedRowKeys} = this.state
    return (
      <div className='mar-top-20'>
        <Screening
          title='主题标题：'
          searchId={searchId}
          searchText={searchText}
          onIdInputChange={this.onIdInputChange}
          onTitleInputChange={this.onTitleInputChange}
          onSearch={this.onSearch}
          handleReset={this.handleReset}
        />
        <TableData
          loading={loading}
          data={data}
          meta={meta}
          sorter={sorter}
          filByForumId={filByForumId}
          filByEnabled={filByEnabled}
          onTableChange={this.onTableChange}
          onPaginationChange={this.onPaginationChange}
          resetLoading={resetLoading}
          selectedRowKeys={selectedRowKeys}
          cancelAllSelected={this.cancelAllSelected}
          onSelectChange={this.onSelectChange}
          handleAddIndex={this.handleAddIndex}
          handleBatchAddIndex={this.handleBatchAddIndex}
          handleDeleteIndex={this.handleDeleteIndex}
        />
      </div>
    )
  }
}
Topics.PropTypes = {
  data: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
}

