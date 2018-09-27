import React, {Component} from 'react'
import TableData from './TableData'
import PropTypes from 'prop-types'
import {Select} from 'antd';
import {rewardNoticesUrl} from "../../../../api/url";

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

export default class Notices extends Component {
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
    actions.fetchData(rewardNoticesUrl, 1, value)
  }

  componentDidMount() {
    const {actions} = this.props
    //调用action获取数据
    actions.fetchData(rewardNoticesUrl, 1)
  }

  render() {
    console.log(this.state.selected)
    const {notices, actions} = this.props
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
        <TableData data={notices.items}
                   meta={notices.meta}
                   selected={this.state.selected}
                   actions={actions}
                   router={this.props.router}
        />
        {/* -- 显示组 end -- */}
      </div>
    )
  }
}
Notices.PropTypes = {
  notices: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
}

