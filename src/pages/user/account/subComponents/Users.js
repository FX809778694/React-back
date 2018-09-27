import React, {Component} from 'react'
import TableData from './TableData'
import PropTypes from 'prop-types'
import {Button, Input, Select} from 'antd';
import {apiUserUrl} from "../../../../api/url";

const Option = Select.Option;
const Search = Input.Search;

class Screening extends Component {
  render() {
    const {searchUserName, onUserNameInputChange, selected, onSelectedChange, onSearch, handleReset} = this.props
    return (
      <div className="search" style={{marginBottom: '20px'}}>
        <label>
          用户名：
          <Search
            placeholder="请输入用户名 -- 完全匹配"
            value={searchUserName}//必须跟品牌id完全匹配，才能搜索到，要加输入条件
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

export default class Users extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchUserName: '',
      selected: '',
    }
    this.onUserNameInputChange = this.onUserNameInputChange.bind(this)
    this.onSelectedChange = this.onSelectedChange.bind(this)
    this.onSearch = this.onSearch.bind(this)
  }

  onUserNameInputChange = (e) => {
    this.setState({searchUserName: e.target.value});
  }

  onSelectedChange = (value) => {
    this.setState({selected: value});
    const {searchUserName} = this.state
    const {actions} = this.props
    actions.fetchData(apiUserUrl, 1, searchUserName, value)
  }

  componentDidMount() {
    const {actions} = this.props
    //调用action获取数据
    actions.fetchData(apiUserUrl, 1)
  }

  onSearch = () => {
    const {searchUserName, selected} = this.state
    const {actions} = this.props
    actions.fetchData(apiUserUrl, 1, searchUserName, selected)
  }

  handleReset = () => {
    const {actions} = this.props
    this.setState({
      searchUserName: '',
      selected: '',
      loading: false,
    })
    actions.fetchData(apiUserUrl, 1)
  }

  render() {
    const {users, actions, sites, roles, roleForUser, groups, groupForUser} = this.props
    return (
      <div className="ant-layout-content" style={{marginTop: '20px'}}>
        {/* -- 筛选组 start -- */}
        <Screening
          searchUserName={this.state.searchUserName}
          onUserNameInputChange={this.onUserNameInputChange}
          selected={this.state.selected}
          onSelectedChange={this.onSelectedChange}
          onSearch={this.onSearch}
          handleReset={this.handleReset}
        />
        {/* -- 筛选组 end -- */}

        {/* -- 显示组 start -- */}
        <TableData data={users.items}
                   meta={users.meta}
                   actions={actions}
                   sites={sites}
                   roles={roles}
                   roleForUser={roleForUser}
                   groups={groups}
                   groupForUser={groupForUser}
                   searchUserName={this.state.searchUserName}
                   selected={this.state.selected}
                   router={this.props.router}
        />
        {/* -- 显示组 end -- */}
      </div>
    )
  }
}
Users.PropTypes = {
  users: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
}

