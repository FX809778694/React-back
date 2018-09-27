import React, {Component} from 'react'
import TableData from './TableData'
import PropTypes from 'prop-types'
import {Button, Input, Select} from 'antd';
import {userSitesUrl} from "../../../../api/url";

const Option = Select.Option;
const Search = Input.Search;

class Screening extends Component {
  render() {
    const {name, onUserNameInputChange, selected, onSelectedChange, onSearch, handleReset} = this.props
    return (
      <div className="search" style={{marginBottom: '20px'}}>
        <label>
          站点名：
          <Search
            placeholder="请输入站点名"
            value={name}//必须跟品牌id完全匹配，才能搜索到，要加输入条件
            onSearch={onSearch}
            onPressEnter={onSearch}//按下Enter键搜索标题关键字
            onChange={onUserNameInputChange}
          />
        </label>

        <label style={{marginLeft: '20px'}}>
          是否可用筛选：
          <Select value={selected} style={{width: 120}} onChange={onSelectedChange}>
            <Option value="">全部数据</Option>
            <Option value="1">可用</Option>
            <Option value="0">不可用</Option>
          </Select>
        </label>
        <Button type="info" onClick={handleReset} style={{marginLeft: '20px'}}>重置筛选条件</Button>
      </div>
    )
  }
}

export default class Sites extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      selected: '',
    }
    this.onUserNameInputChange = this.onUserNameInputChange.bind(this)
    this.onSelectedChange = this.onSelectedChange.bind(this)
    this.onSearch = this.onSearch.bind(this)
  }

  onUserNameInputChange = (e) => {
    this.setState({name: e.target.value});
  }

  onSelectedChange = (value) => {
    this.setState({selected: value});
    const {name} = this.state
    const {actions} = this.props
    actions.fetchData(userSitesUrl, 1, name, value)
  }

  componentDidMount() {
    const {actions} = this.props
    //调用action获取数据
    actions.fetchData(userSitesUrl, 1)
  }

  onSearch = () => {
    const {name, selected} = this.state
    const {actions} = this.props
    actions.fetchData(userSitesUrl, 1, name, selected)
  }

  handleReset = () => {
    const {actions} = this.props
    this.setState({
      name: '',
      selected: '',
      loading: false,
    })
    actions.fetchData(userSitesUrl, 1)
  }

  render() {
    const {sites, actions} = this.props
    return (
      <div className="ant-layout-content" style={{marginTop: '20px'}}>
        {/* -- 筛选组 start -- */}
        <Screening
          name={this.state.name}
          onUserNameInputChange={this.onUserNameInputChange}
          selected={this.state.selected}
          onSelectedChange={this.onSelectedChange}
          onSearch={this.onSearch}
          handleReset={this.handleReset}
        />
        {/* -- 筛选组 end -- */}

        {/* -- 显示组 start -- */}
        <TableData data={sites.items}
                   meta={sites.meta}
                   actions={actions}
                   name={this.state.name}
                   selected={this.state.selected}
                   router={this.props.router}
        />
        {/* -- 显示组 end -- */}
      </div>
    )
  }
}
Sites.PropTypes = {
  sites: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
}

