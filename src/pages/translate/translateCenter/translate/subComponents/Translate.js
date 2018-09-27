import React, {Component} from 'react'
import TableData from './TableData'
import PropTypes from 'prop-types'

export default class Translate extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      page: null,
      reset: false,
      sorter: '',
      filByState: '',
    }
    this.getData = this.getData.bind(this)
    this.onTableChange = this.onTableChange.bind(this)
    this.onPaginationChange = this.onPaginationChange.bind(this)
  }
  getData() {
    const { actions } = this.props
    const { page, sorter, filByState } = this.state
    actions.fetchTranslateAuditData(page, sorter, filByState)
  }
  handleReset = () => {
    this.setState({
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
    const {loading, sorter, filByState} = this.state
    return (
      <div className='mar-top-20'>
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
Translate.PropTypes = {
  meta: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
}

