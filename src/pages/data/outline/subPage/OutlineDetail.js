import React from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as Actions from '../../../../store/data/actions/outline'
import {Card, Form} from 'antd';
import PropTypes from 'prop-types'
import {Items, BackButton} from "../../../../component/FormItem";

class OutlineDetail extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true
    };
  }
  componentDidMount() {
    const {actions, params} = this.props
    actions.fetchOutlineDetail(params.id)
  }
  componentWillReceiveProps({data}) {
    data && this.setState({ loading: false })
  }
  componentWillUnmount() {
    const {actions} = this.props
    actions.clearDataCenterData()
  }
  render() {
    const {data} = this.props
    const {loading} = this.state

    return (
      <Card loading={loading} title={data && data.source}  bordered={true}>
        { data &&
          <Form layout={'horizontal'}>
            <Items label="ID" data={data.id}/>
            <Items label="来源" data={data.source}/>
            <Items label="事件字典" data={data.eventCode}/>
            <Items label="微信" data={data.isWechat === 0 ? '否' : data.isWechat === 1 ? '是' : data.isWechat}/>
            <Items label="会话标识" data={data.ssid}/>
            <Items label="IP地址" data={data.ip}/>
            <Items label="请求头" data={data.ua}/>
            <Items label="创建人" data={data.creator}/>
            <Items label="创建时间" data={data.created}/>
            <BackButton/>
          </Form>
        }
      </Card>
    )
  }
}
OutlineDetail.PropTypes = {
  data: PropTypes.array.isRequired,
  params: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
}
const mapStateToProps = state => {
  return {
    data: state.dataCenter.detail
  }
}
const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(OutlineDetail)

