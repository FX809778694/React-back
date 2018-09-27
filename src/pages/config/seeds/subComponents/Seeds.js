import React, {Component} from 'react'
import Screening from '../../../../component/Screening'
import TableData from './TableData'
import PropTypes from 'prop-types'
import {Modal} from "antd";

const confirm = Modal.confirm;

export default class Seeds extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      page: null,
      searchId: '',
      searchText: '',
      sorter: '',
      reset: false
    }
    this.getData = this.getData.bind(this)
    this.onIdInputChange = this.onIdInputChange.bind(this)
    this.onTitleInputChange = this.onTitleInputChange.bind(this)
    this.onTableChange = this.onTableChange.bind(this)
    this.onSearch = this.onSearch.bind(this)
    this.handleReset = this.handleReset.bind(this)
    this.onPaginationChange = this.onPaginationChange.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }
  getData() {
    const { actions } = this.props
    const { page, searchId, searchText, sorter } = this.state
    actions.fetchSeedsData(page, searchId, searchText, sorter)
  }
  onTitleInputChange = (e) => {
    this.setState({searchText: e.target.value});
  }
  onIdInputChange = (e) => {
    this.setState({searchId: e.target.value});
  }
  onTableChange = (pagination, filters, sorter) => {
    this.setState({
      sorter: (sorter.order === 'descend' ? '-' : '') + sorter.field
    })
  }
  onSearch = () => {
    this.getData()
  }
  handleReset = () => {
    this.setState({
      searchText: '',
      searchId: '',
      sorter: '',
      reset: !this.state.reset
    })
  }
  onPaginationChange(page) {
    this.setState({
      page
    })
  }
  handleDelete(event) {
    const {id} = event.target.dataset
    const {actions} = this.props
    const that = this
    confirm({
      title: '确定要删除此条数据？',
      okText: '删除',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        actions.deleteSeedsData(id, that.getData)
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
    const { reset, page, sorter } = this.state
    const condition = reset !== nextState.reset || page !== nextState.page || sorter !== nextState.sorter
    condition && this.getData()
    condition && this.setState({ loading: true })
  }
  render() {
    const {data, meta} = this.props
    const {loading, searchId, searchText, sorter} = this.state
    return (
      <div className="mar-top-20">
        <Screening
          title='种子来源名称：'
          titlePlaceholder="种子来源名称 -- 完全匹配"
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
          onTableChange={this.onTableChange}
          onPaginationChange={this.onPaginationChange}
          handleDelete={this.handleDelete}
        />
      </div>
    )
  }
}
Seeds.PropTypes = {
  data: PropTypes.array.isRequired,
  meta: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
}

