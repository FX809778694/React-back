import React, {Component} from 'react'
import {Button} from 'antd'

export default class State extends Component {
  constructor(props) {
    super(props)
    this.state = {
      index: 1,
    }
  }
  handleClick = (e) => {
    const {actions} = this.props,
      index = +e.currentTarget.dataset.index
    this.setState({
      index,
    })
    actions.fetchTranslateTasks(1, index)
  }
  render() {
    return (
      <div style={{margin: '20px 0'}}>
        <Button type={this.state.index === 1 ? 'primary' : 'normal'} onClick={this.handleClick} data-index={1} style={{margin: '0 20px 0 0'}}>最新任务</Button>
        <Button type={this.state.index === 2 ? 'primary' : 'normal'} onClick={this.handleClick} data-index={2} style={{margin: '0 20px 0 0'}}>领取任务</Button>
        <Button type={this.state.index === 3 ? 'primary' : 'normal'} onClick={this.handleClick} data-index={3} style={{margin: '0 20px 0 0'}}>完成任务</Button>
      </div>
    );

  }
}
