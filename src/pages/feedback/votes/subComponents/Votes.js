import React, {Component} from 'react'
import Screening from '../../../../component/Screening'
import TableData from './TableData'
import PropTypes from 'prop-types'
import {articleVotesUrl} from "../../../../api/url";

export default class Votes extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchId: '',
      searchText: '',
    }
    this.onTitleInputChange = this.onTitleInputChange.bind(this)
    this.onIdInputChange = this.onIdInputChange.bind(this)
  }

  onTitleInputChange = (e) => {
    this.setState({searchText: e.target.value});
  }
  onIdInputChange = (e) => {
    this.setState({searchId: e.target.value});
  }

  componentDidMount() {
    const {actions} = this.props
    //调用action获取数据
    actions.fetchData(articleVotesUrl, 1)
  }

  onSearch = () => {
    const {searchId, searchText} = this.state
    const {actions} = this.props
    actions.fetchData(articleVotesUrl, 1, searchId, searchText)
  }

  handleReset = () => {
    const {actions} = this.props
    this.setState({
      searchText: '',
      searchId: '',
      loading: false,
    })
    actions.fetchData(articleVotesUrl, 1)
  }

  render() {
    const {votes, actions} = this.props
    return (
      <div className="ant-layout-content" style={{marginTop: '20px'}}>
        {/* -- 筛选组 start -- */}
        <Screening
          title='种子来源名称：'
          titlePlaceholder="种子来源名称 -- 完全匹配"
          searchId={this.state.searchId}
          searchText={this.state.searchText}
          onIdInputChange={this.onIdInputChange}
          onTitleInputChange={this.onTitleInputChange}
          onSearch={this.onSearch}
          handleReset={this.handleReset}
        />
        {/* -- 筛选组 end -- */}

        {/* -- 显示组 start -- */}
        <TableData data={votes.items}
                   meta={votes.meta}
                   actions={actions}
                   searchId={this.state.searchId}
                   searchText={this.state.searchText}
                   router={this.props.router}
        />
        {/* -- 显示组 end -- */}
      </div>
    )
  }
}
Votes.PropTypes = {
  votes: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
}

