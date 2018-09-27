import React, {Component} from 'react'
import TableData from './TableData'
import PropTypes from 'prop-types'
import {Button, Input, Select} from 'antd';
import {userGroupsUrl} from "../../../../api/url";

const Option = Select.Option;
const Search = Input.Search;

class Screening extends Component {
  render() {
    const {name, onUserNameInputChange, selected, onSelectedChange, onSearch, handleReset, sites, sitesValue, sitesSelected} = this.props
    return (
      <div className="search" style={{marginBottom: '20px'}}>
        {
          sites.items &&
          <label>
            站 点：
            <Select value={sitesValue} style={{width: 120}} onChange={sitesSelected}>
              <Option value="">全部数据</Option>
              {
                sites.items.map(item =>
                  <Option key={item.id} value={String(item.id)}>{item.name}</Option>
                )
              }
            </Select>
          </label>
        }

        <label style={{marginLeft: '20px'}}>
          群组名：
          <Search
            placeholder="请输入群组名 -- 完全匹配"
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

export default class Groups extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sitesSelected: '',
      name: '',
      selected: '',
    }
    this.onUserNameInputChange = this.onUserNameInputChange.bind(this)
    this.onSelectedChange = this.onSelectedChange.bind(this)
    this.onSearch = this.onSearch.bind(this)
  }

  sitesSelected = (value) => {//站点下拉框选择改变时
    const {actions} = this.props
    this.setState({
      sitesSelected: value
    })
    const {name, selected} = this.state
    actions.fetchData(userGroupsUrl, 1, value, name, selected)
  }

  onUserNameInputChange = (e) => {
    this.setState({name: e.target.value});
  }

  onSelectedChange = (value) => {
    this.setState({selected: value});
    const {sitesSelected, name} = this.state
    const {actions} = this.props
    actions.fetchData(userGroupsUrl, 1, sitesSelected, name, value)
  }

  componentDidMount() {
    const {actions} = this.props
    //调用action获取数据
    actions.fetchData(userGroupsUrl, 1)
    actions.getSites()//获取站点数据，保存在sites中
  }

  onSearch = () => {
    const {sitesSelected, name, selected} = this.state
    const {actions} = this.props
    actions.fetchData(userGroupsUrl, 1, sitesSelected, name, selected)
  }

  handleReset = () => {
    const {actions} = this.props
    this.setState({
      sitesSelected: '',
      name: '',
      selected: '',
      loading: false,
    })
    actions.fetchData(userGroupsUrl, 1)
  }

  render() {
    const {groups, actions, sites, roles, roleForGroup} = this.props
    return (
      <div className="ant-layout-content" style={{marginTop: '20px'}}>
        {/* -- 筛选组 start -- */}
        <Screening
          onIdInputChange={this.onIdInputChange}
          name={this.state.name}
          onUserNameInputChange={this.onUserNameInputChange}
          selected={this.state.selected}
          onSelectedChange={this.onSelectedChange}
          onSearch={this.onSearch}
          handleReset={this.handleReset}
          sitesValue={this.state.sitesSelected}//站点下拉选择框中的值
          sitesSelected={this.sitesSelected}//下拉选矿选中时触发去获取所有站点的方法
          sites={sites}//所有站点的数据
        />
        {/* -- 筛选组 end -- */}

        {/* -- 显示组 start -- */}
        <TableData data={groups.items}
                   meta={groups.meta}
                   actions={actions}
                   sites={sites}
                   roles={roles}
                   roleForGroup={roleForGroup}
                   sitesSelected={this.state.sitesSelected}
                   name={this.state.name}
                   selected={this.state.selected}
                   router={this.props.router}
        />
        {/* -- 显示组 end -- */}
      </div>
    )
  }
}
Groups.PropTypes = {
  sites: PropTypes.array.isRequired,
  groups: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
}

