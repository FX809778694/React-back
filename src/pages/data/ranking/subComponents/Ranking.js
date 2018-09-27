import React, {Component} from 'react'
import TableData from './TableData'
import PropTypes from 'prop-types'
import {Select, Modal} from 'antd';

const Option = Select.Option;
const confirm = Modal.confirm;

export default class Ranking extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      selected: 'all_ranking',
      page: null,
    }
    this.getData = this.getData.bind(this)
    this.onSelectedChange = this.onSelectedChange.bind(this)
    this.updateData = this.updateData.bind(this)
    this.onSearch = this.onSearch.bind(this)
    this.onPaginationChange = this.onPaginationChange.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }
  getData() {
    const { actions } = this.props
    const { page, selected } = this.state
    actions.fetchRanksData(page, selected)
  }
  onSearch = () => {
    this.getData()
  }
  onSelectedChange = (value) => {
    this.setState({selected: value})
  }
  onPaginationChange(page) {
    this.setState({
      page
    })
  }
  handleDelete(event) {
    const {id} = event.target.dataset
    const {actions} = this.props
    const {selected} = this.state
    const that = this
    confirm({
      title: '确定要删除此条数据？',
      okText: '删除',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        actions.deleteRanksData(id, selected, that.getData)
        that.setState({ loading: true })
      }
    });
  }
  updateData() {
    this.setState({
      selected: 'all_ranking',
    })
    const { actions } = this.props
    actions.updateRanksData()
  }
  componentDidMount() {
    this.getData()
  }
  componentWillUpdate(nextProps, nextState){
    this.props.data !== nextProps.data && this.setState({ loading: false })
  }
  componentDidUpdate(nextProps, nextState){
    const { page, selected } = this.state
    const condition = page !== nextState.page || selected !== nextState.selected
    condition && this.getData()
    condition && this.setState({ loading: true })
  }

  render() {
    const {data, meta} = this.props
    const {selected, loading} = this.state
    return (
      <div className="mar-top-20">
        <label className="mar-bottom-20">
          显示排行：
          <Select className="mar-bottom-20" value={selected} onChange={this.onSelectedChange}>
            <Option value="all_ranking">总排行</Option>
            <Option value="month_ranking">月排行</Option>
            <Option value="week_ranking">周排行</Option>
            <Option value="day_ranking">日排行</Option>
          </Select>
        </label>
        <TableData
          loading={loading}
          data={data}
          meta={meta}
          selected={selected}
          updateData={this.updateData}
          onPaginationChange={this.onPaginationChange}
          handleDelete={this.handleDelete}
        />
      </div>
    )
  }
}
Ranking.PropTypes = {
  evaluating: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
}

