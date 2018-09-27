import React, {Component} from 'react'
import TableData from './TableData'
import PropTypes from 'prop-types'
import {DatePicker} from 'antd'
import Button from "antd/es/button/button";
import {dateFormat} from '../../../../constants/FormConst'
import {spiderStaUrl} from "../../../../api/url";

class DateRange extends React.Component {
  state = {
    endOpen: false,
  };

  disabledStartDate = (startValue) => {
    const endValue = this.props.endValue;
    if (!startValue || !endValue) {
      return false;
    }
    return startValue.valueOf() > endValue.valueOf();
  }

  disabledEndDate = (endValue) => {
    const startValue = this.props.startValue;
    if (!endValue || !startValue) {
      return false;
    }
    return endValue.valueOf() <= startValue.valueOf();
  }

  handleStartOpenChange = (open) => {
    if (!open) {
      this.setState({ endOpen: true });
    }
  }

  handleEndOpenChange = (open) => {
    this.setState({ endOpen: open });
  }

  render() {
    const {  endOpen } = this.state;
    const {onStartChange, onEndChange, startValue, endValue, onSearch, handleReset} = this.props
    return (
      <div style={{marginBottom:'20px'}}>
        选择时间范围：
        <DatePicker
          disabledDate={this.disabledStartDate}
          showTime
          format={dateFormat}
          value={startValue}
          placeholder="Start"
          onChange={onStartChange}
          onOpenChange={this.handleStartOpenChange}
        /> ~ <DatePicker
          disabledDate={this.disabledEndDate}
          showTime
          format={dateFormat}
          value={endValue}
          placeholder="End"
          onChange={onEndChange}
          open={endOpen}
          onOpenChange={this.handleEndOpenChange}
        />
        <Button type="primary" onClick={onSearch} style={{marginLeft: '20px'}}>搜索</Button>
        <Button type="info" onClick={handleReset} style={{marginLeft: '20px'}}>重置筛选条件</Button>
      </div>
    );
  }
}


export default class CrawlerSta extends Component {
  constructor(props) {
    super(props)
    this.state = {
      startValue: null,
      endValue: null,
      priortime: '',
      latertime: ''
    }
  }

  onChange = (field, value) => {
    this.setState({
      [field]: value,
    });
  }

  onStartChange = (value, dateString) => {
    this.onChange('startValue', value);
    this.setState({
      priortime: dateString
    })
  }

  onEndChange = (value, dateString) => {
    this.onChange('endValue', value);
    this.setState({
      latertime: dateString
    })
  }


  componentDidMount() {
    const {actions} = this.props
    //调用action获取数据
    actions.fetchData(spiderStaUrl, 1)
  }

  onSearch = () => {
    const {priortime, latertime} = this.state
    const {actions} = this.props
    actions.fetchData(spiderStaUrl, 1, priortime, latertime)
  }

  handleReset = () => {
    const {actions} = this.props
    this.setState({
      searchText: '',
      searchId: '',
      loading: true,
    })
    actions.fetchData(spiderStaUrl, 1)
    console.log("reset")
  }

  render() {
    const {crawlerStaData, actions} = this.props
    return (
      <div className="ant-layout-content" style={{marginTop: '20px'}}>
        {/* -- 筛选组 start -- */}
        {/*<Screening
          title='种子来源名称：'
          titlePlaceholder="种子来源名称 -- 完全匹配"
          searchId={this.state.searchId}
          searchText={this.state.searchText}
          onIdInputChange={this.onIdInputChange}
          onTitleInputChange={this.onTitleInputChange}
          onSearch={this.onSearch}
          handleReset={this.handleReset}
        />*/}
        <DateRange
          startValue={this.state.startValue}
          endValue={this.state.endValue}
          onStartChange={this.onStartChange}
          onEndChange={this.onEndChange}
          onSearch={this.onSearch}
          handleReset={this.handleReset}
        />
        {/* -- 筛选组 end -- */}

        {/* -- 显示组 start -- */}
        <TableData data={crawlerStaData.items}
                   meta={crawlerStaData.meta}
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
CrawlerSta.PropTypes = {
  crawlerStaData: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
}

