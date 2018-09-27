import React, {Component} from 'react'
import TableData from './TableData'
import PropTypes from 'prop-types'
import {Button, Input} from 'antd';

const Search = Input.Search;

const DictionarySearch = ({searchEventCode, searchUrl, searchSsid, searchIp, inputChange, onSearch, handleReset}) => (
  <div className="search mar-bottom-20">
    <label className="mar-left-10">
      事件字典：
      <Search
        data-id="eventCode"
        placeholder="请输入事件字典"
        value={searchEventCode}
        onSearch={onSearch}
        onPressEnter={onSearch}//按下Enter键搜索标题关键字
        onChange={inputChange}
      />
    </label>
    <label className="mar-left-10">
      URL：
      <Search
        data-id="url"
        placeholder="请输入URL"
        value={searchUrl}
        onSearch={onSearch}
        onPressEnter={onSearch}//按下Enter键搜索标题关键字
        onChange={inputChange}
      />
    </label>
    <label className="mar-left-10">
      会话标识：
      <Search
        data-id="ssid"
        placeholder="请输入会话标识"
        value={searchSsid}
        onSearch={onSearch}
        onPressEnter={onSearch}//按下Enter键搜索标题关键字
        onChange={inputChange}
      />
    </label>
    <label className="mar-left-10">
      IP：
      <Search
        data-id="ip"
        placeholder="请输入IP"
        value={searchIp}
        onSearch={onSearch}
        onPressEnter={onSearch}//按下Enter键搜索标题关键字
        onChange={inputChange}
      />
    </label>
    <Button type="primary" onClick={onSearch} className="mar-left-20">搜索</Button>
    <Button type="info" onClick={handleReset} className="mar-left-20">重置筛选条件</Button>
  </div>
)

export default class Outline extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      page: null,
      searchEventCode: '',
      searchUrl: '',
      searchSsid: '',
      searchIp: '',
      selected: '',
      reset: false
    }
    this.getData = this.getData.bind(this)
    this.inputChange = this.inputChange.bind(this)
    this.onTableChange = this.onTableChange.bind(this)
    this.onSearch = this.onSearch.bind(this)
    this.handleReset = this.handleReset.bind(this)
    this.onPaginationChange = this.onPaginationChange.bind(this)
  }
  getData() {
    const {actions} = this.props
    const {page, searchEventCode, searchUrl, searchSsid, searchIp, selected} = this.state
    actions.fetchOutlineData(page, searchEventCode, searchUrl, searchSsid, searchIp, selected)
  }
  inputChange = (e) => {
    const id = e.target.dataset.id
    id === 'eventCode' && this.setState({searchEventCode: e.target.value});
    id === 'url' && this.setState({searchUrl: e.target.value});
    id === 'ssid' && this.setState({searchSsid: e.target.value});
    id === 'ip' && this.setState({searchIp: e.target.value});
  }
  onTableChange = (pagination, filters, sorter) => {
    this.setState({
      selected: filters.isWechat ? filters.isWechat.join(',') : ''
    })
  }
  handleReset = () => {
    this.setState({
      page: null,
      searchEventCode: '',
      searchUrl: '',
      searchSsid: '',
      searchIp: '',
      selected: '',
      reset: !this.state.reset
    })
  }
  onPaginationChange(page) {
    this.setState({
      page
    })
  }
  onSearch = () => {
    this.getData()
  }
  componentDidMount() {
    this.getData()
  }
  componentWillUpdate(nextProps, nextState){
    this.props.data !== nextProps.data && this.setState({ loading: false })
  }
  componentDidUpdate(nextProps, nextState){
    const { reset, page, selected } = this.state
    const condition = reset !== nextState.reset || page !== nextState.page || selected !== nextState.selected
    condition && this.getData()
    condition && this.setState({ loading: true })
  }
  render() {
    const {data, meta} = this.props
    const {loading, searchEventCode, searchUrl, searchSsid, searchIp, selected} = this.state
    return (
      <div className="mar-top-20">
        <DictionarySearch
          title='来源标题：'
          searchEventCode={searchEventCode}
          searchUrl={searchUrl}
          searchSsid={searchSsid}
          searchIp={searchIp}
          inputChange={this.inputChange}
          onSearch={this.onSearch}
          handleReset={this.handleReset}
        />
        <TableData
          loading={loading}
          data={data}
          meta={meta}
          filByWechat={selected}
          onTableChange={this.onTableChange}
          onPaginationChange={this.onPaginationChange}
        />
      </div>
    )
  }
}
Outline.PropTypes = {
  data: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
}
