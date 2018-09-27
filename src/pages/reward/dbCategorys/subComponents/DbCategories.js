import React, {Component} from 'react'
import TableData from './TableData'
import PropTypes from 'prop-types'
import {Select} from 'antd';
import {rewardCateUrl} from "../../../../api/url";

const Option = Select.Option;

class Screening extends Component {
  render() {
    const {onSelectedChange, selected} = this.props
    return (
      <div className="search" style={{marginBottom: '20px'}}>
        <label style={{marginLeft: '20px'}}>
          排序方式：
          <Select placeholder="请选择排序方式" value={selected} style={{width: 120}} onChange={onSelectedChange}>
            <Option value="created">升序排列</Option>
            <Option value="-created">降序排列</Option>
          </Select>
        </label>
      </div>
    )
  }
}

export default class DbCategories extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: 'created',
    }
    this.onSelectedChange = this.onSelectedChange.bind(this)
  }

  onSelectedChange = (value) => {
    this.setState({selected: value});
    const {actions} = this.props
    actions.fetchData(rewardCateUrl, 1, value)
  }

  componentDidMount() {
    const {actions} = this.props
    //调用action获取数据
    actions.fetchData(rewardCateUrl, 1)
  }

  render() {
    const {dbCategories, actions} = this.props
    return (
      <div className="ant-layout-content" style={{marginTop: '20px'}}>
        {/* -- 筛选组 start -- */}
        <Screening
          selected={this.state.selected}
          onSelectedChange={this.onSelectedChange}
          onSearch={this.onSearch}
        />
        {/* -- 筛选组 end -- */}

        {/* -- 显示组 start -- */}
        <TableData data={dbCategories.items}
                   meta={dbCategories.meta}
                   actions={actions}
                   selected={this.state.selected}
                   router={this.props.router}
        />
        {/* -- 显示组 end -- */}
      </div>
    )
  }
}
DbCategories.PropTypes = {
  dbCategories: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
}

