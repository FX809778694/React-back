/**
 * Created by Administrator on 2017/11/21/021.
 */
import React, {Component} from 'react'
import TableData from './TableData'
import PropTypes from 'prop-types'
import {Button, Input} from 'antd';
import {articleMesUrl} from "../../../../api/url";

const Search = Input.Search;
//搜索只搜ID
const SingleSearch = ({onIdInputChange, searchId , onSearch, handleReset}) => (
  <div className="search" style={{marginBottom: '20px'}}>
  <label>
    ID：
    <Search
      placeholder="请输入标识ID -- 完全匹配"
      value={searchId}//必须跟id完全匹配，要加输入条件
      onSearch={onSearch}
      onPressEnter={onSearch}//按下Enter键搜索标题关键字
      onChange={onIdInputChange}
    />
  </label>
    <Button type="primary" onClick={onSearch} style={{marginLeft: '20px'}}>搜索</Button>
    <Button type="info" onClick={handleReset} style={{marginLeft: '20px'}}>重置筛选条件</Button>
  </div>
)

export default class Message extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchId: '',
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
    actions.fetchData(`${articleMesUrl}`, 1)
  }

  onSearch = () => {
    const {searchId } = this.state
    const {actions} = this.props
    actions.fetchData(`${articleMesUrl}`, 1, searchId )
  }

  handleReset = () => {
    const {actions} = this.props
    this.setState({
      searchId: '',
      loading: false,
    })

    actions.fetchData(`${articleMesUrl}`, 1)
  }

  render() {
    const {messageData, actions} = this.props
    return (
      <div className="ant-layout-content" style={{marginTop: '20px'}}>
        {/* -- 筛选组 start -- */}
        <SingleSearch
          searchId={this.state.searchId}
          onIdInputChange={this.onIdInputChange}
          onSearch={this.onSearch}
          handleReset={this.handleReset}
        />
        {/* -- 筛选组 end -- */}

        {/* -- 显示组 start -- */}
        <TableData data={messageData.items}
                   meta={messageData.meta}
                   actions={actions}
                   searchId={this.state.searchId}
                   router={this.props.router}
        />
        {/* -- 显示组 end -- */}
      </div>
    )
  }
}
Message.PropTypes = {
  message: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
}

