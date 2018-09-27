import React, {Component} from 'react'
import TableData from './TableData'
import PropTypes from 'prop-types'
import {spiderConnectionsUrl} from "../../../../api/url";

export default class Connections extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  componentDidMount() {
    const {actions} = this.props
    //调用action获取数据
    actions.fetchData(spiderConnectionsUrl)
  }

  onSearch = () => {
    const {actions} = this.props
    actions.fetchData(spiderConnectionsUrl)
  }

  handleReset = () => {
    const {actions} = this.props
    this.setState({
      loading: true,
    })
    actions.fetchData(spiderConnectionsUrl)
  }

  render() {
    const {connections, actions} = this.props
    return (
      <div className="ant-layout-content" style={{marginTop: '20px'}}>
        {/* -- 显示组 start -- */}
        <TableData data={connections.items}
                   meta={connections.meta}
                   actions={actions}
                   priortime={this.state.priortime}
                   latertime={this.state.latertime}
                   router={this.props.router}
        />
        {/* -- 显示组 end -- */}
      </div>
    )
  }
}
Connections.PropTypes = {
  connections: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
}

