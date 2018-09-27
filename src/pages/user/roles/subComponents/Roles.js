import React, {Component} from 'react'
import TableData from './TableData'
import PropTypes from 'prop-types'
import {Button, Input, Select} from 'antd';
import {userRolesUrl} from "../../../../api/url";

const Option = Select.Option;
const Search = Input.Search;

class Screening extends Component {
  render() {
    const {searchId, onIdInputChange, name, onUserNameInputChange, selected, onSelectedChange, onSearch, handleReset} = this.props
    return (
      <div className="search" style={{marginBottom: '20px'}}>
        <label>
          站点ID：
          <Search
            placeholder="请输入站点ID -- 完全匹配"
            value={searchId}//必须跟品牌id完全匹配，才能搜索到，要加输入条件
            onSearch={onSearch}
            onPressEnter={onSearch}//按下Enter键搜索标题关键字
            onChange={onIdInputChange}
          />
        </label>
        <label style={{marginLeft: '20px'}}>
          角色名：
          <Search
            placeholder="请输入角色名 -- 完全匹配"
            style={{width: 200}}
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

export default class Roles extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchId: '',
      name: '',
      selected: '',
    }
    this.onIdInputChange = this.onIdInputChange.bind(this)
    this.onUserNameInputChange = this.onUserNameInputChange.bind(this)
    this.onSelectedChange = this.onSelectedChange.bind(this)
    this.onSearch = this.onSearch.bind(this)
  }

  onIdInputChange = (e) => {
    this.setState({searchId: e.target.value});
  }

  onUserNameInputChange = (e) => {
    this.setState({name: e.target.value});
  }

  onSelectedChange = (value) => {
    this.setState({selected: value});
    const {searchId, name} = this.state
    const {actions} = this.props
    actions.fetchData(userRolesUrl, 1, searchId, name, value)
  }

  componentDidMount() {
    const {actions} = this.props
    //调用action获取数据
    actions.fetchData(userRolesUrl, 1)
  }

  onSearch = () => {
    const {searchId, name, selected} = this.state
    const {actions} = this.props
    actions.fetchData(userRolesUrl, 1, searchId, name, selected)
  }

  handleReset = () => {
    const {actions} = this.props
    this.setState({
      searchId: '',
      name: '',
      selected: '',
      loading: false,
    })
    actions.fetchData(userRolesUrl, 1)
  }

  render() {
    const {roles, actions} = this.props
    return (
      <div className="ant-layout-content" style={{marginTop: '20px'}}>
        {/* -- 筛选组 start -- */}
        <Screening
          searchId={this.state.searchId}
          onIdInputChange={this.onIdInputChange}
          name={this.state.name}
          onUserNameInputChange={this.onUserNameInputChange}
          selected={this.state.selected}
          onSelectedChange={this.onSelectedChange}
          onSearch={this.onSearch}
          handleReset={this.handleReset}
        />
        {/* -- 筛选组 end -- */}

        {/* -- 显示组 start -- */}
        <TableData data={roles.items}
                   meta={roles.meta}
                   actions={actions}
                   searchId={this.state.searchId}
                   name={this.state.name}
                   selected={this.state.selected}
                   router={this.props.router}
        />
        {/* -- 显示组 end -- */}
      </div>
    )
  }
}
Roles.PropTypes = {
  roles: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
}

