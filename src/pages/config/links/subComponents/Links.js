import React, {Component} from 'react'
import TableData from './TableData'
import PropTypes from 'prop-types'
import {Modal} from "antd";

const confirm = Modal.confirm;

export default class Links extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      page: null,
      sorter: '',
      filByType: '',
      reset: false
    }
    this.getData = this.getData.bind(this)
    this.onTableChange = this.onTableChange.bind(this)
    this.onPaginationChange = this.onPaginationChange.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }
  getData() {
    const { actions } = this.props
    const { page, sorter, filByType } = this.state
    actions.fetchLinksData(page, sorter, filByType)
  }
  onTableChange = (pagination, filters, sorter) => {
    this.setState({
      sorter: (sorter.order === 'descend' ? '-' : '') + sorter.field,
      filByType: filters.type ? filters.type.join(',') : ''
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
        actions.deleteLinksData(id, that.getData)
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
    const { reset, page, sorter, filByType } = this.state
    const condition = reset !== nextState.reset || page !== nextState.page
      || sorter !== nextState.sorter || filByType !== nextState.filByType
    condition && this.getData()
    condition && this.setState({ loading: true })
  }
  render() {
    const {data, meta} = this.props
    const {loading, sorter, filByType} = this.state
    return (
      <TableData
        loading={loading}
        data={data}
        meta={meta}
        sorter={sorter}
        filByType={filByType}
        onTableChange={this.onTableChange}
        onPaginationChange={this.onPaginationChange}
        handleDelete={this.handleDelete}
      />
    )
  }
}
Links.PropTypes = {
  data: PropTypes.array.isRequired,
  meta: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
}

