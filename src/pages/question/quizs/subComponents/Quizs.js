import React, {Component} from 'react'
import Screening from '../../../../component/Screening'
import TableData from './TableData'
import PropTypes from 'prop-types'
import {Modal} from "antd";

const confirm = Modal.confirm;

export default class Quizs extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      page: null,
      searchId: '',
      searchText: '',
      sorter: '',
      filByState: '',
      filByEnabled: '',
      reset: false,
      previewVisible: false,
      previewImage: ''
    }
    this.getData = this.getData.bind(this)
    this.onTitleInputChange = this.onTitleInputChange.bind(this)
    this.onIdInputChange = this.onIdInputChange.bind(this)
    this.onTableChange = this.onTableChange.bind(this)
    this.onSearch = this.onSearch.bind(this)
    this.handleReset = this.handleReset.bind(this)
    this.onPaginationChange = this.onPaginationChange.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.showBackImg = this.showBackImg.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
  }
  getData() {
    const { actions } = this.props
    const { page, searchId, searchText, sorter, filByState, filByEnabled } = this.state
    actions.fetchQuizsData(page, searchId, searchText, sorter, filByState, filByEnabled)
  }
  onTitleInputChange = (e) => {
    this.setState({searchText: e.target.value});
  }
  onIdInputChange = (e) => {
    this.setState({searchId: e.target.value});
  }
  onTableChange = (pagination, filters, sorter) => {
    this.setState({
      sorter: (sorter.order === 'descend' ? '-' : '') + sorter.field,
      filByState: filters.state ? filters.state.join(',') : '',
      filByEnabled: filters.enabled ? filters.enabled.join(',') : ''
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
      filByState: '',
      filByEnabled: '',
      reset: !this.state.reset,
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
        actions.deleteQuizsData(id, that.getData)
        that.setState({ loading: true })
      }
    });
  }
  showBackImg(event) {
    const {id} = event.target.dataset
    this.setState({
      previewVisible: true,
      previewImage: id === 'false' ? null : id
    })
  }
  handleCancel() {
    this.setState({
      previewVisible: false,
      previewImage: ''
    })
  }
  componentDidMount() {
    this.getData()
  }
  componentWillUpdate(nextProps, nextState){
    this.props.data !== nextProps.data && this.setState({ loading: false })
  }
  componentDidUpdate(nextProps, nextState){
    const { reset, page, sorter, filByState, filByEnabled } = this.state
    const condition = reset !== nextState.reset || page !== nextState.page
      || sorter !== nextState.sorter || filByState !== nextState.filByState || filByEnabled !== nextState.filByEnabled
    condition && this.getData()
    condition && this.setState({ loading: true })
  }
  render() {
    const {data, meta} = this.props
    const {loading, searchId, searchText, sorter, filByState, filByEnabled, previewVisible, previewImage} = this.state
    return (
      <div className="mar-top-20">
        <Screening
          title='问卷标题：'
          titlePlaceholder="问卷标题 -- 完全匹配"
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
          filByState={filByState}
          filByEnabled={filByEnabled}
          onTableChange={this.onTableChange}
          onPaginationChange={this.onPaginationChange}
          handleDelete={this.handleDelete}
          showBackImg={this.showBackImg}
        />
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt={previewImage === null ? '无背景图片' : '背景图片无法显示'} style={{width: '100%'}} src={previewImage}/>
        </Modal>
      </div>
    )
  }
}
Quizs.PropTypes = {
  data: PropTypes.array.isRequired,
  meta: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
}

