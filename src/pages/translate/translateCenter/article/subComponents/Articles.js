import React, {Component} from 'react'
import TableData from './TableData'
import PropTypes from 'prop-types'
import Screening from '../../../../../component/Screening'

export default class Articles extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      page: null,
      searchId: '',
      searchText: '',
      reset: false,
      sorter: '',
      filByState: '',
    }
    this.getData = this.getData.bind(this)
    this.onTitleInputChange = this.onTitleInputChange.bind(this)
    this.onIdInputChange = this.onIdInputChange.bind(this)
    this.onTableChange = this.onTableChange.bind(this)
    this.onPaginationChange = this.onPaginationChange.bind(this)
  }
  getData() {
    const { actions } = this.props
    const { page, searchId, searchText, sorter, filByState } = this.state
    actions.fetchTranslateHopeData(page, searchId, searchText, sorter, filByState)
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
      filByState: '',
      reset: !this.state.reset
    })
  }
  onPaginationChange(page) {
    this.setState({
      page
    })
  }
  onTableChange = (pagination, filters, sorter) => {
    this.setState({
      sorter: (sorter.order === 'descend' ? '-' : '') + sorter.field,
      filByState: filters.state ? filters.state.join(',') : '',
    })
  }
  componentDidMount() {
    this.getData()
  }
  componentWillUpdate(nextProps, nextState){
    this.props.data !== nextProps.data && this.setState({ loading: false })
  }
  componentDidUpdate(nextProps, nextState){
    const { reset, page, sorter, filByState } = this.state
    const condition = reset !== nextState.reset
      || page !== nextState.page || sorter !== nextState.sorter || filByState !== nextState.filByState
    condition && this.getData()
    condition && this.setState({ loading: true })
  }

  render() {
    const {data, meta} = this.props
    const {loading, searchId, searchText, sorter, filByState} = this.state
    return (
      <div className='mar-top-20'>
        <Screening
          title='主题标识ID：'
          titlePlaceholder="请输入主题标识ID"
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
          onTableChange={this.onTableChange}
          onPaginationChange={this.onPaginationChange}
        />
      </div>
    )
  }
}
Articles.PropTypes = {
  meta: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
}

