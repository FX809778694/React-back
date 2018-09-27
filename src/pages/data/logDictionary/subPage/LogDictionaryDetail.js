import React from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as Actions from '../../../../store/data/actions/logDictionary'
import {Card, Form} from 'antd';
import PropTypes from 'prop-types'
import {Items, BackButton} from "../../../../component/FormItem";

class LogDictionaryDetail extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true
    };
  }
  componentDidMount() {
    const {actions, params} = this.props
    actions.fetchLogDictionaryDetail(params.id)
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
      <Card laoding={loading} title={data && data.eventType} bordered={true}>
        {
          data &&
          <Form layout={'horizontal'}>
            <Items label="ID" data={data.id}/>
            <Items label="来源" data={data.eventType}/>
            <Items label="事件字典" data={data.eventCode}/>
            <Items label="描述" data={data.eventDescribe}/>
            <Items label="是否可用" data={data.enabled===1?'是':'否'}/>
            <Items label="创建人" data={data.creator}/>
            <Items label="创建时间" data={data.created}/>
            <BackButton/>
          </Form>
        }
      </Card>
    )
  }
}
LogDictionaryDetail.PropTypes = {
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
export default connect(mapStateToProps, mapDispatchToProps)(LogDictionaryDetail)
